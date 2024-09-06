export interface IAlimento extends Document {
    id: string;
    nome: string;
    preparo: string;
    porcao: Number;
    categoriaCodigo: Number;
    criadoPor: string;
    criadoEm: Date;
    atualizadoEm: Date | null;
    removidoEm: Date | null;
    detalhes: AlimentoDetalhes;
}

export interface AlimentoDetalhes {
    valorEnergetico: number;
    proteinas: number;
    carboidratos: number;
    fibras: number;
    lipidios: number;
}
