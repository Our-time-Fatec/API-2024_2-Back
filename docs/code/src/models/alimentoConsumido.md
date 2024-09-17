---
title: alimentoConsumido
description: 'Modelo de dados para Alimento Consumido utilizando Mongoose.'
---

# AlimentoConsumido

O arquivo `alimentoConsumido.ts` define o modelo de dados para o registro de alimentos consumidos em um sistema, utilizando a biblioteca Mongoose para interação com o MongoDB.

## Estrutura do Modelo

O modelo `AlimentoConsumido` é definido através de um esquema (Schema) que especifica os campos e suas características. Abaixo estão os campos incluídos no esquema:

- **nome**: `String` (obrigatório) - Nome do alimento consumido.
- **preparo**: `String` (obrigatório) - Método de preparo do alimento.
- **porcao**: `Number` (obrigatório) - Tamanho da porção consumida.
- **categoriaCodigo**: `Number` (obrigatório) - Código da categoria do alimento.
- **quantidade**: `Number` (obrigatório) - Quantidade do alimento consumido.
- **criadoEm**: `Date` (obrigatório, padrão: data atual) - Data de criação do registro.
- **criadoPor**: `String` (obrigatório) - Identificação do usuário que criou o registro.
- **removidoEm**: `Date` (opcional, padrão: null) - Data de remoção do registro, se aplicável.
- **detalhes**: `AlimentoDetalhesSchema` (obrigatório) - Detalhes adicionais sobre o alimento, referenciando um esquema separado.

## Exportação do Modelo

O modelo `AlimentoConsumido` é exportado como um modelo Mongoose, permitindo que ele seja utilizado em outras partes da aplicação para realizar operações de CRUD (Create, Read, Update, Delete) no banco de dados.

```typescript
const AlimentoConsumidoModel = mongoose.model<IAlimentoConsumido>(
  "AlimentoConsumido",
  AlimentoConsumidoSchema,
  "Alimentos_consumidos"
);

export default AlimentoConsumidoModel;
```

## Considerações

Este modelo é fundamental para a gestão de dados relacionados ao consumo de alimentos, permitindo a integração com outras partes do sistema, como controle de dietas e relatórios de consumo.