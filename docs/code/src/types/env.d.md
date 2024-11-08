---
title: env.d.ts
description: 'Declaração de tipos para variáveis de ambiente no Node.js.'
---

# env.d.ts

Este arquivo contém a declaração de tipos para as variáveis de ambiente utilizadas na aplicação Node.js. Ele define a interface `ProcessEnv`, que é uma extensão do namespace `NodeJS`.

## Estrutura da Interface

A interface `ProcessEnv` inclui as seguintes propriedades:

- **JWT_SECRET**: `string`  
  A chave secreta utilizada para a assinatura de tokens JWT.

- **JWT_SECRET_REFRESH**: `string`  
  A chave secreta utilizada para a assinatura de tokens de refresh JWT.

- **DB_URI_1**: `string`  
  A URI de conexão para o primeiro banco de dados.

- **DB_URI**: `string`  
  A URI de conexão para o banco de dados principal.

- **ADMIN_PASSWORD**: `string`  
  A senha do administrador da aplicação.

- **NODE_ENV**: `string` (opcional)  
  O ambiente em que a aplicação está sendo executada (por exemplo, `development`, `production`). Esta propriedade é opcional e pode não estar definida.