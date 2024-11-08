---
title: index
description: 'Arquivo de configuração das rotas principais da aplicação.'
---

# index

O arquivo `index.ts` é responsável por definir as rotas principais da aplicação utilizando o framework Express. Ele organiza as rotas em diferentes módulos e aplica middleware de autenticação onde necessário.

## Estrutura do Código

O código importa o `Router` do Express e as rotas específicas de diferentes módulos, além de um middleware de autenticação e um controlador para interações com o Arduino.

### Importações

```typescript
import { Router } from "express";
import user from "./usuarioRoutes";
import auth from "./authRoutes";
import alimento from "./alimentoRoutes";
import categoria from "./categoriaRoutes";
import dieta from "./dietaRoutes";
import dietaDiaria from "./dietaDiariaRoutes";
import alimentoConsumido from "./alimentoConsumidoRoutes";
import authMiddleware from "../middlewares/authMiddleware";
import ArduinoController from "../controllers/ArduinoController";
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
routes.use("/dietaDiaria", authMiddleware, dietaDiaria);
routes.use("/alimentoConsumido", authMiddleware, alimentoConsumido);
```

### Rota Raiz

Uma rota raiz é definida para responder com uma mensagem simples:

```typescript
routes.get('/', (req, res) => {
    res.send('Hello World!');
});
```

### Rota para Arduino

Uma rota específica para obter o último consumo de água do Arduino é configurada:

```typescript
routes.get('/arduino/agua/:Id', ArduinoController.getUltimoConsumoAgua);
```

### Exportação

Por fim, o objeto `routes` é exportado para ser utilizado em outras partes da aplicação:

```typescript
export default routes;
```

## Considerações Finais

Este arquivo é fundamental para a organização das rotas da aplicação, permitindo uma estrutura modular e a aplicação de middleware de autenticação de forma centralizada.