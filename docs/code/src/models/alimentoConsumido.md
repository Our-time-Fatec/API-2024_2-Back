---
title: alimentoConsumido
description: 'Modelo Mongoose para representar alimentos consumidos, incluindo suas propriedades e validações.'
---

# alimentoConsumido

O arquivo `alimentoConsumido.ts` define um modelo Mongoose para a coleção de alimentos consumidos. Este modelo é utilizado para armazenar informações sobre os alimentos que foram consumidos, incluindo detalhes como preparo, porção e categoria.

## Estrutura do Modelo

O modelo `AlimentoConsumidoSchema` é definido utilizando o `Schema` do Mongoose e inclui os seguintes campos:

- **alimentoId**: `String` - Identificador do alimento.
- **nome**: `String` - Nome do alimento (obrigatório).
- **preparo**: `String` - Método de preparo do alimento (obrigatório).
- **porcao**: `Number` - Tamanho da porção (obrigatório).
- **categoriaCodigo**: `Number` - Código da categoria do alimento (obrigatório).
- **quantidade**: `Number` - Quantidade consumida (obrigatório).
- **criadoEm**: `Date` - Data de criação do registro (padrão: data atual, obrigatório).
- **criadoPor**: `String` - Identificador do usuário que criou o registro (obrigatório).
- **diaSemana**: `String` - Dia da semana em que o alimento foi consumido (opcional, enumera os valores de `DiasSemana`).
- **removidoEm**: `Date` - Data em que o registro foi removido (opcional, padrão: null).
- **detalhes**: `AlimentoDetalhesSchema` - Detalhes adicionais sobre o alimento (obrigatório).
- **nomeGrupo**: `String` - Nome do grupo ao qual o alimento pertence (obrigatório).

## Exportação do Modelo

O modelo `AlimentoConsumidoModel` é exportado como um modelo Mongoose, permitindo que ele seja utilizado em outras partes da aplicação para interagir com a coleção "Alimentos_consumidos".

```typescript
const AlimentoConsumidoModel = mongoose.model<IAlimentoConsumido>(
  "AlimentoConsumido",
  AlimentoConsumidoSchema,
  "Alimentos_consumidos"
);

export default AlimentoConsumidoModel;
```

## Dependências

Este arquivo depende das seguintes interfaces e esquemas:

- `IAlimentoConsumido`: Interface que define a estrutura do objeto de alimento consumido.
- `AlimentoDetalhesSchema`: Esquema que define os detalhes do alimento.
- `DiasSemana`: Enum que lista os dias da semana.

## Considerações

Certifique-se de que as dependências estejam corretamente importadas e que o Mongoose esteja configurado para conectar ao banco de dados antes de utilizar este modelo.