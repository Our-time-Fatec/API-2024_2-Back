---
title: dietaRoutes
description: 'Rotas para gerenciamento de dietas no sistema.'
---

# dietaRoutes

O arquivo `dietaRoutes.ts` define as rotas para o gerenciamento de dietas em uma aplicação Express. Ele utiliza o `Router` do Express para organizar as rotas relacionadas às operações de dieta.

## Rotas Definidas

As seguintes rotas estão disponíveis:

- `POST /`: Cria uma nova dieta.
- `GET /me`: Lista todas as dietas do usuário autenticado.
- `GET /:id`: Busca uma dieta específica pelo seu ID.
- `PUT /:id`: Atualiza uma dieta existente pelo seu ID.
- `DELETE /:id`: Remove uma dieta pelo seu ID.

## Dependências

Este arquivo depende do `DietaController`, que contém a lógica de negócios para cada uma das operações de dieta. As funções do controlador são as seguintes:

- `criarDieta`: Lida com a criação de uma nova dieta.
- `listarDietas`: Recupera todas as dietas do usuário.
- `buscarDietaPorId`: Obtém uma dieta específica com base no ID fornecido.
- `atualizarDieta`: Atualiza os dados de uma dieta existente.
- `removerDieta`: Exclui uma dieta com base no ID fornecido.

## Exemplo de Uso

Para utilizar essas rotas, você deve importar o módulo em seu arquivo principal de configuração do servidor e montá-lo em um caminho específico:

```typescript
import dietaRoutes from './src/routes/dietaRoutes';

app.use('/api/dietas', dietaRoutes);
```

Isso permitirá que as rotas sejam acessadas sob o prefixo `/api/dietas`.