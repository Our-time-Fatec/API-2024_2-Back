import { Request, Response } from "express";
import AlimentoConsumido from "../models/alimentoConsumido";
import Alimento from "../models/alimento";
import Usuario from "../models/usuarios";

class AlimentoConsumidoConctroller {
//   async create(req: Request, res: Response): Promise<Response> {
//     const { nome, preparo, porcao, detalhes, quantidade } = req.body;
//     const userId = req.body.userId;

//     try {
//       const usuario = await Usuario.findById(userId);

//       if (!usuario) {
//         return res.status(404).json({ message: "Usuário não encontrado" });
//       }

//       const alimentoConsumidoSalvo = await AlimentoConsumido.create({
//         nome,
//         preparo,
//         porcao,
//         criadoPor: userId,
//         criadoEm: new Date(),
//         atualizadoEm: null,
//         removidoEm: null,
//         detalhes,
//         quantidade,
//       });

//       return res.status(201).json(alimentoConsumidoSalvo);
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "Erro ao criar o consumo", error });
//     }
//   }

async create(req: Request, res: Response): Promise<Response> {
    const { id, porcao, quantidade } = req.body;
    const userId = req.body.userId;

    try {
      const usuario = await Usuario.findById(userId);

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const alimento = await Alimento.findById(id)
      if (!alimento) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      const alimentoConsumidoSalvo = await AlimentoConsumido.create({
        nome: alimento.nome,
        preparo: alimento.preparo,
        porcao,
        criadoPor: userId,
        criadoEm: new Date(),
        atualizadoEm: null,
        removidoEm: null,
        detalhes: alimento.detalhes,
        quantidade,
      });

      return res.status(201).json(alimentoConsumidoSalvo);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao criar o consumo", error });
    }
  }


  async listAlimentosConsumidos(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.body.userId;

    try {
      const filtro = {
        removidoEm: null,
        criadoPor: userId,
      };

      const alimentos = await AlimentoConsumido.find(filtro);

      return res.json({
        alimentos,
      });
    } catch (error) {
      console.error("Erro ao listar alimentos:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async findAlimentoConsumidoById(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    try {
      const alimento = await AlimentoConsumido.findById(id);
      if (!alimento || alimento.removidoEm) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      return res.status(200).json(alimento);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar alimento", error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.body.userId;
    const { nome, preparo, porcao, detalhes } = req.body;

    try {
      const alimento = await AlimentoConsumido.findById(id);

      if (!alimento || alimento.removidoEm) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      if (alimento.criadoPor.toString() !== userId) {
        return res
          .status(403)
          .json({
            message: "Você não tem permissão para editar este alimento",
          });
      }

      alimento.nome = nome || alimento.nome;
      alimento.preparo = preparo || alimento.preparo;
      alimento.porcao = porcao || alimento.porcao;
      alimento.detalhes = detalhes || alimento.detalhes;

      const alimentoAtualizado = await alimento.save();
      return res.status(200).json(alimentoAtualizado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao editar alimento", error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.body.userId;

    try {
        const alimento = await AlimentoConsumido.findById(id);

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
}

export default new AlimentoConsumidoConctroller()