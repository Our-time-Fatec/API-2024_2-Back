---
title: IAlimento
description: 'Interface que define a estrutura de um alimento e suas propriedades no sistema.'
---

# IAlimento

A interface `IAlimento` define a estrutura de um alimento no sistema, incluindo suas propriedades e detalhes nutricionais. Esta interface é utilizada para garantir que os objetos de alimento sigam um formato consistente.

## Propriedades

### IAlimento

- **id**: `string` - Identificador único do alimento.
- **nome**: `string` - Nome do alimento.
- **preparo**: `string` - Método de preparo do alimento.
- **porcao**: `Number` - Tamanho da porção em unidades.
- **categoriaCodigo**: `Number` - Código da categoria a qual o alimento pertence.
- **criadoPor**: `string` - Identificador do usuário que criou o registro.
- **criadoEm**: `Date` - Data de criação do registro.
- **atualizadoEm**: `Date | null` - Data da última atualização do registro, se aplicável.
- **removidoEm**: `Date | null` - Data em que o alimento foi removido, se aplicável.
- **detalhes**: `AlimentoDetalhes` - Detalhes nutricionais do alimento.

### AlimentoDetalhes

- **valorEnergetico**: `number` - Valor energético do alimento em calorias.
- **carboidratos**: `number` - Quantidade de carboidratos em gramas.
- **proteinas**: `number` - Quantidade de proteínas em gramas.
- **fibras**: `number` - Quantidade de fibras em gramas.
- **lipidios**: `number` - Quantidade de lipídios em gramas.
- **_id**: `string | undefined` - Identificador opcional para detalhes do alimento.

### IAlimentoConsumido

A interface `IAlimentoConsumido` define a estrutura de um alimento que foi consumido, incluindo informações adicionais sobre a quantidade e o dia da semana em que foi consumido.

- **alimentoId**: `string` - Identificador do alimento consumido.
- **_id**: `string` - Identificador único do registro de consumo.
- **nome**: `string` - Nome do alimento consumido.
- **preparo**: `string` - Método de preparo do alimento consumido.
- **porcao**: `Number` - Tamanho da porção em unidades.
- **quantidade**: `number` - Quantidade do alimento consumido.
- **categoriaCodigo**: `Number` - Código da categoria do alimento consumido.
- **criadoEm**: `Date` - Data em que o registro de consumo foi criado.
- **diaSemana**: `DiasSemana` - Dia da semana em que o alimento foi consumido.
- **criadoPor**: `string` - Identificador do usuário que criou o registro de consumo.
- **removidoEm**: `Date | null` - Data em que o registro foi removido, se aplicável.
- **detalhes**: `AlimentoDetalhes` - Detalhes nutricionais do alimento consumido.
- **nomeGrupo**: `string` - Nome do grupo ao qual o alimento consumido pertence.