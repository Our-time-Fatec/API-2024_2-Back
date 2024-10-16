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

      await definirDietaDiaria.criarDietaDiaria(userId)

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

        await definirDietaDiaria.criarDietaDiaria(userId)

        const diaAtual = new Date();

        const filtro: any = {
            usuarioId: userId,
            dia: {
              $gte: new Date(diaAtual.setHours(0, 0, 0, 0)), 
              $lt: new Date(diaAtual.setHours(23, 59, 59, 999)) 
          },
            removidoEm: null,
        };

        const dieta = await DietaDiariaModel.find(filtro);

        return res.status(200).json(dieta);
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

export default DietaDiariaController;
