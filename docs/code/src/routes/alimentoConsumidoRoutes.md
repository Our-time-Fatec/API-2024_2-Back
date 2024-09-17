---
title: alimentoConsumidoRoutes
description: 'Rotas para gerenciar alimentos consumidos no sistema.'
---

# alimentoConsumidoRoutes

Este arquivo define as rotas para gerenciar os alimentos consumidos no sistema. Utiliza o framework Express para a criação de rotas HTTP.

## Importações

- `Router` do Express: Utilizado para criar um conjunto de rotas.
- `AlimentoConsumido`: Controlador que contém a lógica para manipulação dos alimentos consumidos.

## Rotas Definidas

- `POST /`: Cria um novo alimento consumido.
  - **Handler**: `AlimentoConsumido.create`
  
- `GET /me`: Lista todos os alimentos consumidos pelo usuário.
  - **Handler**: `AlimentoConsumido.listAlimentosConsumidos`
  
- `DELETE /:id`: Remove um alimento consumido específico pelo ID.
  - **Handler**: `AlimentoConsumido.delete`
  
> **Nota**: A rota `PUT /:id` para atualizar um alimento consumido está comentada e não está em uso atualmente.

## Exportação

O módulo exporta as rotas definidas para que possam ser utilizadas em outras partes da aplicação.