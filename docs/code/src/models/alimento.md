---
title: alimento
description: 'Modelo de dados para Alimento utilizando Mongoose.'
---

# alimento

Este arquivo define o modelo de dados para um alimento utilizando o Mongoose, uma biblioteca do Node.js que fornece uma solução baseada em esquemas para modelar dados de aplicativos.

## Estruturas de Dados

### AlimentoDetalhesSchema

O `AlimentoDetalhesSchema` é um esquema que descreve os detalhes nutricionais de um alimento. Os campos definidos são:

- **valorEnergetico**: Número que representa o valor energético do alimento (opcional).
- **proteinas**: Número que representa a quantidade de proteínas (opcional).
- **carboidratos**: Número que representa a quantidade de carboidratos (opcional).
- **fibras**: Número que representa a quantidade de fibras (opcional).
- **lipidios**: Número que representa a quantidade de lipídios (opcional).

### AlimentoSchema

O `AlimentoSchema` é o esquema principal que representa um alimento. Os campos definidos são:

- **nome**: String que representa o nome do alimento (obrigatório).
- **preparo**: String que descreve o modo de preparo do alimento (obrigatório).
- **porcao**: Número que indica a porção do alimento (obrigatório).
- **categoriaCodigo**: Número que representa o código da categoria do alimento (obrigatório).
- **criadoPor**: String que indica quem criou o registro do alimento (obrigatório).
- **criadoEm**: Data que indica quando o registro foi criado (obrigatório, padrão: data atual).
- **atualizadoEm**: Data que indica quando o registro foi atualizado (opcional, padrão: null).
- **removidoEm**: Data que indica quando o registro foi removido (opcional, padrão: null).
- **detalhes**: Objeto que contém os detalhes nutricionais do alimento, conforme definido no `AlimentoDetalhesSchema` (obrigatório).

## Exportação

O modelo `AlimentoModel` é exportado como o modelo Mongoose para a coleção "Alimentos", permitindo a interação com a base de dados MongoDB.