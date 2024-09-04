import { IAlimento } from "../models/alimento";
import Alimento from "../models/alimento";

class AlimentoController {
    public async create(alimentos: IAlimento[]): Promise<{ success: boolean; message: string; error?: any }> {
        try {
            await Alimento.insertMany(alimentos);
            return { success: true, message: "Alimentos criados com sucesso." };
        } catch (e: any) {
            return { success: false, message: "Erro ao criar alimentos.", error: e.message };
        }
    }
}

export default new AlimentoController();
