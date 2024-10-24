import mongoose, { Schema, model, Document } from 'mongoose';
import { IAlimentoDieta, IDietaDetalhes, IDietaFixa, IGrupo } from '../Interfaces/IDieta';
import { DiasSemana } from '../enums/DiasSemana';

export const DietaDetalhesSchema = new Schema<IDietaDetalhes>({
    valorEnergetico: { type: Number, required: true },
    proteinas: { type: Number, required: true },
    carboidratos: { type: Number, required: true },
    fibras: { type: Number, required: true },
    lipidios: { type: Number, required: true },
});

const AlimentoSchema = new Schema<IAlimentoDieta>({
    alimentoId: {type: String},
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true },
    preparo: { type: String, required: true },
    porcao: { type: Number, required: true },
    categoriaCodigo: { type: String, required: true },
    detalhes: { type: DietaDetalhesSchema, required: true },
});

export const GrupoSchema = new Schema<IGrupo>({
    nome: {
        type: String,
        required: true,
        enum: ['Café da Manhã', 'Almoço', 'Café da Tarde', 'Janta'],
    },
    alimentos: { type: [AlimentoSchema], required: true },
});

const DietaFixaSchema = new Schema<IDietaFixa>({
    usuarioId: { type: String, required: true },
    diaSemana: { type: String, enum: Object.values(DiasSemana), required: true },
    criadoEm: { type: Date, default: Date.now, required: true },
    atualizadoEm: { type: Date, default: null, required: false },
    removidoEm: { type: Date, default: null, required: false },
    detalhes: { type: DietaDetalhesSchema, required: true },
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
});

const DietaFixaModel = model<IDietaFixa>('DietaFixa', DietaFixaSchema, 'DietasFixas');

export default DietaFixaModel;
