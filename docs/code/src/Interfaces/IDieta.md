
---
title: IDieta
description: 'Interfaces relacionadas à estrutura de dietas e grupos de alimentos.'
---

# IDieta

Este arquivo contém definições de interfaces que representam a estrutura de dietas e grupos de alimentos em um sistema de gerenciamento de dietas.

## Interfaces

### IDietaDetalhes

```typescript
export interface IDietaDetalhes extends AlimentoDetalhes {
}
```
Interface que estende `AlimentoDetalhes`, representando detalhes adicionais de uma dieta.

### IAlimentoDieta

```typescript
export interface IAlimentoDieta {
    id?: string;
    alimentoId: string;
    nome: string;
    preparo: string;
    porcao: Number;
    quantidade: number;
    categoriaCodigo: Number;
    detalhes: AlimentoDetalhes;
}
```
Interface que define um alimento dentro de uma dieta, incluindo informações como nome, preparo, porção e categoria.

### IGrupo

```typescript
export interface IGrupo {   
    _id?: string;
    nome: string;
    alimentos: IAlimentoDieta[];
}
```
Interface que representa um grupo de alimentos, contendo um nome e uma lista de alimentos que pertencem a esse grupo.

### IDietaFixa

```typescript
export interface IDietaFixa extends Document {
    usuarioId: string;
    diaSemana: DiasSemana;
    criadoEm: Date;
    atualizadoEm?: Date | null;
    removidoEm?: Date | null;
    detalhes: IDietaDetalhes;
    grupos: IGrupo[];
}
```
Interface que representa uma dieta fixa associada a um usuário, incluindo informações sobre o dia da semana, datas de criação e atualização, detalhes da dieta e grupos de alimentos.

### IDietaDiaria

```typescript
export interface IDietaDiaria extends Document {
    usuarioId: string;
    diaSemana: DiasSemana;
    dia: Date;
    detalhes: IDietaDetalhes;
    grupos: IGrupo[];
    removidoEm?: Date | null;
    gruposConsumo: IGrupoConsumo[];
}
```
Interface que representa uma dieta diária, incluindo informações sobre o dia, detalhes da dieta, grupos de alimentos e grupos de consumo.

### IGrupoConsumo

```typescript
export interface IGrupoConsumo {
    _id?: string;
    nome: string;
    alimentos: IAlimentoConsumido[];
}
```
Interface que representa um grupo de consumo, contendo um nome e uma lista de alimentos consumidos.
