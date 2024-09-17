---
title: authRoutes
description: 'Definição das rotas de autenticação para o serviço.'
---

# authRoutes

Este arquivo contém a definição das rotas relacionadas à autenticação no serviço. Utiliza o framework Express para gerenciar as requisições HTTP.

## Rotas Definidas

### POST /login
- **Descrição**: Rota para realizar o login de um usuário.
- **Controlador**: `AuthController.login`

### POST /refresh-token
- **Descrição**: Rota para atualizar o token de autenticação do usuário.
- **Controlador**: `AuthController.refresh`

## Importações
- `Router` do pacote `express`: Utilizado para criar um conjunto de rotas.
- `AuthController`: Controlador que contém a lógica de autenticação.