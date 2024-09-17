---
title: IDieta
description: 'Interface que define a estrutura de uma dieta fixa e seus componentes relacionados.'
---

# IDieta

A interface `IDieta` define a estrutura de uma dieta fixa, incluindo detalhes sobre os alimentos e grupos de alimentos que compõem a dieta. Esta interface é utilizada para garantir que os dados relacionados a dietas sejam consistentes e bem estruturados.

## Interfaces

### IDietaDetalhes

```typescript
export interface IDietaDetalhes extends AlimentoDetalhes {
}
```

A interface `IDietaDetalhes` estende a interface `AlimentoDetalhes`, permitindo a inclusão de detalhes adicionais sobre os alimentos na dieta.

### IAlimentoDieta

```typescript
export interface IAlimentoDieta {
    id?: string;
    nome: string;
    preparo: string;
    porcao: Number;
    quantidade: number;
    categoriaCodigo: Number;
    detalhes: AlimentoDetalhes;
}
```

A interface `IAlimentoDieta` representa um alimento que pode ser incluído em uma dieta. Os campos incluem:

- `id?`: Identificador opcional do alimento.
- `nome`: Nome do alimento.
- `preparo`: Método de preparo do alimento.
- `porcao`: Tamanho da porção do alimento.
- `quantidade`: Quantidade do alimento na dieta.
- `categoriaCodigo`: Código da categoria do alimento.
- `detalhes`: Detalhes adicionais sobre o alimento, conforme definido na interface `AlimentoDetalhes`.

### IGrupo

```typescript
export interface IGrupo {
    nome: string;
    alimentos: IAlimentoDieta[];
}
```

A interface `IGrupo` representa um grupo de alimentos dentro de uma dieta. Os campos incluem:

- `nome`: Nome do grupo de alimentos.
- `alimentos`: Lista de alimentos que pertencem a este grupo, conforme definido pela interface `IAlimentoDieta`.

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

A interface `IDietaFixa` representa uma dieta fixa associada a um usuário. Os campos incluem:

- `usuarioId`: Identificador do usuário que possui a dieta.
- `diaSemana`: Dia da semana em que a dieta é aplicada, conforme definido na enumeração `DiasSemana`.
- `criadoEm`: Data de criação da dieta.
- `atualizadoEm?`: Data da última atualização da dieta (opcional).
- `removidoEm?`: Data em que a dieta foi removida (opcional).
- `detalhes`: Detalhes da dieta, conforme definido pela interface `IDietaDetalhes`.
- `grupos`: Lista de grupos de alimentos que compõem a dieta, conforme definido pela interface `IGrupo`.