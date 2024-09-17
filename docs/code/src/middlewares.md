---
title: middlewares
description: 'Pasta que contém os middlewares utilizados na aplicação para controle de acesso e manipulação de requisições.'
---

# middlewares

A pasta `middlewares` é responsável por armazenar os middlewares utilizados na aplicação. Middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função middleware na cadeia. Eles podem ser utilizados para diversas finalidades, como autenticação, manipulação de dados de requisição, tratamento de erros, entre outros.

## Estrutura

A pasta `middlewares` contém os seguintes arquivos:

- **authMiddleware.ts**: Middleware responsável pela autenticação de usuários. Ele verifica se o usuário está autenticado antes de permitir o acesso a rotas protegidas.

## Uso

Os middlewares podem ser aplicados em rotas específicas ou globalmente na aplicação, dependendo da necessidade. Para utilizá-los, basta importá-los nos arquivos de rotas e aplicá-los como funções intermediárias nas definições das rotas.