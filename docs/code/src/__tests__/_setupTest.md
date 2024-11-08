
---
title: _setupTest
description: 'Configuração e gerenciamento do banco de dados para testes automatizados.'
---

# _setupTest

Este arquivo contém funções para configurar e gerenciar o banco de dados durante os testes automatizados. Ele utiliza o Mongoose para conectar-se ao MongoDB e a biblioteca Supertest para realizar requisições HTTP.

## Funções

### connectTestDB

```typescript
export const connectTestDB = async () => { ... }
```

Estabelece uma conexão com o banco de dados MongoDB utilizando a URI definida na variável de ambiente `DB_URI`. Caso um usuário com o email "sales@gmail.com" não exista, ele será criado com dados padrão.

#### Exceções

- Lança um erro se a variável de ambiente `DB_URI` não estiver definida (código comentado).

### createAndLogin

```typescript
export const createAndLogin = async (): Promise<string> => { ... }
```

Cria um novo usuário com o email "roberto@gmail.com" se ele não existir e realiza o login, retornando o token de autenticação.

#### Retorno

- `Promise<string>`: O token de autenticação do usuário.

### disconnectTestDB

```typescript
export const disconnectTestDB = async () => { ... }
```

Desconecta do banco de dados e remove todos os dados de teste criados durante a execução dos testes.

#### Observações

- A função pode incluir um atraso opcional (código comentado) para garantir que a desconexão ocorra após a remoção dos dados.
