import mongoose, { Schema } from "mongoose";
import { IAlimentoConsumido } from "../Interfaces/IAlimento";
import { AlimentoDetalhesSchema } from "./alimento";
import { DiasSemana } from "../enums/DiasSemana";

export const AlimentoConsumidoSchema = new Schema<IAlimentoConsumido>({
  alimentoId: { type: String },
  nome: { type: String, required: true },
  preparo: { type: String, required: true },
  porcao: { type: Number, required: true },
  categoriaCodigo: { type: Number, required: true },
  quantidade: { type: Number, required: true },
  criadoEm: { type: Date, default: Date.now, required: true },
  criadoPor: { type: String, required: true },
  diaSemana: { type: String, enum: Object.values(DiasSemana) },
  removidoEm: { type: Date, default: null, required: false },
  detalhes: { type: AlimentoDetalhesSchema, required: true },
  nomeGrupo: { type: String, required: true }
});

const AlimentoConsumidoModel = mongoose.model<IAlimentoConsumido>(
  "AlimentoConsumido",
  AlimentoConsumidoSchema,
  "Alimentos_consumidos"
);

export default AlimentoConsumidoModel