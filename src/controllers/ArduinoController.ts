import { Request, Response } from "express";
import Usuario from "../models/usuarios";

class ArduinoController {

    public async getUltimoConsumoAgua(req: Request, res: Response): Promise<void> {
        try {
            const { Id } = req.params;
            const usuario = await Usuario.findById(Id);

            if (!usuario) {
                res.status(404).json({ erro: "Usuário não encontrado" });
                return;
            }

            const ultimoHorario = usuario.agua.atualizacao;
            const timestampSeconds = Math.floor(new Date(ultimoHorario).getTime() / 1000);
            const timestampSecondsNow = Math.floor(Date.now() / 1000);
            const diferencaSegundos = timestampSecondsNow - timestampSeconds;
            const diferencaMinutos = diferencaSegundos /    60;

            res.status(200).json(parseInt(diferencaMinutos.toFixed(0)));
        } catch (error: any) {
            res.status(500).json({ message: "Erro ao buscar informações do usuário", error: error.error });
        }
    }

}

export default new ArduinoController();