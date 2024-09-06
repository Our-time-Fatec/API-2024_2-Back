---
title: database
description: 'Pasta que contém as definições e implementações relacionadas ao banco de dados da aplicação.'
---

# database

A pasta `database` é responsável por gerenciar todas as interações com o banco de dados da aplicação. Ela contém arquivos que definem a conexão com o banco, bem como scripts para inicialização e seeding de dados.

## Estrutura

- **connection.ts**: Este arquivo contém a lógica para estabelecer a conexão com o banco de dados.
- **seed.ts**: Este arquivo é utilizado para popular o banco de dados com dados iniciais, facilitando o desenvolvimento e testes.

## Uso

Para utilizar as funcionalidades da pasta `database`, importe os arquivos necessários em seu código. Por exemplo, para estabelecer uma conexão com o banco de dados, você pode importar o `connection.ts` e chamar a função de conexão.

```typescript
import { connect } from './connection';

// Estabelecendo a conexão
connect();
```

Certifique-se de que o banco de dados esteja configurado corretamente antes de executar a aplicação.