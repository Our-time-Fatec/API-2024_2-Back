import { DiasSemana } from "../enums/DiasSemana";
import { IAlimentoConsumido } from "../Interfaces/IAlimento";
import { IDietaDiaria, IDietaFixa, IGrupoConsumo } from "../Interfaces/IDieta";
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

    public async criarDietaDiaria(userId: string) {
        const hoje = new Date();
        const diaAtual = this.diaAtualDaSemana();
    
        // Verifica se já existe uma dieta diária para o usuário no dia atual
        const dietaDiariaExistente = await DietaDiariaModel.findOne({
            usuarioId: userId,
            dia: {
                $gte: new Date(hoje.setHours(0, 0, 0, 0)),
                $lt: new Date(hoje.setHours(23, 59, 59, 999))
            },
            removidoEm: null
        });
    
        // Se já existe uma dieta diária para hoje, não cria uma nova
        if (dietaDiariaExistente) {
            return;
        }
    
        // Busca a dieta fixa para o dia da semana atual
        const dietaDoDiaFixa = await DietaFixaModel.findOne({
            usuarioId: userId,
            diaSemana: diaAtual,
            removidoEm: null
        });
    
        if (!dietaDoDiaFixa) {
            return null; // Se não houver dieta fixa para o dia, não cria nada
        }
    
        // Busca os alimentos consumidos no dia atual
        const alimentosConsumidos: IAlimentoConsumido[] = await AlimentoConsumidoModel.find({
            criadoPor: userId,
            criadoEm: {
                $gte: new Date(hoje.setHours(0, 0, 0, 0)),
                $lt: new Date(hoje.setHours(23, 59, 59, 999))
            },
            removidoEm: null
        });
        
        // Mapeia os grupos de consumo com base nos alimentos consumidos
        const gruposConsumoMap = new Map<string, IGrupoConsumo>(); // Um mapa para agrupar por nomeGrupo
        
        alimentosConsumidos.forEach(alimento => {
            const grupoNome = alimento.nomeGrupo;
        
            // Verifica se o grupo já existe no mapa
            if (gruposConsumoMap.has(grupoNome)) {
                // Se o grupo já existir, adiciona o alimento à lista de alimentosConsumidos do grupo
                gruposConsumoMap.get(grupoNome)!.alimentosConsumidos.push(alimento);
            } else {
                // Se o grupo não existir, cria um novo grupo com o nome e o alimento
                gruposConsumoMap.set(grupoNome, {
                    nome: grupoNome,
                    alimentosConsumidos: [alimento]
                });
            }
        });

        // Converte o mapa em um array de grupos de consumo
        const gruposConsumo = Array.from(gruposConsumoMap.values());
        
        // Cria a nova dieta diária com base na dieta fixa e os alimentos consumidos
        const novaDietaDiaria = new DietaDiariaModel({
            usuarioId: userId,
            diaSemana: diaAtual,
            dia: new Date(),
            detalhes: dietaDoDiaFixa.detalhes,
            grupos: dietaDoDiaFixa.grupos, // Grupos da dieta fixa
            gruposConsumo: gruposConsumo // Grupos de consumo com alimentos consumidos agrupados
        });
        
        // Salva a nova dieta diária
        await novaDietaDiaria.save();
        return novaDietaDiaria;
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