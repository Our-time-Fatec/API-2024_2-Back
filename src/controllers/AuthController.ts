import { Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
import Usuario from "../models/usuarios";
import criptografia from "../utils/criptografia";
import { ObjectId, Types } from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";
const REFRESH_SECRET = process.env.JWT_SECRET_REFRESH || "secretKeyRefresh";
const JWT_EXPIRES_IN = '1d';
const REFRESH_EXPIRES_IN = '30d';

export function generateToken(userId: Types.ObjectId, email: string) {
    return jwt.sign({ userId: userId.toString(), email: email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function generateRefreshToken(userId: Types.ObjectId, email: string) {
    return jwt.sign({ userId: userId.toString(), email: email }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

class AuthController {

    public async login(req: Request, res: Response): Promise<void> {
        const { email, senha } = req.body;

        // Verifica se email e senha foram fornecidos
        if (!email || !senha) {
            res.status(400).json({ message: "E-mail e senha são obrigatórios" });
            return;
        }

        try {
            // Busca o usuário pelo email
            const usuario = await Usuario.findOne({ email, removidoEm: null }).select("+senha");
            if (!usuario) {
                res.status(401).json({ message: "Usuário não encontrado" });
                return;
            }

            // Verifica se a senha está correta
            const hash = usuario.senha ?? "";
            const senhaCorreta = await criptografia.verificarSenha(senha, hash)
            if (!senhaCorreta) {
                res.status(401).json({ message: "Credenciais inválidas" });
                return;
            }

            const token = generateToken(usuario._id, usuario.email)
            const refreshToken = generateRefreshToken(usuario._id, usuario.email);

            // Retorna os dados do usuário sem a senha
            const { senha: _, ...userWithoutPassword } = usuario.toObject();

            res.status(200).json({
                message: "Login realizado com sucesso",
                usuario: userWithoutPassword,
                token,
                refreshToken
            });
        } catch (error: any) {
            res.status(500).json({ message: "Erro no servidor", error: error.message });
        }
    }

    public async refresh(req: Request, res: Response): Promise<Response> {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token não fornecido' });
        }

        try {
            // Verifica e decodifica o Refresh Token
            const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { userId: Types.ObjectId, email: string };

            // Gera um novo JWT
            const newToken = generateToken(decoded.userId, decoded.email);

            // Opcional: Gera um novo Refresh Token também, dependendo da sua política
            const newRefreshToken = generateRefreshToken(decoded.userId, decoded.email);

            // Retorna o novo JWT e (opcionalmente) o novo Refresh Token
            return res.json({ token: newToken, refreshToken: newRefreshToken });
        } catch (err) {
            return res.status(403).json({ message: 'Refresh token inválido ou expirado' });
        }
    }
}

export default new AuthController();
