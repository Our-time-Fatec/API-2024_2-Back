---
title: alimento
description: 'Modelo de dados para Alimento utilizando Mongoose.'
---

# Alimento

O arquivo `alimento.ts` define o modelo de dados para a entidade `Alimento` utilizando o Mongoose, uma biblioteca do Node.js que facilita a interação com o MongoDB.

## Estruturas de Dados

### AlimentoDetalhesSchema

O `AlimentoDetalhesSchema` é um esquema que descreve os detalhes nutricionais de um alimento. Ele contém os seguintes campos:

- **valorEnergetico**: Número que representa o valor energético do alimento (opcional).
- **proteinas**: Número que representa a quantidade de proteínas (opcional).
- **carboidratos**: Número que representa a quantidade de carboidratos (opcional).
- **fibras**: Número que representa a quantidade de fibras (opcional).
- **lipidios**: Número que representa a quantidade de lipídios (opcional).

### AlimentoSchema

O `AlimentoSchema` é o esquema principal que representa um alimento. Ele contém os seguintes campos:

- **nome**: String que representa o nome do alimento (obrigatório).
- **preparo**: String que descreve o modo de preparo do alimento (obrigatório).
- **porcao**: Número que indica a porção do alimento (obrigatório).
- **categoriaCodigo**: Número que representa o código da categoria do alimento (obrigatório).
- **criadoPor**: String que indica quem criou o registro (obrigatório).
- **criadoEm**: Data que indica quando o registro foi criado (obrigatório, padrão: data atual).
- **atualizadoEm**: Data que indica quando o registro foi atualizado (opcional, padrão: null).
- **removidoEm**: Data que indica quando o registro foi removido (opcional, padrão: null).
- **detalhes**: Objeto que contém os detalhes nutricionais do alimento, conforme definido pelo `AlimentoDetalhesSchema` (obrigatório).

## Exportação

O modelo `AlimentoModel` é exportado como o modelo Mongoose para a coleção "Alimentos". Ele pode ser utilizado para realizar operações de CRUD (Create, Read, Update, Delete) na coleção correspondente no banco de dados MongoDB.