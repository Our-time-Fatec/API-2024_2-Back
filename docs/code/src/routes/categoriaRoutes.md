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

## Descrição das Funcionalidades

- **Importação de Módulos**: O arquivo importa o módulo `Router` do Express e o controlador `CategoriaController`, que contém a lógica de negócios para as operações relacionadas a categorias.

- **Definição das Rotas**:
  - `routes.get("/")`: Define uma rota GET na raiz (`/`) que chama o método `list` do `CategoriaController`. Este método é responsável por listar todas as categorias disponíveis no sistema.

- **Exportação**: O objeto `routes` é exportado como padrão, permitindo que seja utilizado em outras partes da aplicação, como no arquivo principal de configuração de rotas.

## Uso

Para utilizar estas rotas, você deve importá-las no arquivo principal de rotas da aplicação e registrá-las com o Express. Por exemplo:

```typescript
import categoriaRoutes from './src/routes/categoriaRoutes';

app.use('/categorias', categoriaRoutes);
```

Isso fará com que as requisições para `/categorias` sejam direcionadas para as rotas definidas em `categoriaRoutes.ts`.