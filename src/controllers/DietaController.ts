import { Request, Response } from 'express';
import { IAlimentoDieta, IDietaFixa, IGrupo, IDietaDetalhes } from '../Interfaces/IDieta';
import { IAlimento } from '../Interfaces/IAlimento';
import DietaFixaModel from '../models/dietaFixa';
import calcularDetalhesDieta from '../utils/CalcularDetalhesDieta';

class DietaController {
    static async criarDieta(req: Request, res: Response): Promise<Response> {
        try {
            const { userId, diaSemana, grupos } = req.body;

            if (!userId || !diaSemana || !grupos || !Array.isArray(grupos)) {
                return res.status(400).json({ message: 'Parâmetros inválidos ou ausentes.' });
            }

            const { gruposCompletos, dietaDetalhes } = await calcularDetalhesDieta(grupos);

            const novaDieta = new DietaFixaModel({
                usuarioId: userId,
                diaSemana,
                criadoEm: new Date(),
                detalhes: dietaDetalhes,
                grupos: gruposCompletos
            });

            await novaDieta.save();

            return res.status(201).json(novaDieta);

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar dieta.', error: error.message });
        }
    }

    static async atualizarDieta(req: Request, res: Response): Promise<Response> {
        try {
            const dietaId = req.params.id;
            const { userId, diaSemana, grupos } = req.body;

            if (!userId || !diaSemana || !grupos || !Array.isArray(grupos)) {
                return res.status(400).json({ message: 'Parâmetros inválidos ou ausentes.' });
            }

            const dieta = await DietaFixaModel.findById(dietaId);
            if (!dieta) {
                return res.status(404).json({ message: 'Dieta não encontrada.' });
            }

            if (dieta.usuarioId !== userId) {
                return res.status(403).json({ message: 'Você não tem permissão para atualizar esta dieta.' });
            }

            const { gruposCompletos, dietaDetalhes } = await calcularDetalhesDieta(grupos);

            dieta.diaSemana = diaSemana;
            dieta.detalhes = dietaDetalhes;
            dieta.grupos = gruposCompletos;
            dieta.atualizadoEm = new Date();

            await dieta.save();

            return res.status(200).json(dieta);

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar dieta.', error: error.message });
        }
    }
}

export default DietaController;
