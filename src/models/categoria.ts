import mongoose, { Schema, model, Document } from 'mongoose';
import { ICategoria } from '../Interfaces/ICategoria';



const GrupoSchema = new Schema<ICategoria>({
    codigo: { type: Number, required: true },
    nome: { type: String, required: true },
    urlPlaceholder: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now },
    atualizadoEm: { type: Date, default: null },
    removidoEm: { type: Date, default: null },
});

const Categoria = mongoose.model<ICategoria>('Categoria', GrupoSchema, 'Categorias');

export default Categoria;
