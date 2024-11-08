---
title: categoriaRoutes
description: 'Definição das rotas para gerenciamento de categorias no sistema.'
---

# categoriaRoutes

O arquivo `categoriaRoutes.ts` define as rotas relacionadas ao gerenciamento de categorias no sistema. Utiliza o framework Express para facilitar a criação e manipulação de rotas.

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

- **Criação de Rotas**: 
  - `routes.get("/")`: Define uma rota GET na raiz (`/`) que chama o método `list` do `CategoriaController`. Este método é responsável por listar todas as categorias disponíveis.

- **Exportação das Rotas**: As rotas são exportadas como o padrão do módulo, permitindo que sejam utilizadas em outras partes da aplicação.

## Uso

Para utilizar estas rotas, elas devem ser importadas e integradas ao servidor Express principal, geralmente no arquivo de configuração das rotas da aplicação.