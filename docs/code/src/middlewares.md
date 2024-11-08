---
title: middlewares
description: 'Pasta que contém os middlewares utilizados na aplicação para manipulação de requisições e autenticação.'
---

# middlewares

A pasta `middlewares` contém os middlewares utilizados na aplicação. Middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função middleware na cadeia. Eles podem ser utilizados para executar código, modificar a requisição e a resposta, encerrar a requisição e chamar o próximo middleware na pilha.

## Estrutura

A pasta `middlewares` inclui os seguintes arquivos:

- **authMiddleware.ts**: Middleware responsável pela autenticação de usuários.
- **emailMiddleware.ts**: Middleware para manipulação e validação de e-mails.

## Uso

Os middlewares são integrados nas rotas da aplicação, permitindo que funcionalidades como autenticação e validação sejam aplicadas de forma centralizada e reutilizável.