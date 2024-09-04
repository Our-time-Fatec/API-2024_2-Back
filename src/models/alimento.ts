import mongoose, { Schema, model, Document } from 'mongoose';

interface AlimentoDetalhes {
    valorEnergetico: number;
    proteinas: number;
    carboidratos: number;
    fibras: number;
    lipidios: number;
}

export interface IAlimento extends Document {
    id: string;
    nome: string;
    preparo: string;
    categoriaCodigo: Number;
    criadoPor: string;
    criadoEm: Date;
    atualizadoEm: Date | null;
    removidoEm: Date | null;
    detalhes: AlimentoDetalhes;
}

const AlimentoDetalhesSchema = new Schema<AlimentoDetalhes>({
    valorEnergetico: { type: Number, required: false },
    proteinas: { type: Number, required: false },
    carboidratos: { type: Number, required: false },
    fibras: { type: Number, required: false },
    lipidios: { type: Number, required: false },
});

const AlimentoSchema = new Schema<IAlimento>({
    nome: { type: String, required: true },
    preparo: { type: String, required: true },
    categoriaCodigo: { type: Number, required: true },
    criadoPor: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now, required: true },
    atualizadoEm: { type: Date, default: null, required: false },
    removidoEm: { type: Date, default: null, required: false },
    detalhes: { type: AlimentoDetalhesSchema, required: true },
});

const AlimentoModel = mongoose.model<IAlimento>('Alimento', AlimentoSchema, 'Alimentos');

export default AlimentoModel;
