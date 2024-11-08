---
title: env.d.ts
description: 'Declaração de tipos para variáveis de ambiente no Node.js.'
---

# env.d.ts

Este arquivo contém a declaração de um namespace para o Node.js, especificamente para definir a interface `ProcessEnv`. Essa interface é utilizada para tipar as variáveis de ambiente que podem ser acessadas no seu aplicativo.

## Estrutura da Interface

A interface `ProcessEnv` inclui as seguintes propriedades:

- **JWT_SECRET**: `string` - A chave secreta utilizada para assinar tokens JWT.
- **JWT_SECRET_REFRESH**: `string` - A chave secreta utilizada para assinar tokens de refresh JWT.
- **DB_URI_1**: `string` - A URI de conexão para o primeiro banco de dados.
- **DB_URI**: `string` - A URI de conexão para o banco de dados principal.
- **ADMIN_PASSWORD**: `string` - A senha do administrador do sistema.
- **NODE_ENV**: `string` (opcional) - O ambiente em que a aplicação está sendo executada (ex: desenvolvimento, produção).

## Uso

Este arquivo deve ser incluído em seu projeto TypeScript para garantir que as variáveis de ambiente sejam corretamente tipadas, proporcionando autocompletar e verificação de tipos durante o desenvolvimento.