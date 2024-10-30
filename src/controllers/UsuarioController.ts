import { Request, Response } from "express";
import Usuario from "../models/usuarios";
import UsuarioFunc from "../func/UsuarioFunc";
import criptografia from "../utils/criptografia";
import { generateRefreshToken, generateToken } from "./AuthController";
import AlimentoConsumidoModel from "../models/alimentoConsumido";
import { AlimentoDetalhes } from "../Interfaces/IAlimento";
import moment from "moment";
import definirDietaDiaria from "../utils/definirDietaDiaria";
import { sendPasswordResetEmail } from "../middlewares/emailMiddleware";

const hooks = new UsuarioFunc();

class UsuarioController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      nome,
      sobrenome,
      email,
      senha,
      dataDeNascimento,
      peso,
      altura,
      nivelDeSedentarismo,
      sexo,
      objetivo,
    } = req.body;

    if (!email && !senha) {
      return res.status(401).json({ message: "Forneça o e-mail e senha" });
    }

    if (senha) {
      if (senha.length < 6) {
        return res
          .status(400)
          .json({ message: "A senha precisa ter no mínimo 6 caracteres" });
      } else if (senha.length > 20) {
        return res
          .status(400)
          .json({ message: "A senha precisa ter no máximo 20 caracteres" });
      }
    }

    try {
      const existingUser = await Usuario.findOne({ email, removidoEm: null });
      if (existingUser) {
        return res.status(400).json({
          message: "Este e-mail já está em uso por outro usuário ativo",
        });
      }

      const removedUser = await Usuario.findOne({ email });
      if (removedUser && removedUser.removidoEm !== null) {
        removedUser.removidoEm = null;
        await removedUser.save();
        return res.status(201).json({ message: "Usuario reativado" });
      }

      const senhaCriptografada = await criptografia.criptografarSenha(senha);
      const IMC = hooks.calculadoraIMC(altura, peso);
      const idade = hooks.calculadoraIdade(dataDeNascimento);
      const taxaMetabolismoBasal = hooks.calculadoraTaxaMetabolismoBasal(
        peso,
        altura,
        idade,
        sexo
      );
      const gastoDeCaloria = hooks.calculadoraCaloriasGastas(
        nivelDeSedentarismo,
        taxaMetabolismoBasal
      );
      const consumoDeCaloriaPorDia = hooks.calcularConsumoDeCaloriaPorDia(
        objetivo,
        gastoDeCaloria
      );
      const metaAgua = await hooks.calcularMetaAgua(peso);
      const response = await Usuario.create({
        nome,
        sobrenome,
        email,
        senha: senhaCriptografada,
        dataDeNascimento,
        idade,
        peso,
        altura,
        nivelDeSedentarismo,
        sexo,
        objetivo,
        IMC,
        taxaMetabolismoBasal,
        gastoDeCaloria,
        consumoDeCaloriaPorDia,
        metaAgua,
        agua: { aguaIngerida: 0, atualizacao: new Date() },
      });

      const token = generateToken(response._id, response.email);
      const refreshToken = generateRefreshToken(response._id, response.email);

      const { senha: _, ...userWithoutPassword } = response.toObject();

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        usuario: userWithoutPassword,
        senha,
        token,
        refreshToken,
      });
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        // código 11000 e 11001 indica violação de restrição única (índice duplicado)
        return res.status(500).json({ message: "Este e-mail já está em uso" });
      } else if (error && error.errors["email"]) {
        return res.status(400).json({ message: error.errors["email"].message });
      } else if (error && error.errors["senha"]) {
        return res.status(400).json({ message: error.errors["senha"].message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  public async list(_: Request, res: Response): Promise<void> {
    try {
      const usuarios = await Usuario.find({ removidoEm: null }, null, {
        sort: { email: 1 },
      });

      const usuariosReorganizados = usuarios.map((usuario) => {
        const { _id, ...rest } = usuario.toObject();
        return { _id, ...rest };
      });

      res.status(200).json(usuariosReorganizados);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  }

  public async getUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;
      const usuario = await Usuario.findById(userId);

      if (!usuario) {
        res.status(404).json({ erro: "Usuário não encontrado" });
        return;
      }
      const { _id, ...rest } = usuario.toObject();
      res.status(200).json({ _id, ...rest });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar informações do usuário" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      nome,
      sobrenome,
      email,
      senha,
      dataDeNascimento,
      peso,
      altura,
      objetivo,
      nivelDeSedentarismo,
      sexo,
      userId,
    } = req.body;
    try {
      const usuario = await Usuario.findOne({ _id: userId, removidoEm: null });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      usuario.nome = nome || usuario.nome;
      usuario.sobrenome = sobrenome || usuario.sobrenome;
      usuario.email = email || usuario.email;
      if (senha) {
        usuario.senha = await criptografia.criptografarSenha(senha);
      }
      usuario.peso = peso || usuario.peso;
      usuario.altura = altura || usuario.altura;
      usuario.objetivo = objetivo || usuario.objetivo;
      usuario.dataDeNascimento = dataDeNascimento || usuario.dataDeNascimento;
      usuario.sexo = sexo || usuario.sexo;
      usuario.nivelDeSedentarismo =
        nivelDeSedentarismo || usuario.nivelDeSedentarismo;
      usuario.idade = hooks.calculadoraIdade(usuario.dataDeNascimento);
      usuario.IMC = hooks.calculadoraIMC(usuario.altura, usuario.peso);
      usuario.taxaMetabolismoBasal =
        await hooks.calculadoraTaxaMetabolismoBasal(
          usuario.peso,
          usuario.altura,
          usuario.idade,
          usuario.sexo
        );
      usuario.gastoDeCaloria = await hooks.calculadoraCaloriasGastas(
        usuario.nivelDeSedentarismo,
        usuario.taxaMetabolismoBasal
      );
      usuario.consumoDeCaloriaPorDia =
        await hooks.calcularConsumoDeCaloriaPorDia(
          usuario.objetivo,
          usuario.gastoDeCaloria
        );
      usuario.metaAgua = await hooks.calcularMetaAgua(usuario.peso);
      usuario.atualizadoEm = new Date();

      await usuario.save();
      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso", usuario });
    } catch (error: any) {
      console.log(error);
      if (error.code === 11000 || error.code === 11001) {
        return res.status(500).json({ message: "Este e-mail já está em uso" });
      }
      return res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body;

      const usuario = await Usuario.findOne({ _id: userId, removidoEm: null });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      usuario.removidoEm = new Date();
      await usuario.save();

      return res.status(200).json({ message: "Usuário removido com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao remover usuário", error });
    }
  }

  public async getUsuarioDetalhes(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;
      const usuario = await Usuario.findById(userId);

      if (!usuario) {
        res.status(404).json({ erro: "Usuário não encontrado" });
        return;
      }

      await hooks.checagemAgua(usuario.agua.atualizacao, usuario);

      const dataAtualInicio = moment().startOf("day").toDate();
      const dataAtualFim = moment().endOf("day").toDate();

      const filtro = {
        removidoEm: null,
        criadoPor: userId,
        criadoEm: { $gte: dataAtualInicio, $lte: dataAtualFim },
      };

      const alimentos = await AlimentoConsumidoModel.find(filtro);

      const totais: AlimentoDetalhes = {
        valorEnergetico: 0,
        carboidratos: 0,
        proteinas: 0,
        fibras: 0,
        lipidios: 0,
      };

      alimentos.forEach((alimento) => {
        totais.valorEnergetico += alimento.detalhes.valorEnergetico || 0;
        totais.carboidratos += alimento.detalhes.carboidratos || 0;
        totais.proteinas += alimento.detalhes.proteinas || 0;
        totais.fibras += alimento.detalhes.fibras || 0;
        totais.lipidios += alimento.detalhes.lipidios || 0;
      });

      const { _id, agua, ...rest } = usuario.toObject();
      const aguaIngerida = agua.aguaIngerida;

      res.status(200).json({
        _id,
        ...rest,
        totaisAlimentosConsumidos: totais,
        agua: {
          aguaIngerida,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
      res.status(500).json({ erro: "Erro ao buscar informações do usuário" });
    }
  }

  public async atualzarAgua(req: Request, res: Response): Promise<Response> {
    try {
      const { aguaIngerida, userId } = req.body;
      const usuario = await Usuario.findById(userId);

      if (!aguaIngerida) {
        return res.status(500).json({ message: "Informe a quantia de agua" });
      }

      if (!usuario) {
        res.status(404).json({ erro: "Usuário não encontrado" });
        return res.status(500).json({ erro: "Erro ao encontrar usuário" });
      }

      await hooks.checagemAgua(usuario.agua.atualizacao, usuario);

      usuario.agua.aguaIngerida =
        usuario.agua.aguaIngerida + parseInt(aguaIngerida);
      if (usuario.agua.aguaIngerida >= usuario.metaAgua) {
        usuario.agua.aguaIngerida = usuario.metaAgua;
      }

      usuario.agua.atualizacao = new Date();

      usuario.save();

      return res.status(200).json({
        message: `Quantia atualizada! Agora você já consumiu ${aguaIngerida}ml de agua!`,
        aguaIngerida: usuario.agua.aguaIngerida,
      });
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
      return res
        .status(500)
        .json({ erro: "Erro ao atualizar a quantia de água consumida" });
    }
  }

  public async zerarAgua(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    const usuario = await Usuario.findById(userId);

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado" });
      return res.status(500).json({ erro: "Erro ao encontrar usuário" });
    }

    const DataForcada = new Date(2023, 5, 15);

    hooks.checagemAgua(usuario.agua.atualizacao, usuario, DataForcada);

    return res.status(200).json({
      message: `Quantia atualizada! Agora você já consumiu ${usuario.agua.aguaIngerida}ml de agua!`,
      aguaIngerida: usuario.agua.aguaIngerida,
    });
  }

  public async editPassword(req: Request, res: Response): Promise<Response> {
    const { linkEmail } = req.query;
    const { senha } = req.body;
    let email: string;
  
    if (!senha) {
      return res.status(400).json({ message: "Nova senha é obrigatória" });
    }
    if (senha.length < 6) {
      return res
        .status(400)
        .json({ message: "A nova senha precisa ter no mínimo 6 caracteres" });
    }
    if (senha.length > 20) {
      return res
        .status(400)
        .json({ message: "A nova senha precisa ter no máximo 20 caracteres" });
    }
  
    if (!linkEmail) {
      return res.status(400).json({ message: "Link de email não foi fornecido" });
    }
  
    if (typeof linkEmail === "string") {
        const cleanLinkEmail = linkEmail.replace(/[{}]/g, "");
      email = decodeURIComponent(cleanLinkEmail); // Decodifica o linkEmail
    } else {
      return res.status(400).json({ message: "Link de email inválido" });
    }
  
    try {
      const usuario = await Usuario.findOne({ email, removidoEm: null });
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado", email });
      }
      const senhaCriptografa = await criptografia.criptografarSenha(senha);
  
      usuario.senha = senhaCriptografa;
      usuario.atualizadoEm = new Date();
      await usuario.save();
  
      return res
        .status(200)
        .json({ message: "Senha atualizada com sucesso", usuario });
    } catch (error: any) {
      console.error("Erro ao atualizar a senha", error);
      return res
        .status(500)
        .json({ message: "Erro ao atualizar a senha", error: error.message });
    }
  }
  
  public async verificarEmail(req: Request, res: Response): Promise<Response> {
    const { email, resetLink } = req.body;

    try {
      const user = await Usuario.findOne({ email });

      if (user) {
        await sendPasswordResetEmail(email, resetLink);
        return res.status(200).json({ exists: true });
      } else {
        return res.status(404).json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao verificar o e-mail." });
    }
  }
}

export default new UsuarioController();
