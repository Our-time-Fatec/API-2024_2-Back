---
title: dietaFixa
description: 'Modelo de dados para Dieta Fixa utilizando Mongoose.'
---

# dietaFixa

Este arquivo define o modelo de dados para uma dieta fixa utilizando o Mongoose, uma biblioteca do Node.js que facilita a interação com o MongoDB.

## Estruturas de Dados

### DietaDetalhesSchema

Define os detalhes nutricionais de um alimento na dieta.

- **valorEnergetico**: Número, obrigatório.
- **proteinas**: Número, obrigatório.
- **carboidratos**: Número, obrigatório.
- **fibras**: Número, obrigatório.
- **lipidios**: Número, obrigatório.

### AlimentoSchema

Define a estrutura de um alimento na dieta.

- **nome**: String, obrigatório.
- **quantidade**: Número, obrigatório.
- **preparo**: String, obrigatório.
- **porcao**: Número, obrigatório.
- **categoriaCodigo**: String, obrigatório.
- **detalhes**: DietaDetalhesSchema, obrigatório.

### GrupoSchema

Define um grupo de alimentos na dieta.

- **nome**: String, obrigatório. Deve ser um dos seguintes valores: 'Café da Manhã', 'Almoço', 'Café da Tarde', 'Janta'.
- **alimentos**: Array de AlimentoSchema, obrigatório.

### DietaFixaSchema

Define a estrutura de uma dieta fixa.

- **usuarioId**: String, obrigatório.
- **diaSemana**: String, obrigatório. Deve ser um dos valores definidos em `DiasSemana`.
- **criadoEm**: Date, obrigatório. Padrão: data atual.
- **atualizadoEm**: Date, opcional. Padrão: null.
- **removidoEm**: Date, opcional. Padrão: null.
- **detalhes**: DietaDetalhesSchema, obrigatório.
- **grupos**: Array de GrupoSchema, obrigatório. Validação para garantir que os nomes dos grupos sejam únicos.

## Exportação

O modelo `DietaFixaModel` é exportado para ser utilizado em outras partes da aplicação, permitindo a criação, leitura, atualização e exclusão de documentos de dieta fixa no MongoDB.