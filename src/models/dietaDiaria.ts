import { model, Schema } from "mongoose";
import { IDietaDiaria, IGrupo, IGrupoConsumo } from "../Interfaces/IDieta";
import { DiasSemana } from "../enums/DiasSemana";
import { DietaDetalhesSchema, GrupoSchema } from "./dietaFixa";
import { AlimentoConsumidoSchema } from "./alimentoConsumido";

const GruposConsumidosSchema = new Schema<IGrupoConsumo>({
    nome: {type: String, required: true},
    alimentosConsumidos: {type: [AlimentoConsumidoSchema]}
})

const DietaDiariaSchema = new Schema<IDietaDiaria>({
    usuarioId: { type: String, required: true },
    diaSemana: { type: String, enum: Object.values(DiasSemana), required: true },
    dia: {type: Date, required: true},
    detalhes: { type: DietaDetalhesSchema, required: true },
    removidoEm: { type: Date, default: null, required: false },
    grupos: {
        type: [GrupoSchema],
        required: true,
        validate: {
            validator: (v: IGrupo[]) => {
                const nomesUnicos = new Set(v.map(grupo => grupo.nome));
                return nomesUnicos.size === v.length;
            },
            message: 'Os grupos na dieta não podem se repetir.',
        },
    },
    gruposConsumo: {type: [GruposConsumidosSchema]}
});

const DietaDiariaModel = model<IDietaDiaria>('DietaDiaria', DietaDiariaSchema, 'DietasDiarias');

export default DietaDiariaModel;
