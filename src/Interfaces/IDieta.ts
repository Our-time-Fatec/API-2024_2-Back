import { DiasSemana } from "../enums/DiasSemana";
import { AlimentoDetalhes, IAlimento, IAlimentoConsumido } from "./IAlimento";

export interface IDietaDetalhes extends AlimentoDetalhes {
}

export interface IAlimentoDieta {
    id?: string;
    alimentoId: string,
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

export interface IDietaDiaria extends Document {
    usuarioId: string;
    diaSemana: DiasSemana;
    dia: Date;
    detalhes: IDietaDetalhes;
    grupos: IGrupo[];
    removidoEm?: Date | null
    gruposConsumo: IGrupoConsumo[]
}

export interface IGrupoConsumo {
    nome: string,
    alimentosConsumidos: IAlimentoConsumido[];
}