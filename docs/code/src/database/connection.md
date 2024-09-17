---
title: connection
description: 'Módulo responsável pela conexão com o banco de dados MongoDB utilizando Mongoose.'
---

# connection.ts

O arquivo `connection.ts` é responsável por estabelecer e gerenciar a conexão com o banco de dados MongoDB utilizando a biblioteca Mongoose. Ele também lida com o encerramento da conexão de forma adequada quando a aplicação é finalizada.

## Importações

- `mongoose`: Biblioteca para modelagem de dados MongoDB.
- `dotenv`: Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.

## Variáveis

- `uri`: String que contém a URI de conexão com o MongoDB. O valor é obtido a partir da variável de ambiente `DB_URI`, ou utiliza um valor padrão que conecta ao MongoDB local.

## Funções

### `connect()`

Estabelece a conexão com o MongoDB utilizando a URI definida. 

#### Comportamento:

- Utiliza o método `connect` do Mongoose.
- Exibe uma mensagem de sucesso no console ao conectar.
- Em caso de erro, exibe uma mensagem de erro no console.
- Escuta o sinal `SIGINT` (geralmente enviado ao pressionar Ctrl+C) para fechar a conexão de forma limpa.

### `disconnect()`

Encerra a conexão com o MongoDB.

#### Comportamento:

- Exibe uma mensagem no console informando que a conexão está sendo encerrada.
- Utiliza o método `disconnect` do Mongoose para fechar a conexão.