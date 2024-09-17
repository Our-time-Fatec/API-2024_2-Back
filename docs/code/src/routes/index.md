---
title: index
description: 'Arquivo responsável pela configuração das rotas da aplicação.'
---

# index.ts

O arquivo `index.ts` é responsável pela configuração das rotas da aplicação utilizando o framework Express. Ele centraliza a definição das rotas e aplica middleware de autenticação onde necessário.

## Estrutura do Código

O código importa o `Router` do Express e as rotas específicas de diferentes módulos. Em seguida, define as rotas principais da aplicação.

### Importações

```typescript
import { Router } from "express";
import user from "./usuarioRoutes";
import auth from "./authRoutes";
import alimento from "./alimentoRoutes";
import categoria from "./categoriaRoutes";
import dieta from "./dietaRoutes";
import alimentoConsumido from "./alimentoConsumidoRoutes";
import authMiddleware from "../middlewares/authMiddleware";
```

### Definição das Rotas

Um novo objeto `Router` é criado e as rotas são definidas da seguinte forma:

```typescript
const routes = Router();

routes.use("/usuario", user);
routes.use("/auth", auth);
routes.use("/alimento", authMiddleware, alimento);
routes.use("/categoria", authMiddleware, categoria);
routes.use("/dieta", authMiddleware, dieta);
routes.use("/alimentoConsumido", authMiddleware, alimentoConsumido);
```

### Exportação

Por fim, o objeto `routes` é exportado para ser utilizado em outras partes da aplicação:

```typescript
export default routes;
```

## Considerações

- As rotas que requerem autenticação utilizam o middleware `authMiddleware` para garantir que apenas usuários autenticados possam acessá-las.
- As rotas são organizadas por recursos, facilitando a manutenção e a escalabilidade da aplicação.