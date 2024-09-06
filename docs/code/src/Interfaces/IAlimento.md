---
title: IAlimento
description: 'Interface que define a estrutura de um alimento no sistema.'
---

# IAlimento

A interface `IAlimento` representa a estrutura de um alimento no sistema, estendendo a interface `Document`. Ela contém informações detalhadas sobre o alimento, incluindo seus atributos e detalhes nutricionais.

## Estrutura da Interface

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

### Atributos

- **id**: `string` - Identificador único do alimento.
- **nome**: `string` - Nome do alimento.
- **preparo**: `string` - Instruções de preparo do alimento.
- **porcao**: `Number` - Tamanho da porção em gramas.
- **categoriaCodigo**: `Number` - Código da categoria a qual o alimento pertence.
- **criadoPor**: `string` - Identificador do usuário que criou o registro.
- **criadoEm**: `Date` - Data de criação do registro.
- **atualizadoEm**: `Date | null` - Data da última atualização do registro, ou `null` se não houver atualizações.
- **removidoEm**: `Date | null` - Data em que o registro foi removido, ou `null` se não tiver sido removido.
- **detalhes**: `AlimentoDetalhes` - Informações nutricionais detalhadas do alimento.

## AlimentoDetalhes

A interface `AlimentoDetalhes` contém informações nutricionais específicas sobre o alimento.

```typescript
export interface AlimentoDetalhes {
    valorEnergetico: number;
    proteinas: number;
    carboidratos: number;
    fibras: number;
    lipidios: number;
}
```

### Atributos

- **valorEnergetico**: `number` - Valor energético do alimento em calorias.
- **proteinas**: `number` - Quantidade de proteínas em gramas.
- **carboidratos**: `number` - Quantidade de carboidratos em gramas.
- **fibras**: `number` - Quantidade de fibras em gramas.
- **lipidios**: `number` - Quantidade de lipídios em gramas.