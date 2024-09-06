export interface ICategoria extends Document {
    codigo: number;
    nome: string;
    urlPlaceholder: string;
    criadoEm: Date;
    atualizadoEm?: Date | null;
    removidoEm?: Date | null;
}