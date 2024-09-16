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
    carboidratos: number;
    proteinas: number;
    fibras: number;
    lipidios: number;
}

export interface IAlimentoConsumido{
    usuarioId: string;
    nome: string;
    preparo: string;
    porcao: Number;
    detalhes: string;
    quantidade: Number;
    criadoEm: Date;
    criadoPor: string;
    removidoEm: Date | null;
}
