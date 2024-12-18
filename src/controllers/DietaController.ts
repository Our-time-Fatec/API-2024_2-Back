import { Request, Response } from "express";
import {
  IAlimentoDieta,
  IDietaFixa,
  IGrupo,
  IDietaDetalhes,
} from "../Interfaces/IDieta";
import { IAlimento } from "../Interfaces/IAlimento";
import DietaFixaModel from "../models/dietaFixa";
import calcularDetalhesDieta from "../utils/calcularDetalhesDieta";
import { DiasSemana } from "../enums/DiasSemana";
import definirDietaDiaria from "../utils/definirDietaDiaria";

class DietaController {
    static async criarDieta(req: Request, res: Response): Promise<Response> {
      try {
        const { userId, diaSemana, grupos } = req.body;
  
        // Verifica se os parâmetros obrigatórios estão presentes
        if (!userId || !diaSemana || !grupos || !Array.isArray(grupos)) {
          return res
            .status(400)
            .json({ message: "Parâmetros inválidos ou ausentes." });
        }
  
        const diasSemanaArray = Array.isArray(diaSemana) ? diaSemana : [diaSemana];
        const dietasCriadas: any[] = [];
        const diaAchado: string[] = [];
  
        // Verifica se já existe dieta para os dias fornecidos
        for (const dia of diasSemanaArray) {
          const dietaExistente = await DietaFixaModel.findOne({
            usuarioId: userId,
            diaSemana: dia,
            removidoEm: null,
          });
  
          if (dietaExistente) {
            diaAchado.push(dia);
          }
        }
  
        if (diaAchado.length > 0) {
          return res.status(400).json({
            message: `Já existe dieta(s) para os dias da semana: ${diaAchado.join(", ")}`,
          });
        }
  
        // Cria novas dietas para os dias não existentes
        for (const dia of diasSemanaArray) {
          const { gruposCompletos, dietaDetalhes } = await calcularDetalhesDieta(grupos);
  
          const novaDieta = new DietaFixaModel({
            usuarioId: userId,
            diaSemana: dia,
            criadoEm: new Date(),
            detalhes: dietaDetalhes,
            grupos: gruposCompletos,
          });
  
          await novaDieta.save();
          dietasCriadas.push(novaDieta);
        }
  
        // Verifica se alguma dieta foi criada
        if (dietasCriadas.length === 0) {
          return res.status(400).json({
            message: "Nenhuma dieta foi criada.",
          });
        }
  
        return res.status(201).json({
          message: "Dietas criadas com sucesso!",
          dietas: dietasCriadas,
        });
        
      } catch (error: any) {
        if (error && error.errors) {
          // Verifica se houve erro em grupos ou diaSemana
          const erroGrupos = error.errors["grupos"];
          const erroDiaSemana = error.errors["diaSemana"];
  
          if (erroGrupos) {
            return res.status(400).json({ message: erroGrupos.message });
          } else if (erroDiaSemana) {
            return res.status(400).json({ message: erroDiaSemana.message });
          }
        }
        return res.status(500).json({ message: error.message });
      }
    }
  

  static async atualizarDieta(req: Request, res: Response): Promise<Response> {
    try {
      const dietaId = req.params.id;
      const { userId, diaSemana, grupos } = req.body;

      if (!userId || !diaSemana || !grupos || !Array.isArray(grupos)) {
        return res
          .status(400)
          .json({ message: "Parâmetros inválidos ou ausentes." });
      }

      const dieta = await DietaFixaModel.findById(dietaId);
      if (!dieta) {
        return res.status(404).json({ message: "Dieta não encontrada." });
      }

      if (dieta.usuarioId !== userId) {
        return res
          .status(403)
          .json({
            message: "Você não tem permissão para atualizar esta dieta.",
          });
      }

      const dietaExistente = await DietaFixaModel.findOne({
        usuarioId: userId,
        diaSemana,
        _id: { $ne: dietaId },
        removidoEm: null,
      });

      if (dietaExistente) {
        return res
          .status(400)
          .json({ message: "Já existe uma dieta para este dia da semana." });
      }

      const { gruposCompletos, dietaDetalhes } = await calcularDetalhesDieta(
        grupos
      );

      dieta.diaSemana = diaSemana;
      dieta.detalhes = dietaDetalhes;
      dieta.grupos = gruposCompletos;
      dieta.atualizadoEm = new Date();

      await dieta.save();

      await definirDietaDiaria.atualizarDietaDiaria(userId, dieta)

      return res.status(200).json(dieta);
    } catch (error: any) {
      if (error && error.errors["grupos"]) {
        return res
          .status(400)
          .json({ message: error.errors["grupos"].message });
      } else if (error && error.errors["diaSemana"]) {
        return res
          .status(400)
          .json({ message: error.errors["diaSemana"].message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

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

      const dietas = await DietaFixaModel.find(filtro);

      return res.status(200).json(dietas);
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao listar dietas.", error: error.message });
    }
  }

  static async removerDieta(req: Request, res: Response): Promise<Response> {
    try {
      const dietaId = req.params.id;
      const { userId } = req.body;

      if (!userId) {
        return res
          .status(400)
          .json({ message: "Parâmetros inválidos ou ausentes." });
      }

      const dietaExistente = await DietaFixaModel.findById(dietaId);

      if (!dietaExistente) {
        return res.status(404).json({ message: "Dieta não encontrada." });
      }

      if (dietaExistente.usuarioId !== userId) {
        return res
          .status(403)
          .json({ message: "Você não tem permissão para remover esta dieta." });
      }

      dietaExistente.removidoEm = new Date();
      await dietaExistente.save();
      
      await definirDietaDiaria.removerDietaDiaria(userId)

      return res.status(200).json({ message: "Dieta removida com sucesso." });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Erro ao remover dieta.", error: error.message });
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
        return res
          .status(403)
          .json({
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

export default DietaController;
