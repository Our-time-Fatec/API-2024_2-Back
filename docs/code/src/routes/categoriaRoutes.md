---
title: categoriaRoutes
description: 'Define as rotas para operações relacionadas a categorias no sistema.'
---

# categoriaRoutes

Este arquivo contém a definição das rotas para as operações relacionadas a categorias no sistema. Utiliza o framework Express para gerenciar as requisições HTTP.

## Estrutura do Código

O código importa o módulo `Router` do Express e o controlador `CategoriaController`, que contém a lógica de negócios para as operações de categoria.

```typescript
import { Router } from "express";
import controller from "../controllers/CategoriaController";

const routes = Router();

routes.get("/", controller.list);

export default routes;
```

## Rotas Definidas

- `GET /`: Chama o método `list` do `CategoriaController` para listar todas as categorias.

## Exportação

As rotas são exportadas como um módulo padrão, permitindo que sejam utilizadas em outras partes da aplicação.