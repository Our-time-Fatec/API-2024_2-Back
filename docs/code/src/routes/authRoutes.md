---
title: authRoutes
description: 'Definição das rotas de autenticação para o sistema.'
---

# authRoutes

Este arquivo contém a definição das rotas de autenticação do sistema, utilizando o framework Express. As rotas implementadas permitem que os usuários realizem login e atualizem seus tokens de autenticação.

## Rotas

### POST /login

- **Descrição**: Esta rota permite que um usuário faça login no sistema.
- **Controlador**: `AuthController.login`

### POST /refresh-token

- **Descrição**: Esta rota permite que um usuário atualize seu token de autenticação.
- **Controlador**: `AuthController.refresh`

## Importações

O arquivo importa o `Router` do Express e o `AuthController`, que contém a lógica de autenticação.

```javascript
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
```

## Exportação

As rotas são exportadas como um módulo padrão para serem utilizadas em outras partes da aplicação.

```javascript
export default routes;
```