---
title: alimentoRoutes
description: 'Definição das rotas para gerenciamento de alimentos na aplicação.'
---

# alimentoRoutes

O arquivo `alimentoRoutes.ts` define as rotas relacionadas ao gerenciamento de alimentos na aplicação. Utiliza o framework Express para criar um conjunto de endpoints que permitem a interação com o controlador de alimentos.

## Rotas Definidas

- `POST /`: Cria um novo alimento.
- `GET /`: Lista todos os alimentos.
- `GET /criadosPorMim`: Lista os alimentos criados pelo usuário autenticado.
- `GET /:id`: Busca um alimento específico pelo seu ID.
- `PUT /:id`: Atualiza um alimento existente pelo seu ID.
- `DELETE /:id`: Remove um alimento pelo seu ID.

## Importações

O arquivo importa o `Router` do Express e o `AlimentoController`, que contém a lógica de negócios para cada uma das operações definidas nas rotas.

```typescript
import { Router } from "express";
import AlimentoController from "../controllers/AlimentoController";
```

## Exportação

As rotas são exportadas como um módulo padrão, permitindo que sejam utilizadas em outras partes da aplicação.

```typescript
export default routes;
```