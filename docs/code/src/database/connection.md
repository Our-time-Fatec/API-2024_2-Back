---
title: connection
description: 'Módulo responsável pela conexão e desconexão do MongoDB utilizando Mongoose.'
---

# connection.ts

Este módulo gerencia a conexão com o banco de dados MongoDB utilizando a biblioteca Mongoose. Ele fornece funções para conectar e desconectar do banco de dados, além de lidar com o encerramento da aplicação.

## Dependências

- `mongoose`: Biblioteca para modelagem de dados MongoDB.
- `dotenv`: Carrega variáveis de ambiente a partir de um arquivo `.env`.

## Variáveis

- `uri`: String que contém a URI de conexão com o MongoDB, obtida a partir da variável de ambiente `DB_URI`.

## Funções

### connect()

Estabelece a conexão com o MongoDB utilizando a URI definida. Em caso de sucesso, uma mensagem de confirmação é exibida no console. Se ocorrer um erro, a mensagem de erro é exibida.

#### Comportamento ao encerrar a aplicação

- O sinal `SIGINT` (geralmente enviado ao pressionar Ctrl+C) é tratado para fechar a conexão com o MongoDB de forma adequada, garantindo que todos os recursos sejam liberados.

### disconnect()

Desconecta a aplicação do MongoDB e exibe uma mensagem de confirmação no console.

## Exemplo de Uso

```typescript
import { connect, disconnect } from './database/connection';

// Conectar ao MongoDB
connect();

// Desconectar do MongoDB
disconnect();
```

## Observações

- Certifique-se de que a variável de ambiente `DB_URI` esteja configurada corretamente para evitar falhas na conexão.
- O tratamento de erros é essencial para garantir que a aplicação não falhe silenciosamente em caso de problemas de conexão.