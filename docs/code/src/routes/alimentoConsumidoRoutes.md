---
title: alimentoConsumidoRoutes
description: 'Rotas para gerenciar alimentos consumidos no sistema.'
---

# alimentoConsumidoRoutes

Este arquivo define as rotas para gerenciar os alimentos consumidos no sistema, utilizando o framework Express. As rotas permitem a criação, listagem, atualização e exclusão de registros de alimentos consumidos.

## Rotas Definidas

- `POST /`: Cria um novo registro de alimento consumido.
- `GET /me`: Lista todos os alimentos consumidos pelo usuário.
- `GET /me/semana`: Lista os alimentos consumidos na semana atual.
- `DELETE /:id`: Exclui um registro de alimento consumido pelo ID.
- `PUT /delete`: Encontra e exclui um registro de alimento consumido.

## Controladores Utilizados

As rotas utilizam os seguintes métodos do controlador `AlimentoConsumido`:

- `create`: Método para criar um novo alimento consumido.
- `listAlimentosConsumidos`: Método para listar todos os alimentos consumidos.
- `listAlimentosConsumidosSemana`: Método para listar alimentos consumidos na semana.
- `delete`: Método para excluir um alimento consumido pelo ID.
- `findAndDelete`: Método para encontrar e excluir um alimento consumido.