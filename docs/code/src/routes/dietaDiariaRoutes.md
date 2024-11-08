---
title: dietaDiariaRoutes
description: 'Rotas para gerenciamento das dietas diárias no sistema.'
---

# dietaDiariaRoutes

Este arquivo contém as definições das rotas relacionadas ao gerenciamento das dietas diárias. Utiliza o framework Express para definir as rotas e associá-las aos métodos do `DietaDiariaController`.

## Rotas Definidas

- `GET /me`: Lista todas as dietas do usuário atual.
- `GET /:id`: Busca uma dieta específica pelo seu ID.
- `GET /me/hoje`: Lista as dietas do usuário para o dia atual.
- `GET /me/forma`: Lista as dietas do usuário para o dia atual em um formato específico.

## Importações

O arquivo importa o `Router` do Express e o `DietaDiariaController`, que contém a lógica de controle para as operações relacionadas às dietas diárias.

## Exemplo de Uso

Para utilizar estas rotas, você deve integrá-las ao seu aplicativo Express, como mostrado abaixo:

```javascript
import express from 'express';
import dietaDiariaRoutes from './src/routes/dietaDiariaRoutes';

const app = express();

app.use('/dietas', dietaDiariaRoutes);
```

Isso permitirá que você acesse as rotas definidas através do prefixo `/dietas`.