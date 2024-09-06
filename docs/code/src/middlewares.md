---
title: middlewares
description: 'Pasta que contém os middlewares utilizados na aplicação para manipulação de requisições e autenticação.'
---

# middlewares

A pasta `middlewares` é responsável por armazenar os middlewares utilizados na aplicação. Middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função middleware na cadeia. Eles podem ser utilizados para executar código, modificar a requisição e a resposta, encerrar a requisição ou chamar o próximo middleware na pilha.

## Estrutura

Dentro da pasta `middlewares`, você encontrará arquivos que implementam funcionalidades específicas, como autenticação e validação de dados. Esses middlewares são essenciais para garantir a segurança e a integridade das operações realizadas pela aplicação.

### Exemplos de Middlewares

- **authMiddleware.ts**: Middleware responsável pela autenticação de usuários, garantindo que apenas usuários autenticados possam acessar determinadas rotas.

## Uso

Os middlewares podem ser aplicados em rotas específicas ou globalmente na aplicação, dependendo da necessidade. Para utilizá-los, basta importá-los nos arquivos de rotas e aplicá-los conforme necessário.