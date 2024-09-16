import { Request, Response } from "express";
import Usuario from "../models/usuarios";
import UsuarioFunc from "../func/UsuarioFunc";
import criptografia from "../utils/criptografia";
import { generateRefreshToken, generateToken } from "./AuthController";

const hooks = new UsuarioFunc()

class UsuarioController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { nome, sobrenome, email, senha, dataDeNascimento, peso, altura, nivelDeSedentarismo, sexo, objetivo } = req.body;

        if (!email && !senha) {
            return res.status(401).json({ message: "Forneça o e-mail e senha" });
        }

        if (senha) {
            if (senha.length < 6) {
                return res.status(400).json({ message: "A senha precisa ter no mínimo 6 caracteres" });
            }
            else if (senha.length > 20) {
                return res.status(400).json({ message: "A senha precisa ter no máximo 20 caracteres" });
            }
        }

        try {

            const existingUser = await Usuario.findOne({ email, removidoEm: null });
            if (existingUser) {
                return res.status(400).json({ message: "Este e-mail já está em uso por outro usuário ativo" });
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
            const taxaMetabolismoBasal = await hooks.calculadoraTaxaMetabolismoBasal(peso, altura, idade, sexo);
            const gastoDeCaloria = await hooks.calculadoraCaloriasGastas(nivelDeSedentarismo, taxaMetabolismoBasal);
            const consumoDeCaloriaPorDia = await hooks.calcularConsumoDeCaloriaPorDia(objetivo, gastoDeCaloria);
            const response = await Usuario.create({
                nome, sobrenome,
                email, senha: senhaCriptografada, dataDeNascimento, idade, peso, altura, nivelDeSedentarismo, sexo, objetivo,
                IMC, taxaMetabolismoBasal, gastoDeCaloria, consumoDeCaloriaPorDia
            });

            const token = generateToken(response._id, response.email);
            const refreshToken = generateRefreshToken(response._id, response.email);

            const { senha: _, ...userWithoutPassword } = response.toObject();

            return res.status(201).json({
                message: "Usuário criado com sucesso",
                usuario: userWithoutPassword,
                token,
                refreshToken
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
                sort: { email: 1 }
            });

            const usuariosReorganizados = usuarios.map(usuario => {
                const { _id, ...rest } = usuario.toObject();
                return { _id, ...rest };
            });

            res.status(200).json(usuariosReorganizados);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao listar usuários' });
        }
    }

    public async getUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;
            const usuario = await Usuario.findById(userId);

            if (!usuario) {
                res.status(404).json({ erro: 'Usuário não encontrado' });
                return;
            }
            const { _id, ...rest } = usuario.toObject();
            res.status(200).json({ _id, ...rest });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao buscar informações do usuário' });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { nome, sobrenome, email, senha, dataDeNascimento, peso, altura, objetivo, nivelDeSedentarismo, sexo, userId } = req.body;
        try {
            const usuario = await Usuario.findOne({ _id: userId, removidoEm: null });

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
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
            usuario.nivelDeSedentarismo = nivelDeSedentarismo || usuario.nivelDeSedentarismo;
            usuario.idade = hooks.calculadoraIdade(usuario.dataDeNascimento);
            usuario.IMC = hooks.calculadoraIMC(usuario.altura, usuario.peso);
            usuario.taxaMetabolismoBasal = await hooks.calculadoraTaxaMetabolismoBasal(usuario.peso, usuario.altura, usuario.idade, usuario.sexo);
            usuario.gastoDeCaloria = await hooks.calculadoraCaloriasGastas(usuario.nivelDeSedentarismo, usuario.taxaMetabolismoBasal);
            usuario.consumoDeCaloriaPorDia = await hooks.calcularConsumoDeCaloriaPorDia(usuario.objetivo, usuario.gastoDeCaloria);
            usuario.atualizadoEm = new Date();

            await usuario.save();
            return res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario });
        } catch (error: any) {
            console.log(error)
            if (error.code === 11000 || error.code === 11001) {
                return res.status(500).json({ message: "Este e-mail já está em uso" });
            }
            return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { userId } = req.body;

            const usuario = await Usuario.findOne({ _id: userId, removidoEm: null });

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            usuario.removidoEm = new Date();
            await usuario.save();

            return res.status(200).json({ message: 'Usuário removido com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao remover usuário', error });
        }
    }
}

export default new UsuarioController();