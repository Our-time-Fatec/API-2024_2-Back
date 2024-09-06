---
title: categoriaRoutes
description: 'Definição das rotas para gerenciamento de categorias no sistema.'
---

# categoriaRoutes

O arquivo `categoriaRoutes.ts` define as rotas relacionadas ao gerenciamento de categorias no sistema. Utiliza o framework Express para facilitar a criação e manipulação das rotas.

## Estrutura do Código

```typescript
import { Router } from "express";
import controller from "../controllers/CategoriaController";

const routes = Router();

routes.get("/", controller.list);

export default routes;
```

## Descrição das Rotas

- `GET /`: Esta rota é responsável por listar todas as categorias. Ela utiliza o método `list` do `CategoriaController` para retornar os dados.

## Dependências

- **express**: O framework utilizado para a criação das rotas.
- **CategoriaController**: Controlador que contém a lógica de negócios para manipulação das categorias.

## Como Usar

Para utilizar estas rotas, você deve importá-las em seu arquivo principal de rotas ou no servidor Express, como mostrado abaixo:

```typescript
import categoriaRoutes from './routes/categoriaRoutes';

app.use('/categorias', categoriaRoutes);
```

Isso fará com que todas as requisições para `/categorias` sejam direcionadas para as rotas definidas em `categoriaRoutes.ts`.