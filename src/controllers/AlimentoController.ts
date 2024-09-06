import { Request, Response } from "express";
import { IAlimento } from "../Interfaces/IAlimento";
import Alimento from "../models/alimento";
import Categoria from "../models/categoria";

class AlimentoController {

    async create(req: Request, res: Response): Promise<Response> {
        const { nome, preparo, categoriaCodigo, detalhes } = req.body;
        const userId = req.body.userId;

        try {
            const alimentoSalvo = await Alimento.create({
                nome,
                preparo,
                categoriaCodigo,
                criadoPor: userId,
                criadoEm: new Date(),
                atualizadoEm: null,
                removidoEm: null,
                detalhes
            });

            return res.status(201).json(alimentoSalvo);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar alimento", error });
        }
    }

    async listAlimentos(req: Request, res: Response): Promise<Response> {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const categoriaCodigo = req.query.categoriaCodigo ? parseInt(req.query.categoriaCodigo as string) : null;

        const skip = (page - 1) * limit;

        try {

            const filtro: any = { removidoEm: null };
            if (categoriaCodigo !== null) {
                filtro.categoriaCodigo = categoriaCodigo;
            }


            const alimentos = await Alimento.find(filtro)
                .skip(skip)
                .limit(limit);

            const alimentosComCategoria = await Promise.all(
                alimentos.map(async (alimento) => {
                    const categoria = await Categoria.findOne({ codigo: alimento.categoriaCodigo });
                    return {
                        ...alimento.toObject(),
                        categoriaNome: categoria ? categoria.nome : 'Categoria não encontrada'
                    };
                })
            );

            const totalAlimentos = await Alimento.countDocuments(filtro);

            return res.status(200).json({
                alimentosComCategoria,
                currentPage: page,
                totalPages: Math.ceil(totalAlimentos / limit),
                totalAlimentos
            });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar alimentos", error });
        }
    }

    async findAlimentoById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const alimento = await Alimento.findById(id);
            if (!alimento || alimento.removidoEm) {
                return res.status(404).json({ message: "Alimento não encontrado" });
            }
            const categoria = await Categoria.findOne({ codigo: alimento.categoriaCodigo });
            const alimentoComCategoria = {
                ...alimento.toObject(),
                categoriaNome: categoria ? categoria.nome : "Categoria não encontrada"
            };

            return res.status(200).json(alimentoComCategoria);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar alimento", error });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const userId = req.body.userId;
        const { nome, preparo, categoriaCodigo, detalhes } = req.body;

        try {
            const alimento = await Alimento.findById(id);

            if (!alimento || alimento.removidoEm) {
                return res.status(404).json({ message: "Alimento não encontrado" });
            }

            if (alimento.criadoPor.toString() !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para editar este alimento" });
            }

            alimento.nome = nome || alimento.nome;
            alimento.preparo = preparo || alimento.preparo;
            alimento.categoriaCodigo = categoriaCodigo || alimento.categoriaCodigo;
            alimento.detalhes = detalhes || alimento.detalhes;
            alimento.atualizadoEm = new Date();

            const alimentoAtualizado = await alimento.save();
            return res.status(200).json(alimentoAtualizado);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao editar alimento", error });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const userId = req.body.userId;

        try {
            const alimento = await Alimento.findById(id);

            if (!alimento || alimento.removidoEm) {
                return res.status(404).json({ message: "Alimento não encontrado" });
            }

            if (alimento.criadoPor.toString() !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para deletar este alimento" });
            }

            alimento.removidoEm = new Date();
            await alimento.save();
            return res.status(200).json({ message: "Alimento deletado com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar alimento", error });
        }
    }

    async findAlimentosByUser(req: Request, res: Response): Promise<Response> {
        const userId = req.body.userId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const categoriaCodigo = req.query.categoriaCodigo ? parseInt(req.query.categoriaCodigo as string) : null;
        const skip = (page - 1) * limit;

        try {
            // Filtro para buscar alimentos criados pelo usuário
            const filtro: any = { criadoPor: userId, removidoEm: null };
            if (categoriaCodigo !== null) {
                filtro.categoriaCodigo = categoriaCodigo;
            }

            // Busca os alimentos com base no filtro
            const alimentos = await Alimento.find(filtro)
                .skip(skip)
                .limit(limit);

            // Busca o total de alimentos para a paginação
            const totalAlimentos = await Alimento.countDocuments(filtro);

            // Adiciona o nome da categoria a cada alimento
            const alimentosComCategoria = await Promise.all(
                alimentos.map(async (alimento) => {
                    const categoria = await Categoria.findOne({ codigo: alimento.categoriaCodigo });
                    return {
                        ...alimento.toObject(),
                        categoriaNome: categoria ? categoria.nome : 'Categoria não encontrada'
                    };
                })
            );

            return res.status(200).json({
                alimentosComCategoria,
                currentPage: page,
                totalPages: Math.ceil(totalAlimentos / limit),
                totalAlimentos
            });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar alimentos", error });
        }
    }
}

export default new AlimentoController();
