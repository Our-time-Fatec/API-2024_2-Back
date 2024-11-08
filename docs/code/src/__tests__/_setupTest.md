---
title: _setupTest
description: 'Configuração e gerenciamento do banco de dados para testes automatizados.'
---

# _setupTest

Este arquivo contém funções auxiliares para a configuração e gerenciamento do banco de dados durante os testes automatizados. Ele utiliza o Mongoose para conectar-se ao MongoDB e a biblioteca Supertest para realizar requisições HTTP.

## Funções

### connectTestDB

```typescript
export const connectTestDB = async () => { ... }
```

Estabelece uma conexão com o banco de dados MongoDB utilizando a URI definida na variável de ambiente `DB_URI`. Caso um usuário específico não exista, ele cria um novo usuário padrão.

#### Detalhes:
- Carrega as variáveis de ambiente a partir do arquivo `.env.dev`.
- Conecta ao banco de dados e exibe uma mensagem no console com a porta e a URI do banco.
- Verifica se um usuário com o email "sales@gmail.com" já existe. Se não existir, cria um novo usuário com dados predefinidos.

### createAndLogin

```typescript
export const createAndLogin = async (): Promise<string> => { ... }
```

Cria um novo usuário e realiza o login, retornando o token de autenticação.

#### Detalhes:
- Verifica se um usuário com o email "roberto@gmail.com" já existe. Se não existir, cria um novo usuário com dados predefinidos.
- Realiza uma requisição de login e retorna o token de autenticação obtido na resposta.

### disconnectTestDB

```typescript
export const disconnectTestDB = async () => { ... }
```

Desconecta do banco de dados e remove todos os dados de teste.

#### Detalhes:
- Utiliza `mongoose.connection.dropDatabase()` para remover os dados de teste.
- Desconecta a instância do Mongoose após a conclusão dos testes.