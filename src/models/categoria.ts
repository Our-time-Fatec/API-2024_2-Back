import mongoose, { Schema, model, Document } from 'mongoose';
import { ICategoria } from '../Interfaces/ICategoria';

const CategoriaSchema = new Schema<ICategoria>({
    codigo: { type: Number, required: true },
    nome: { type: String, required: true },
    urlPlaceholder: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now },
    atualizadoEm: { type: Date, default: null },
    removidoEm: { type: Date, default: null },
});

const Categoria = mongoose.model<ICategoria>('Categoria', CategoriaSchema, 'Categorias');

export default Categoria;
