---
title: alimentoRoutes
description: 'Definição das rotas para gerenciamento de alimentos na aplicação.'
---

# alimentoRoutes

O arquivo `alimentoRoutes.ts` contém a definição das rotas relacionadas ao gerenciamento de alimentos na aplicação. Utiliza o framework Express para criar um conjunto de endpoints que permitem a interação com o controlador de alimentos.

## Estrutura das Rotas

As rotas definidas neste arquivo são:

- `POST /`: Cria um novo alimento.
- `GET /`: Lista todos os alimentos.
- `GET /criadosPorMim`: Lista os alimentos criados pelo usuário autenticado.
- `GET /:id`: Busca um alimento específico pelo seu ID.
- `PUT /:id`: Atualiza um alimento existente pelo seu ID.
- `DELETE /:id`: Remove um alimento pelo seu ID.

## Importações

O arquivo importa o `Router` do Express e o `AlimentoController`, que contém a lógica de negócios para cada uma das operações.

```typescript
import { Router } from "express";
import AlimentoController from "../controllers/AlimentoController";
```

## Exportação

As rotas são exportadas como um módulo padrão, permitindo que sejam utilizadas em outras partes da aplicação.

```typescript
export default routes;
```

## Exemplo de Uso

Para utilizar estas rotas, você deve importá-las em seu arquivo principal de rotas ou no servidor Express:

```typescript
import alimentoRoutes from './routes/alimentoRoutes';

app.use('/api/alimentos', alimentoRoutes);
```

Isso configurará as rotas para que sejam acessíveis sob o prefixo `/api/alimentos`.