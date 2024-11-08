---
title: connection
description: 'Módulo responsável pela conexão e desconexão do MongoDB utilizando Mongoose.'
---

# connection.ts

O arquivo `connection.ts` contém funções para estabelecer e encerrar a conexão com um banco de dados MongoDB utilizando a biblioteca Mongoose. A configuração da conexão é feita através de variáveis de ambiente.

## Dependências

- `mongoose`: Biblioteca para modelagem de dados MongoDB.
- `dotenv`: Carrega variáveis de ambiente a partir de um arquivo `.env`.

## Variáveis

- `uri`: String que contém a URI de conexão com o MongoDB. O valor padrão é `mongodb://localhost:27017/abp-teste`, mas pode ser sobrescrito por uma variável de ambiente `DB_URI`.

## Funções

### `connect()`

Estabelece a conexão com o MongoDB.

#### Comportamento

- Utiliza o método `connect` do Mongoose para conectar-se ao banco de dados.
- Em caso de sucesso, imprime uma mensagem de confirmação no console.
- Em caso de erro, imprime uma mensagem de erro no console.
- Escuta o sinal `SIGINT` (geralmente enviado ao pressionar Ctrl+C) para fechar a conexão com o banco de dados de forma adequada.

### `disconnect()`

Encerra a conexão com o MongoDB.

#### Comportamento

- Imprime uma mensagem no console indicando que a conexão está sendo encerrada.
- Utiliza o método `disconnect` do Mongoose para desconectar do banco de dados.