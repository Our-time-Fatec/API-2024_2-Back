import mongoose, { Schema } from "mongoose";
import { IAlimentoConsumido } from "../Interfaces/IAlimento";

const AlimentoConsumidoSchema = new Schema<IAlimentoConsumido>({
    usuarioId: { type: String, required: true },
    nome: { type: String, required: true },
    preparo: { type: String, required: true },
    porcao: { type: Number, required: true },
    quantidade: { type: Number, required: true },
    detalhes: {  type: String, required: true },
    criadoEm: { type: Date, default: Date.now, required: true },
    criadoPor: {type: String, required: true},
    removidoEm: { type: Date, default: null, required: false },
  });

  const AlimentoConsumidoModel = mongoose.model<IAlimentoConsumido>(
    "AlimentoConsumido",
    AlimentoConsumidoSchema,
    "Alimentos_consumidos"
  );

  export default AlimentoConsumidoModel