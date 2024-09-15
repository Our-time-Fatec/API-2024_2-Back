import { DiasSemana } from "../enums/DiasSemana";
import { AlimentoDetalhes, IAlimento } from "./IAlimento";

export interface IDietaDetalhes extends AlimentoDetalhes {
}

export interface IAlimentoDieta {
    id?: string;
    nome: string;
    preparo: string;
    porcao: Number;
    quantidade: number;
    categoriaCodigo: Number;
    detalhes: AlimentoDetalhes;
}

export interface IGrupo {
    nome: string;
    alimentos: IAlimentoDieta[];
}

export interface IDietaFixa extends Document {
    usuarioId: string;
    diaSemana: DiasSemana;
    criadoEm: Date;
    atualizadoEm?: Date | null;
    removidoEm?: Date | null;
    detalhes: IDietaDetalhes;
    grupos: IGrupo[];
}