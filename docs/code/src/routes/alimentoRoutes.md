---
title: alimentoRoutes
description: 'Rotas para gerenciamento de alimentos na aplicação.'
---

# alimentoRoutes

O arquivo `alimentoRoutes.ts` define as rotas relacionadas ao gerenciamento de alimentos na aplicação. Utiliza o framework Express para criar um conjunto de endpoints que permitem a interação com o controlador de alimentos.

## Estrutura das Rotas

As seguintes rotas estão disponíveis:

- `POST /`: Cria um novo alimento.
- `GET /`: Lista todos os alimentos.
- `GET /criadosPorMim`: Lista os alimentos criados pelo usuário autenticado.
- `GET /:id`: Busca um alimento específico pelo seu ID.
- `PUT /:id`: Atualiza um alimento existente pelo seu ID.
- `DELETE /:id`: Remove um alimento pelo seu ID.

## Dependências

Este arquivo importa o `Router` do Express e o `AlimentoController`, que contém a lógica de negócios para cada uma das operações definidas nas rotas.

## Exemplo de Uso

Para utilizar as rotas definidas, é necessário importar o módulo em um arquivo de configuração de rotas principal, como `index.ts`, e registrá-las no aplicativo Express.

```typescript
import alimentoRoutes from './routes/alimentoRoutes';

app.use('/api/alimentos', alimentoRoutes);
```

Isso permitirá que as rotas sejam acessadas sob o prefixo `/api/alimentos`.