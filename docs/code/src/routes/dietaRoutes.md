---
title: dietaRoutes
description: 'Rotas para gerenciamento de dietas no sistema.'
---

# dietaRoutes

O arquivo `dietaRoutes.ts` define as rotas relacionadas ao gerenciamento de dietas na aplicação. Utiliza o framework Express para criar um conjunto de endpoints que permitem a criação, listagem, busca, atualização e remoção de dietas.

## Estrutura das Rotas

As seguintes rotas estão disponíveis:

- `POST /`: Cria uma nova dieta.
- `GET /me`: Lista todas as dietas do usuário autenticado.
- `GET /:id`: Busca uma dieta específica pelo seu ID.
- `PUT /:id`: Atualiza uma dieta existente pelo seu ID.
- `DELETE /:id`: Remove uma dieta pelo seu ID.

## Dependências

Este arquivo depende do `DietaController`, que contém a lógica de negócios para cada uma das operações definidas nas rotas.

## Exemplo de Uso

Para utilizar as rotas definidas, é necessário importar o módulo em um arquivo de configuração de rotas principal e montá-las no aplicativo Express:

```typescript
import dietaRoutes from './src/routes/dietaRoutes';

app.use('/api/dietas', dietaRoutes);
```

Isso permitirá que as rotas sejam acessadas sob o prefixo `/api/dietas`.