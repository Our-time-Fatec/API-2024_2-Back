import { DiasSemana } from "../enums/DiasSemana";
import { IAlimentoConsumido } from "../Interfaces/IAlimento";
import { IDietaDiaria, IDietaFixa } from "../Interfaces/IDieta";
import AlimentoConsumidoModel from "../models/alimentoConsumido";
import DietaDiariaModel from "../models/dietaDiaria";
import DietaFixaModel from "../models/dietaFixa";

class DefinirDietaDiaria {
    private diaAtualDaSemana = () => {
        const today = new Date();
        const dayIndex = today.getDay(); 
        const daysOfWeek = Object.values(DiasSemana);
        return daysOfWeek[dayIndex]; 
    };

    public async criarDietaDiaria(userId:string) {
        const hoje = new Date()
        const diaAtual = this.diaAtualDaSemana();

        const dietaDiaria = await DietaDiariaModel.findOne({
            usuarioId: userId,
            dia: {
                $gte: new Date(hoje.setHours(0, 0, 0, 0)), 
                $lt: new Date(hoje.setHours(23, 59, 59, 999)) 
            } 
        })

        if(dietaDiaria){
            return
        }
        
        const dietaDoDia = await DietaFixaModel.findOne({
            usuarioId: userId,
            diaSemana: diaAtual 
        });

        const alimentosConsumidos:IAlimentoConsumido[] = await AlimentoConsumidoModel.find({
            criadoPor: userId,
            criadoEm: {
                $gte: new Date(hoje.setHours(0, 0, 0, 0)), 
                $lt: new Date(hoje.setHours(23, 59, 59, 999)) 
            }
        });

        if(dietaDoDia){
            const novaDietaDiaria = new DietaDiariaModel({
                usuarioId: userId,
                diaSemana: diaAtual,
                dia: new Date,
                detalhes: dietaDoDia.detalhes,
                grupos: dietaDoDia.grupos,
                alimentosConsumidos: alimentosConsumidos
            });
            await novaDietaDiaria.save();
            return novaDietaDiaria;
        }

        return null;      
    }

    public async atualizarDietaDiaria(userId:string, dieta:IDietaFixa){
        const diaSemanaAtual = this.diaAtualDaSemana();
        const hoje = new Date

        const dietaDoDia = await DietaDiariaModel.findOne({
            usuarioId: userId,
            diaSemana: diaSemanaAtual,
            dia: {
                $gte: new Date(hoje.setHours(0, 0, 0, 0)), 
                $lt: new Date(hoje.setHours(23, 59, 59, 999)) 
            }
        })

        if(dietaDoDia){ 
            dietaDoDia.diaSemana = dieta.diaSemana;
            dietaDoDia.detalhes = dieta.detalhes;
            dietaDoDia.grupos = dieta.grupos;

            await dietaDoDia.save();
            return dietaDoDia
        }

        return null
    }

    public async removerDietaDiaria(userId:string){
        const diaSemanaAtual = this.diaAtualDaSemana();
        const hoje = new Date
        await DietaDiariaModel.updateMany(
            {
                usuarioId: userId,
                diaSemana: diaSemanaAtual,
                dia: {
                    $gte: new Date(hoje.setHours(0, 0, 0, 0))
                }
            },
            {
                $set: { removidoEm: new Date() } 
            }
        );
    }
}

export default new DefinirDietaDiaria()