import { Request, Response } from "express";
import AlimentoConsumido from "../models/alimentoConsumido";
import Alimento from "../models/alimento";
import Usuario from "../models/usuarios";
import Categoria from "../models/categoria";
import DietaDiariaModel from "../models/dietaDiaria";
import definirDietaDiaria from "../utils/definirDietaDiaria";
import { DiasSemana } from "../enums/DiasSemana";
import { IAlimento, IAlimentoConsumido } from "../Interfaces/IAlimento";

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

      const hoje = new Date();
      const diaDaSemanaNumero = hoje.getDay(); // Retorna o número do dia da semana (0 para domingo, 6 para sábado)
      const diaDaSemana = DiasSemana[Object.keys(DiasSemana)[diaDaSemanaNumero] as keyof typeof DiasSemana];

      const alimentoConsumidoSalvo = await AlimentoConsumido.create({
        alimentoId: _id,
        nome: alimento.nome,
        preparo: alimento.preparo,
        categoriaCodigo: alimento.categoriaCodigo,
        porcao,
        quantidade,
        criadoPor: userId,
        criadoEm: new Date(),
        diaSemana: diaDaSemana,
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


  public async listAlimentosConsumidosSemana(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.body.userId;

    // Obtém a data de hoje
    const hoje = new Date();

    // Calcula o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
    const diaDaSemanaHoje = hoje.getDay();

    // Calcula a data de início da semana (domingo)
    const inicioDaSemana = new Date(hoje);
    inicioDaSemana.setDate(hoje.getDate() - diaDaSemanaHoje); // Define o início da semana para o domingo

    // Ajusta as horas para o início e fim do dia
    inicioDaSemana.setHours(0, 0, 0, 0); // Início do domingo
    const fimDeHoje = new Date(hoje.setHours(23, 59, 59, 999)); // Fim do dia de hoje

    try {
      // Filtra alimentos consumidos apenas dessa semana
      const filtro = {
        removidoEm: null,
        criadoPor: userId,
        criadoEm: { $gte: inicioDaSemana, $lte: fimDeHoje },
      };

      const alimentos = await AlimentoConsumido.find(filtro).sort({ criadoEm: -1 });

      // Organiza os alimentos por dia da semana
      const alimentosPorDia: Record<string, any[]> = {
        Domingo: [],
        "Segunda-feira": [],
        "Terça-feira": [],
        "Quarta-feira": [],
        "Quinta-feira": [],
        "Sexta-feira": [],
        Sábado: [],
      };

      // Mapeia os alimentos e obtém a categoria correspondente
      const alimentosComCategoria = await Promise.all(
        alimentos.map(async (alimento) => {
          const categoria = await Categoria.findOne({
            codigo: alimento.categoriaCodigo,
          });

          const detalhes = await Alimento.findById(alimento.alimentoId); // Obtém detalhes do alimento

          return {
            ...alimento.toObject(),
            categoriaNome: categoria ? categoria.nome : "Categoria não encontrada",
            categoriaUrl: categoria ? categoria.urlPlaceholder : "URL não encontrada",
            detalhes: detalhes ? detalhes.detalhes : null,
            diaSemana: alimento.diaSemana, // Certifique-se de que o dia da semana está sendo salvo corretamente no modelo
          };
        })
      );

      // Agrupa os alimentos pelo dia da semana usando o enum
      alimentosComCategoria.forEach((alimento) => {
        alimentosPorDia[alimento.diaSemana].push(alimento);
      });

      // Garante que todos os dias da semana até hoje estejam presentes no objeto
      const diasDaSemana = [
        DiasSemana.Domingo,
        DiasSemana.Segunda,
        DiasSemana.Terca,
        DiasSemana.Quarta,
        DiasSemana.Quinta,
        DiasSemana.Sexta,
        DiasSemana.Sabado,
      ];

      const alimentosPorDiaCompletos: Record<string, {
        dia: Date,
        total: { valorEnergetico: number; lipidios: number; proteinas: number; carboidratos: number; fibras: number; },
        alimentos: any[]
      }> = {};

      diasDaSemana.forEach((dia, index) => {
        if (index <= diaDaSemanaHoje) {
          // Inicializa o dia no objeto se não existir
          alimentosPorDiaCompletos[dia] = {
            dia: new Date(inicioDaSemana), // Atribui o início da semana como base
         
            total: { valorEnergetico: 0, lipidios: 0, proteinas: 0, carboidratos: 0, fibras: 0 },
            alimentos: [],
          };
          // Calcula a data correta para cada dia da semana
          alimentosPorDiaCompletos[dia].dia.setDate(inicioDaSemana.getDate() + index);

          // Agrupa os alimentos consumidos por alimentoId e porcao
          const consumosPorAlimento: Record<string, {
            alimentoId: string,
            porcao: Number,
            nome: string,
            criadoEm: Date,
            consumido: number,
            detalhes: any
          }> = {};

          alimentosPorDia[dia].forEach((alimento: IAlimentoConsumido) => {
            const chave = `${alimento.alimentoId}_${alimento.porcao}`; // Cria uma chave única baseada no alimentoId e porcao

            if (!consumosPorAlimento[chave]) {
              consumosPorAlimento[chave] = {
                alimentoId: alimento.alimentoId,
                porcao: alimento.porcao,
                nome: alimento.nome,
                criadoEm: alimento.criadoEm,
                consumido: 1, // Inicializa o consumo com 1
                detalhes: {
                  valorEnergetico: alimento.detalhes.valorEnergetico * alimento.quantidade, // Não multiplica pelo consumo ainda
                  proteinas: alimento.detalhes.proteinas * alimento.quantidade,
                  carboidratos: alimento.detalhes.carboidratos * alimento.quantidade,
                  fibras: alimento.detalhes.fibras * alimento.quantidade,
                  lipidios: alimento.detalhes.lipidios * alimento.quantidade,
                  _id: alimento.detalhes._id
                }
              };
            } else {
              consumosPorAlimento[chave].consumido += 1; // Incrementa a quantidade consumida

              // Atualiza os detalhes acumulando as informações
              consumosPorAlimento[chave].detalhes.valorEnergetico += alimento.detalhes.valorEnergetico * alimento.quantidade;
              consumosPorAlimento[chave].detalhes.proteinas += alimento.detalhes.proteinas * alimento.quantidade;
              consumosPorAlimento[chave].detalhes.carboidratos += alimento.detalhes.carboidratos * alimento.quantidade;
              consumosPorAlimento[chave].detalhes.fibras += alimento.detalhes.fibras * alimento.quantidade;
              consumosPorAlimento[chave].detalhes.lipidios += alimento.detalhes.lipidios * alimento.quantidade;
            }
          });

          // Converte o objeto de consumos para um array e soma os totais
          alimentosPorDiaCompletos[dia].alimentos = Object.values(consumosPorAlimento);

          // Calcula os totais para o dia
          alimentosPorDiaCompletos[dia].alimentos.forEach((alimento) => {
            alimentosPorDiaCompletos[dia].total.valorEnergetico += alimento.detalhes.valorEnergetico * alimento.consumido;
            alimentosPorDiaCompletos[dia].total.lipidios += alimento.detalhes.lipidios * alimento.consumido;
            alimentosPorDiaCompletos[dia].total.proteinas += alimento.detalhes.proteinas * alimento.consumido;
            alimentosPorDiaCompletos[dia].total.carboidratos += alimento.detalhes.carboidratos * alimento.consumido;
            alimentosPorDiaCompletos[dia].total.fibras += alimento.detalhes.fibras * alimento.consumido;
          });
        }
      });

      return res.json(alimentosPorDiaCompletos);
    } catch (error) {
      console.error("Erro ao listar alimentos da semana:", error);
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
        .json({ message: "Alimento consumido atualizado com sucesso", alimentoConsumido });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao processar a requisição", error });
    }
  }
}

export default new AlimentoConsumidoController();
