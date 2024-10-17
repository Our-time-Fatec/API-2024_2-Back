import { Request, Response } from "express";
import AlimentoConsumido from "../models/alimentoConsumido";
import Alimento from "../models/alimento";
import Usuario from "../models/usuarios";
import Categoria from "../models/categoria";
import DietaDiariaModel from "../models/dietaDiaria";
import definirDietaDiaria from "../utils/definirDietaDiaria";

class AlimentoConsumidoController {
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
    const { _id, porcao, quantidade, nomeGrupo } = req.body;
    const userId = req.body.userId;

    if (!_id && !porcao && !quantidade && !nomeGrupo) {
      return res.status(401).json({ message: "Preencha todos os campos." });
    }

    try {
      const usuario = await Usuario.findById(userId);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const alimento = await Alimento.findById(_id);
      if (!alimento) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      const proporcaoPorcao = porcao / Number(alimento.porcao);

      const alimentoConsumidoSalvo = await AlimentoConsumido.create({
        alimentoId: _id,
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
          valorEnergetico:
            alimento.detalhes.valorEnergetico * proporcaoPorcao * quantidade,
          proteinas: alimento.detalhes.proteinas * proporcaoPorcao * quantidade,
          carboidratos:
            alimento.detalhes.carboidratos * proporcaoPorcao * quantidade,
          fibras: alimento.detalhes.fibras * proporcaoPorcao * quantidade,
          lipidios: alimento.detalhes.lipidios * proporcaoPorcao * quantidade,
        },
        nomeGrupo: nomeGrupo,
      });

      // Atualiza ou cria a dieta diária
      await definirDietaDiaria.criarDietaDiaria(userId);

      const hoje = new Date();
      const dietaDoDia = await DietaDiariaModel.findOne({
        usuarioId: userId,
        dia: {
          $gte: new Date(hoje.setHours(0, 0, 0, 0)), // Início do dia
          $lt: new Date(hoje.setHours(23, 59, 59, 999)), // Fim do dia
        },
        removidoEm: null,
      });

      if (dietaDoDia && alimentoConsumidoSalvo.nomeGrupo) {
        // Verifica se o grupo de consumo já existe
        let grupoConsumo = dietaDoDia.gruposConsumo.find(
          (grupo) => grupo.nome === alimentoConsumidoSalvo.nomeGrupo
        );

        if (!grupoConsumo) {
          // Se não existe, cria um novo grupo de consumo
          grupoConsumo = {
            nome: alimentoConsumidoSalvo.nomeGrupo,
            alimentos: [alimentoConsumidoSalvo],
          };
          dietaDoDia.gruposConsumo.push(grupoConsumo);
        }

        const alimentoExistente = grupoConsumo.alimentos.find(
          (alimento) => alimento._id === alimentoConsumidoSalvo._id // ou outra propriedade única
        );

        if (!alimentoExistente) {
          grupoConsumo.alimentos.push(alimentoConsumidoSalvo);
        }

        await dietaDoDia.save();
      }

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

      const alimentos = await AlimentoConsumido.find(filtro)
        .sort({ criadoEm: -1 })
        .skip(skip)
        .limit(limit);

      const alimentosComCategoria = await Promise.all(
        alimentos.map(async (alimento) => {
          const categoria = await Categoria.findOne({
            codigo: alimento.categoriaCodigo,
          });
          return {
            ...alimento.toObject(),
            categoriaNome: categoria
              ? categoria.nome
              : "Categoria não encontrada",
            categoriaUrl: categoria
              ? categoria.urlPlaceholder
              : "URL não encontrada",
          };
        })
      );
      return res.json({
        alimentosComCategoria,
        totalPages: Math.ceil(
          (await AlimentoConsumido.countDocuments(filtro)) / limit
        ),
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
        return res
          .status(403)
          .json({
            message: "Você não tem permissão para deletar este alimento",
          });
      }

      alimento.removidoEm = new Date();
      await alimento.save();

      const hoje = new Date();
      const dietaDoDia = await DietaDiariaModel.findOne({
        usuarioId: userId,
        dia: {
          $gte: new Date(hoje.setHours(0, 0, 0, 0)), // Início do dia
          $lt: new Date(hoje.setHours(23, 59, 59, 999)), // Fim do dia
        },
      });

      if (dietaDoDia && alimento.nomeGrupo) {
        const grupo = dietaDoDia.gruposConsumo.find(
          (grupo) => grupo.nome === alimento.nomeGrupo
        );

        if (grupo) {
          grupo.alimentos = grupo.alimentos.filter(
            (alimentoConsumido) => alimentoConsumido._id.toString() !== id
          );

          await dietaDoDia.save();
        }
      }
      return res.status(200).json({ message: "Alimento deletado com sucesso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro ao deletar alimento", error });
    }
  }

  async findAndDelete(req: Request, res: Response): Promise<Response> {
    const { _id, porcao, nomeGrupo } = req.body;
    const userId = req.body.userId;

    try {
      // Primeiro, procurar o alimento na tabela Alimentos
      const alimento = await Alimento.findById(_id);
      if (!alimento) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }
      
      const hoje = new Date();
      // Agora, procurar o alimento consumido na tabela AlimentosConsumidos
      const alimentoConsumido = await AlimentoConsumido.findOne({
        alimentoId: _id,
        porcao,
        nomeGrupo,
        criadoPor: userId,
        removidoEm: null,
        criadoEm: {
          $gte: new Date(hoje.setHours(0, 0, 0, 0)), // Início do dia
          $lt: new Date(hoje.setHours(23, 59, 59, 999)), // Fim do dia
        },
      });

      if (!alimentoConsumido || alimentoConsumido.removidoEm) {
        return res
          .status(404)
          .json({
            message: "Alimento consumido não encontrado ou já removido",
          });
      }

      if (alimentoConsumido.criadoPor.toString() !== userId) {
        return res
          .status(403)
          .json({
            message:
              "Você não tem permissão para modificar este alimento consumido",
          });
      }

      // Diminuir a quantidade consumida
      alimentoConsumido.quantidade = Number(alimentoConsumido.quantidade) - 1;

      // Se a quantidade for 0, definir a data de remoção
      if (Number(alimentoConsumido.quantidade) <= 0) {
        alimentoConsumido.removidoEm = new Date();
      }

      await alimentoConsumido.save();

      // Atualizar a dieta diária, se necessário
      const dietaDoDia = await DietaDiariaModel.findOne({
        usuarioId: userId,
        dia: {
          $gte: new Date(hoje.setHours(0, 0, 0, 0)), // Início do dia
          $lt: new Date(hoje.setHours(23, 59, 59, 999)), // Fim do dia
        },
      });

      if (dietaDoDia) {
        const grupo = dietaDoDia.gruposConsumo.find(
          (grupo) => grupo.nome === nomeGrupo
        );

        if (grupo) {
          const alimentoNoGrupo = grupo.alimentos.find(
            (alimento) => alimento.alimentoId === alimentoConsumido.alimentoId
          );

          if (alimentoNoGrupo) {
            alimentoNoGrupo.quantidade = alimentoConsumido.quantidade;

            if (Number(alimentoNoGrupo.quantidade) <= 0) {
              grupo.alimentos = grupo.alimentos.filter(
                (alimento) =>
                  alimento._id.toString() !==
                    alimentoConsumido._id.toString() ||
                  Number(alimento.quantidade) > 0
              );
            }
            
            await dietaDoDia.save();
          }
        }
      }
      return res
        .status(200)
        .json({ message: "Alimento consumido atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao processar a requisição", error });
    }
  }
}

export default new AlimentoConsumidoController();
