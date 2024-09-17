import { Request, Response } from "express";
import AlimentoConsumido from "../models/alimentoConsumido";
import Alimento from "../models/alimento";
import Usuario from "../models/usuarios";
import Categoria from "../models/categoria";

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
    const { _id, porcao, quantidade } = req.body;
    const userId = req.body.userId;

    if (!_id && !porcao && !quantidade) {
      return res.status(401).json({ message: "Preencha todos os campos." });
    }

    try {
      const usuario = await Usuario.findById(userId);

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const alimento = await Alimento.findById(_id)
      if (!alimento) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }
      const proporcaoPorcao = porcao / Number(alimento.porcao);
      const alimentoConsumidoSalvo = await AlimentoConsumido.create({
        nome: alimento.nome,
        preparo: alimento.preparo,
        categoriaCodigo: alimento.categoriaCodigo,
        porcao,
        quantidade,
        criadoPor: userId,
        criadoEm: new Date(),
        atualizadoEm: null,
        removidoEm: null,
        detalhes: {
          valorEnergetico: alimento.detalhes.valorEnergetico * proporcaoPorcao * quantidade,
          proteinas: alimento.detalhes.proteinas * proporcaoPorcao * quantidade,
          carboidratos: alimento.detalhes.carboidratos * proporcaoPorcao * quantidade,
          fibras: alimento.detalhes.fibras * proporcaoPorcao * quantidade,
          lipidios: alimento.detalhes.lipidios * proporcaoPorcao * quantidade,
        }
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
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;
    try {
      const filtro = {
        removidoEm: null,
        criadoPor: userId,
      };

      const alimentos = await AlimentoConsumido.find(filtro).sort({ criadoEm: -1 }).skip(skip)
        .limit(limit);

      const alimentosComCategoria = await Promise.all(
        alimentos.map(async (alimento) => {
          const categoria = await Categoria.findOne({ codigo: alimento.categoriaCodigo });
          return {
            ...alimento.toObject(),
            categoriaNome: categoria ? categoria.nome : 'Categoria não encontrada',
            categoriaUrl: categoria ? categoria.urlPlaceholder : 'URL não encontrada'
          };
        })
      );
      return res.json({
        alimentosComCategoria,
        totalPages: Math.ceil(await AlimentoConsumido.countDocuments(filtro) / limit)
      });

    } catch (error) {
      console.error("Erro ao listar alimentos:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  // async findAlimentoConsumidoById(
  //   req: Request,
  //   res: Response
  // ): Promise<Response> {
  //   const { id } = req.params;

  //   try {
  //     const alimento = await AlimentoConsumido.findById(id);
  //     if (!alimento || alimento.removidoEm) {
  //       return res.status(404).json({ message: "Alimento não encontrado" });
  //     }

  //     return res.status(200).json(alimento);
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .json({ message: "Erro ao buscar alimento", error });
  //   }
  // }

  // async update(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const userId = req.body.userId;
  //   const { nome, preparo, porcao, detalhes } = req.body;

  //   try {
  //     const alimento = await AlimentoConsumido.findById(id);

  //     if (!alimento || alimento.removidoEm) {
  //       return res.status(404).json({ message: "Alimento não encontrado" });
  //     }

  //     if (alimento.criadoPor.toString() !== userId) {
  //       return res
  //         .status(403)
  //         .json({
  //           message: "Você não tem permissão para editar este alimento",
  //         });
  //     }

  //     alimento.nome = nome || alimento.nome;
  //     alimento.preparo = preparo || alimento.preparo;
  //     alimento.porcao = porcao || alimento.porcao;
  //     alimento.detalhes = detalhes || alimento.detalhes;

  //     const alimentoAtualizado = await alimento.save();
  //     return res.status(200).json(alimentoAtualizado);
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .json({ message: "Erro ao editar alimento", error });
  //   }
  // }

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
      console.log(error)
      return res.status(500).json({ message: "Erro ao deletar alimento", error });
    }
  }
}

export default new AlimentoConsumidoConctroller()