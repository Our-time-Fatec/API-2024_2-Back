import { Request, Response } from "express";
import {
  IAlimentoDieta,
  IDietaFixa,
  IGrupo,
  IDietaDetalhes,
  IGrupoConsumo,
} from "../Interfaces/IDieta";
import { IAlimento } from "../Interfaces/IAlimento";
import DietaFixaModel from "../models/dietaFixa";
import calcularDetalhesDieta from "../utils/calcularDetalhesDieta";
import { DiasSemana } from "../enums/DiasSemana";
import DietaDiariaModel from "../models/dietaDiaria";
import definirDietaDiaria from "../utils/definirDietaDiaria";

class DietaDiariaController {
  static async listarDietas(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body;
      const { diaSemana } = req.query;

      const diaSemanaMap: Record<string, DiasSemana> = {
        Domingo: DiasSemana.Domingo,
        Segunda: DiasSemana.Segunda,
        Terca: DiasSemana.Terca,
        Quarta: DiasSemana.Quarta,
        Quinta: DiasSemana.Quinta,
        Sexta: DiasSemana.Sexta,
        Sabado: DiasSemana.Sabado,
      };

      if (!userId) {
        return res.status(400).json({ message: "Parâmetro userId ausente." });
      }

      if (typeof userId !== "string") {
        return res.status(400).json({ message: "Parâmetro userId inválido." });
      }

      await definirDietaDiaria.criarDietaDiaria(userId);

      const filtro: any = {
        usuarioId: userId,
        removidoEm: null,
      };

      if (diaSemana && typeof diaSemana === "string") {
        const diaSemanaCompleto = diaSemanaMap[diaSemana];
        if (diaSemanaCompleto) {
          filtro.diaSemana = diaSemanaCompleto;
        } else {
          return res
            .status(400)
            .json({ message: "Parâmetro diaSemana inválido." });
        }
      }

      const dietas = await DietaDiariaModel.find(filtro);

      return res.status(200).json(dietas);
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao listar dietas.", error: error.message });
    }
  }

  static async listarHoje(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "Parâmetro userId ausente." });
      }

      if (typeof userId !== "string") {
        return res.status(400).json({ message: "Parâmetro userId inválido." });
      }

      await definirDietaDiaria.criarDietaDiaria(userId);

      const diaAtual = new Date();

      const filtro: any = {
        usuarioId: userId,
        dia: {
          $gte: new Date(diaAtual.setHours(0, 0, 0, 0)),
          $lt: new Date(diaAtual.setHours(23, 59, 59, 999)),
        },
        removidoEm: null,
      };

      const dieta = await DietaDiariaModel.find(filtro);

      return res.status(200).json(dieta);
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao listar dietas.", error: error.message });
    }
  }

  static async listarHojeFormatado(req: Request, res: Response): Promise<Response> {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "Parâmetro userId ausente." });
        }

        if (typeof userId !== "string") {
            return res.status(400).json({ message: "Parâmetro userId inválido." });
        }

        const diaAtual = new Date();
        const filtro: any = {
            usuarioId: userId,
            dia: {
                $gte: new Date(diaAtual.setHours(0, 0, 0, 0)),
                $lt: new Date(diaAtual.setHours(23, 59, 59, 999))
            },
            removidoEm: null,
        };

        const dieta = await DietaDiariaModel.find(filtro).lean();

        const dietaFormatada = dieta.map(dietaItem => {
            const gruposMap = new Map();

            const agruparAlimentos = (grupo: IGrupo | IGrupoConsumo, tipo: 'original' | 'consumo') => {
                grupo.alimentos.forEach(alimento => {
                    const key = `${alimento.alimentoId}-${alimento.porcao}`;
                    const grupoNome = grupo.nome;

                    if (gruposMap.has(grupoNome)) {
                        const grupoExistente = gruposMap.get(grupoNome);
                        const alimentoExistente = grupoExistente.alimentos.find((a: { alimento: { alimentoId: string; }; porcao: Number; }) => a.alimento.alimentoId === alimento.alimentoId && a.porcao === alimento.porcao);

                        if (alimentoExistente) {
                            // Se o alimento já existe, acumule o valor consumido
                            const novoConsumido = alimentoExistente.consumido + (tipo === 'consumo' ? Number(alimento.quantidade) : 0);
                            alimentoExistente.consumido = novoConsumido; // Mantenha o total consumido
                        } else {
                            // Se o alimento não existe, adicione novo
                            grupoExistente.alimentos.push({
                                consumido: tipo === 'consumo' ? Number(alimento.quantidade) : 0,
                                paraConsumir: alimento.quantidade,
                                alimento,
                                porcao: alimento.porcao,
                            });
                        }
                    } else {
                        // Se o grupo não existe, cria um novo grupo
                        gruposMap.set(grupoNome, {
                            grupo: grupoNome,
                            alimentos: [{
                                consumido: tipo === 'consumo' ? Number(alimento.quantidade) : 0,
                                paraConsumir: alimento.quantidade,
                                alimento,
                                porcao: alimento.porcao,
                            }],
                        });
                    }
                });
            };

            // Processar os alimentos do grupo original
            dietaItem.grupos.forEach(grupo => {
                agruparAlimentos(grupo, 'original');
            });

            // Processar os alimentos consumidos de gruposConsumo
            dietaItem.gruposConsumo.forEach(grupoConsumo => {
                agruparAlimentos(grupoConsumo, 'consumo');
            });

            // Converter o mapa de grupos em um array
            const gruposConsumo = Array.from(gruposMap.values()).map(grupo => {
                // Ajustar o consumo para que exceda o paraConsumir
                grupo.alimentos.forEach((alimento: { consumido: number; paraConsumir: number; }) => {
                    if (alimento.consumido > alimento.paraConsumir) {
                        alimento.paraConsumir = alimento.paraConsumir; // mantém o paraConsumir
                    }
                });
                return grupo;
            });

            return {
                usuarioId: dietaItem.usuarioId,
                diaSemana: dietaItem.diaSemana,
                dia: dietaItem.dia,
                gruposConsumo,
            };
        });

        return res.status(200).json(dietaFormatada);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao listar dietas.", error: error.message });
    }
}


  static async buscarDietaPorId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const dietaId = req.params.id;
      const userId = req.body.userId;

      if (!dietaId) {
        return res.status(400).json({ message: "ID da dieta é necessário." });
      }

      const dieta = await DietaFixaModel.findOne({
        _id: dietaId,
        removidoEm: null,
      });

      if (!dieta) {
        return res
          .status(404)
          .json({ message: "Dieta não encontrada ou já removida." });
      }

      if (dieta.usuarioId !== userId) {
        return res.status(403).json({
          message: "Você não tem permissão para visualizar esta dieta.",
        });
      }

      return res.status(200).json(dieta);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar dieta.", error: error.message });
    }
  }
}

export default DietaDiariaController;
