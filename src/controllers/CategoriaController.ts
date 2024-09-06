import { Request, Response } from "express";
import Categoria from "../models/categoria";

class CategoriaController {

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const categorias = await Categoria.find({ removidoEm: null });

            return res.status(200).json(categorias);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar categorias", error });
        }
    }
}

export default new CategoriaController();
