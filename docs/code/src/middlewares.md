---
title: middlewares
description: 'Pasta que contém os middlewares utilizados na aplicação para manipulação de requisições e autenticação.'
---

# middlewares

A pasta `middlewares` contém os middlewares utilizados na aplicação. Middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função middleware na cadeia. Eles podem ser utilizados para executar código, modificar a requisição e a resposta, encerrar a requisição ou chamar o próximo middleware na pilha.

## Estrutura

A pasta `middlewares` inclui os seguintes arquivos:

- **authMiddleware.ts**: Middleware responsável pela autenticação de usuários, garantindo que apenas usuários autenticados possam acessar determinadas rotas.
- **emailMiddleware.ts**: Middleware que pode ser utilizado para validação e manipulação de requisições relacionadas a e-mails.

## Uso

Os middlewares são geralmente utilizados nas rotas da aplicação, onde podem ser aplicados a uma ou mais rotas específicas. Para utilizá-los, basta importá-los e adicioná-los à definição das rotas no arquivo correspondente.