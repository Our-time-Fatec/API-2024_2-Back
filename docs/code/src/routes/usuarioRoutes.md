---
title: usuarioRoutes
description: 'Definição das rotas para gerenciamento de usuários na aplicação.'
---

# usuarioRoutes

O arquivo `usuarioRoutes.ts` define as rotas relacionadas ao gerenciamento de usuários na aplicação. Utiliza o framework Express para a criação de rotas e inclui middleware de autenticação para proteger algumas das operações.

## Estrutura das Rotas

As seguintes rotas estão disponíveis:

- `POST /`: Cria um novo usuário.
- `GET /`: Lista todos os usuários (requer autenticação).
- `PUT /`: Atualiza as informações de um usuário existente (requer autenticação).
- `DELETE /`: Remove um usuário (requer autenticação).

## Dependências

O arquivo importa os seguintes módulos:

- `Router` do Express: Utilizado para criar um conjunto de rotas.
- `controller` de `UsuarioController`: Contém a lógica de controle para as operações de usuário.
- `authMiddleware`: Middleware que verifica a autenticação do usuário antes de permitir o acesso a certas rotas.

## Exemplo de Uso

```typescript
import usuarioRoutes from './src/routes/usuarioRoutes';

// Adicionando as rotas ao aplicativo Express
app.use('/api/usuarios', usuarioRoutes);
```

## Considerações

As rotas que requerem autenticação utilizam o `authMiddleware` para garantir que apenas usuários autenticados possam acessar as funcionalidades de listagem, atualização e exclusão.