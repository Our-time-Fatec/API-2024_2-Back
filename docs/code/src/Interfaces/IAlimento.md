---
title: IAlimento
description: 'Interface que define a estrutura de um alimento e seus detalhes nutricionais.'
---

# IAlimento

A interface `IAlimento` define a estrutura de um alimento, incluindo suas propriedades e detalhes nutricionais. Esta interface é utilizada para garantir que os objetos de alimento sigam um formato consistente dentro da aplicação.

## Estrutura da Interface

### IAlimento

```typescript
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
```

#### Propriedades

- `id`: Identificador único do alimento.
- `nome`: Nome do alimento.
- `preparo`: Método de preparo do alimento.
- `porcao`: Tamanho da porção do alimento.
- `categoriaCodigo`: Código da categoria a qual o alimento pertence.
- `criadoPor`: Identificador do usuário que criou o registro.
- `criadoEm`: Data de criação do registro.
- `atualizadoEm`: Data da última atualização do registro (pode ser nulo).
- `removidoEm`: Data em que o registro foi removido (pode ser nulo).
- `detalhes`: Detalhes nutricionais do alimento, representados pela interface `AlimentoDetalhes`.

### AlimentoDetalhes

```typescript
export interface AlimentoDetalhes {
    valorEnergetico: number;
    carboidratos: number;
    proteinas: number;
    fibras: number;
    lipidios: number;
}
```

#### Propriedades

- `valorEnergetico`: Valor energético do alimento em calorias.
- `carboidratos`: Quantidade de carboidratos em gramas.
- `proteinas`: Quantidade de proteínas em gramas.
- `fibras`: Quantidade de fibras em gramas.
- `lipidios`: Quantidade de lipídios em gramas.

### IAlimentoConsumido

```typescript
export interface IAlimentoConsumido {
    nome: string;
    preparo: string;
    porcao: Number;
    quantidade: Number;
    categoriaCodigo: Number;
    criadoEm: Date;
    criadoPor: string;
    removidoEm: Date | null;
    detalhes: AlimentoDetalhes;
}
```

#### Propriedades

- `nome`: Nome do alimento consumido.
- `preparo`: Método de preparo do alimento consumido.
- `porcao`: Tamanho da porção do alimento consumido.
- `quantidade`: Quantidade do alimento consumido.
- `categoriaCodigo`: Código da categoria a qual o alimento consumido pertence.
- `criadoEm`: Data de criação do registro do alimento consumido.
- `criadoPor`: Identificador do usuário que criou o registro do alimento consumido.
- `removidoEm`: Data em que o registro do alimento consumido foi removido (pode ser nulo).
- `detalhes`: Detalhes nutricionais do alimento consumido, representados pela interface `AlimentoDetalhes`.