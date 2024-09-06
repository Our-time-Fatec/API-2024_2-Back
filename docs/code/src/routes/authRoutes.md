---
title: authRoutes
description: 'Definição das rotas de autenticação para o serviço.'
---

# authRoutes

O arquivo `authRoutes.ts` define as rotas relacionadas à autenticação no serviço. Utiliza o framework Express para gerenciar as requisições HTTP.

## Estrutura do Código

```typescript
import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const routes = Router();

routes.post('/login', AuthController.login);
routes.post('/refresh-token', AuthController.refresh);

export default routes;
```

## Descrição das Rotas

- **POST /login**: Esta rota é responsável por autenticar um usuário. O controlador `AuthController` gerencia a lógica de login.
  
- **POST /refresh-token**: Esta rota permite que um usuário obtenha um novo token de autenticação, utilizando o controlador `AuthController` para processar a solicitação.

## Dependências

- **express**: O framework utilizado para criar as rotas e gerenciar as requisições.
- **AuthController**: Controlador que contém a lógica de autenticação, incluindo métodos para login e refresh de token.