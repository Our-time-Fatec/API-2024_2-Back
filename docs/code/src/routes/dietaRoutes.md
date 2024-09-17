---
title: dietaRoutes
description: 'Rotas para gerenciamento de dietas no sistema.'
---

# dietaRoutes

Este arquivo contém as definições das rotas para o gerenciamento de dietas na aplicação. Utiliza o framework Express para definir as rotas e associá-las aos métodos do `DietaController`.

## Rotas Definidas

- `POST /`: Cria uma nova dieta.
- `GET /me`: Lista todas as dietas do usuário autenticado.
- `GET /:id`: Busca uma dieta específica pelo seu ID.
- `PUT /:id`: Atualiza uma dieta existente pelo seu ID.
- `DELETE /:id`: Remove uma dieta pelo seu ID.

## Importações

O arquivo importa o `Router` do Express e o `DietaController`, que contém a lógica de controle para as operações relacionadas às dietas.

```typescript
import { Router } from "express";
import DietaController from "../controllers/DietaController";
```

## Exportação

As rotas são exportadas como um módulo padrão para serem utilizadas em outras partes da aplicação.

```typescript
export default routes;
```