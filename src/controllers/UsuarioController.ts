import { Request, Response } from "express";
import Usuario from "../models/usuarios";
import jwt from "jsonwebtoken";
import UsuarioFunc from "../func/UsuarioFunc";

const hooks = new UsuarioFunc()

class UsuarioController {
    // public async login(req: Request, res: Response): Promise<void> {
    //   const { mail, password } = req.body;
  
    //   if (!mail || !password) {
    //     res.status(401).json({ erro: "Forneça o e-mail e senha" });
    //   } else {
    //     try {
    //       const Usuario = await Usuario.findOne({ mail, password });
    //       if (Usuario) {
    //         res.json({ ...Usuario.toObject(), token: tokenize(Usuario.toObject()) });
    //       } else {
    //         res.json({ erro: "Dados de login não conferem" });
    //       }
    //     } catch (e: any) {
    //       res.status(500).json({ erro: e.message });
    //     }
    //   }
    // }
    
    public async create(req: Request, res: Response): Promise<void> {
        const { email, password, data_de_nascimento, peso, altura, sedentarismo, sexo } = req.body;
        if (!email && !password) {
            res.status(401).json({ erro: "Forneça o e-mail e senha" });
        }else{
        try {
            
            const IMC = hooks.calculadoraIMC(altura, peso)
            const response = await Usuario.create({email, password, data_de_nascimento, peso, altura, sedentarismo, sexo, IMC });
            res.send(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }
    }


    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Usuario.find(
            {},
            {},
            {
                sort: { mail: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Usuario.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async updatemail(req: Request, res: Response): Promise<void> {
        const { id, email } = req.body;
        try {
            const response = await Usuario.findByIdAndUpdate(
                id,
                { email },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            }
            else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
            if (e.code === 11000) {
                res.send({ message: `O e-mail ${email} já está em uso` });
            }
            else if (e.errors?.mail) {
                res.send({ message: e.errors.mail.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }

    public async updasenha(req: Request, res: Response): Promise<void> {
        const { id, password } = req.body;
        try {
            const response = await Usuario.findByIdAndUpdate(
                id,
                { password },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            }
            else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
           
            if (e.errors?.mail) {
                res.send({ message: e.errors.password.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new UsuarioController();