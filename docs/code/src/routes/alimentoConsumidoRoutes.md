---
title: alimentoConsumidoRoutes
description: 'Rotas para gerenciar alimentos consumidos no sistema.'
---

# alimentoConsumidoRoutes

Este arquivo define as rotas para gerenciar os alimentos consumidos no sistema. Utiliza o framework Express para a criação das rotas e a integração com o controlador `AlimentoConsumidoController`.

## Rotas Definidas

- `POST /`: Cria um novo registro de alimento consumido.
- `GET /me`: Lista todos os alimentos consumidos pelo usuário.
- `GET /me/semana`: Lista os alimentos consumidos na semana atual.
- `DELETE /:id`: Deleta um registro de alimento consumido pelo ID.
- `PUT /delete`: Encontra e deleta um registro de alimento consumido.

## Dependências

Este módulo depende do controlador `AlimentoConsumido`, que contém a lógica de negócios para manipulação dos dados de alimentos consumidos.

## Exemplo de Uso

```javascript
import express from 'express';
import alimentoConsumidoRoutes from './src/routes/alimentoConsumidoRoutes';

const app = express();

app.use('/alimentos-consumidos', alimentoConsumidoRoutes);
```

## Observações

- A rota `PUT /:id` está comentada e não está em uso atualmente. Se necessário, pode ser descomentada e implementada conforme a lógica desejada.
- Certifique-se de que o controlador `AlimentoConsumidoController` esteja implementado corretamente para que as rotas funcionem conforme esperado.