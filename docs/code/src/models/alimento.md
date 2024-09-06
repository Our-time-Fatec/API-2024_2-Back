---
title: alimento
description: 'Modelo de dados para Alimento utilizando Mongoose.'
---

# Alimento Model

O arquivo `alimento.ts` define o modelo de dados para a entidade `Alimento` utilizando o Mongoose, uma biblioteca do Node.js que facilita a interação com o MongoDB.

## Estrutura do Modelo

### AlimentoDetalhesSchema

O `AlimentoDetalhesSchema` é um esquema que contém informações nutricionais detalhadas sobre o alimento. Os campos definidos são:

- `valorEnergetico` (Number, opcional): Valor energético do alimento.
- `proteinas` (Number, opcional): Quantidade de proteínas.
- `carboidratos` (Number, opcional): Quantidade de carboidratos.
- `fibras` (Number, opcional): Quantidade de fibras.
- `lipidios` (Number, opcional): Quantidade de lipídios.

### AlimentoSchema

O `AlimentoSchema` é o esquema principal que representa um alimento. Os campos definidos são:

- `nome` (String, obrigatório): Nome do alimento.
- `preparo` (String, obrigatório): Modo de preparo do alimento.
- `porcao` (Number, obrigatório): Tamanho da porção em gramas.
- `categoriaCodigo` (Number, obrigatório): Código da categoria do alimento.
- `criadoPor` (String, obrigatório): Identificação do usuário que criou o registro.
- `criadoEm` (Date, obrigatório): Data de criação do registro, com valor padrão como a data atual.
- `atualizadoEm` (Date, opcional): Data da última atualização do registro, com valor padrão como `null`.
- `removidoEm` (Date, opcional): Data em que o registro foi removido, com valor padrão como `null`.
- `detalhes` (AlimentoDetalhesSchema, obrigatório): Detalhes nutricionais do alimento.

## Exportação

O modelo `AlimentoModel` é exportado como um modelo Mongoose, permitindo que ele seja utilizado em outras partes da aplicação para realizar operações de CRUD (Create, Read, Update, Delete) no banco de dados MongoDB.

```javascript
const AlimentoModel = mongoose.model<IAlimento>('Alimento', AlimentoSchema, 'Alimentos');
export default AlimentoModel;
```