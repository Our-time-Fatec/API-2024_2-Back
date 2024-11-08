---
title: index
description: 'Arquivo de configuração das rotas principais da aplicação.'
---

# index.ts

O arquivo `index.ts` é responsável por definir as rotas principais da aplicação utilizando o framework Express. Ele organiza as rotas em diferentes módulos e aplica middleware de autenticação onde necessário.

## Estrutura do Código

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

const routes = Router();

routes.use("/usuario", user);
routes.use("/auth", auth);
routes.use("/alimento", authMiddleware, alimento);
routes.use("/categoria", authMiddleware, categoria);
routes.use("/dieta", authMiddleware, dieta);
routes.use("/dietaDiaria", authMiddleware, dietaDiaria);
routes.use("/alimentoConsumido", authMiddleware, alimentoConsumido);
routes.get('/', (req, res) => {
    res.send('Hello World!');
});
routes.get('/arduino/agua/:Id', ArduinoController.getUltimoConsumoAgua);

export default routes;
```

## Descrição das Rotas

- **/usuario**: Rota para gerenciar usuários, utilizando o módulo `usuarioRoutes`.
- **/auth**: Rota para autenticação, utilizando o módulo `authRoutes`.
- **/alimento**: Rota para gerenciar alimentos, protegida pelo middleware de autenticação.
- **/categoria**: Rota para gerenciar categorias, protegida pelo middleware de autenticação.
- **/dieta**: Rota para gerenciar dietas, protegida pelo middleware de autenticação.
- **/dietaDiaria**: Rota para gerenciar dietas diárias, protegida pelo middleware de autenticação.
- **/alimentoConsumido**: Rota para gerenciar alimentos consumidos, protegida pelo middleware de autenticação.
- **/**: Rota raiz que retorna uma mensagem "Hello World!".
- **/arduino/agua/:Id**: Rota que chama o método `getUltimoConsumoAgua` do `ArduinoController`, permitindo obter o último consumo de água baseado no ID fornecido.

## Middleware

O middleware `authMiddleware` é aplicado a várias rotas para garantir que apenas usuários autenticados possam acessar essas funcionalidades.