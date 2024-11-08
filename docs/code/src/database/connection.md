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

- `uri`: String que contém a URI de conexão com o MongoDB. O valor padrão é `mongodb://localhost:27017/abp-teste`, mas pode ser sobrescrito por uma variável de ambiente `DB_URI`.

## Funções

### `connect()`

Estabelece a conexão com o MongoDB.

#### Comportamento

- Utiliza o método `connect` do Mongoose para conectar-se ao banco de dados.
- Em caso de sucesso, imprime uma mensagem de confirmação no console.
- Em caso de erro, imprime uma mensagem de erro no console.

#### Encerramento da Conexão

- Escuta o sinal `SIGINT` (geralmente enviado ao pressionar Ctrl+C) para fechar a conexão com o MongoDB de forma limpa.
- Ao receber o sinal, tenta fechar a conexão e imprime uma mensagem de encerramento no console. Se ocorrer um erro durante o fechamento, imprime uma mensagem de erro.

### `disconnect()`

Encerra a conexão com o MongoDB.

#### Comportamento

- Imprime uma mensagem de encerramento no console.
- Utiliza o método `disconnect` do Mongoose para desconectar do banco de dados.