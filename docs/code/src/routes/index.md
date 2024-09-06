---
title: index
description: 'Arquivo de configuração das rotas principais da aplicação.'
---

# index.ts

O arquivo `index.ts` é responsável por definir as rotas principais da aplicação utilizando o framework Express. Ele organiza as rotas em diferentes módulos e aplica middleware de autenticação quando necessário.

## Estrutura do Código

```typescript
import { Router } from "express";
import user from "./usuarioRoutes";
import auth from "./authRoutes";
import alimento from "./alimentoRoutes";
import categoria from "./categoriaRoutes";
import authMiddleware from "../middlewares/authMiddleware";

const routes = Router();

routes.use("/usuario", user);
routes.use("/auth", auth);
routes.use("/alimento", authMiddleware, alimento);
routes.use("/categoria", authMiddleware, categoria);

export default routes;
```

## Descrição das Rotas

- **/usuario**: Rota que gerencia as operações relacionadas aos usuários, utilizando o módulo `usuarioRoutes`.
- **/auth**: Rota que gerencia a autenticação, utilizando o módulo `authRoutes`.
- **/alimento**: Rota que gerencia as operações relacionadas aos alimentos, utilizando o módulo `alimentoRoutes`. Esta rota requer autenticação, aplicada pelo `authMiddleware`.
- **/categoria**: Rota que gerencia as operações relacionadas às categorias, utilizando o módulo `categoriaRoutes`. Esta rota também requer autenticação.

## Middleware

O `authMiddleware` é aplicado nas rotas de `/alimento` e `/categoria` para garantir que apenas usuários autenticados possam acessar essas rotas.