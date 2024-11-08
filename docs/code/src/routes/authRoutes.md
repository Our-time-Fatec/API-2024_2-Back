---
title: authRoutes
description: 'Definição das rotas de autenticação para o serviço.'
---

# authRoutes

Este arquivo contém a definição das rotas de autenticação para o serviço, utilizando o framework Express. As rotas implementadas permitem que os usuários realizem login e obtenham um novo token de autenticação.

## Rotas

### POST /login

- **Descrição**: Esta rota permite que um usuário faça login no sistema.
- **Controlador**: `AuthController.login`

### POST /refresh-token

- **Descrição**: Esta rota permite que um usuário obtenha um novo token de autenticação utilizando um token de atualização.
- **Controlador**: `AuthController.refresh`

## Importações

```typescript
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
```

## Exportação

As rotas são exportadas como um objeto padrão para serem utilizadas em outras partes da aplicação.