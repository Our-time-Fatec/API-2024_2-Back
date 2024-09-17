---
title: routes
description: 'Contém as definições de rotas para a API, organizadas por recursos.'
---

# Rotas

A pasta `routes` contém os arquivos responsáveis pela definição das rotas da API. Cada arquivo dentro desta pasta corresponde a um recurso específico e define as operações que podem ser realizadas sobre esse recurso.

## Estrutura

A estrutura da pasta `routes` é a seguinte:

- **alimentoConsumidoRoutes.ts**: Define as rotas relacionadas ao consumo de alimentos.
- **alimentoRoutes.ts**: Define as rotas para operações relacionadas a alimentos.
- **authRoutes.ts**: Gerencia as rotas de autenticação de usuários.
- **categoriaRoutes.ts**: Define as rotas para operações relacionadas a categorias de alimentos.
- **dietaRoutes.ts**: Gerencia as rotas relacionadas a dietas.
- **index.ts**: Arquivo principal que agrega todas as rotas.
- **usuarioRoutes.ts**: Define as rotas para operações relacionadas a usuários.

## Uso

As rotas são importadas e utilizadas no servidor principal da aplicação, permitindo que os clientes interajam com os recursos da API de forma organizada e estruturada. Cada rota pode estar associada a métodos HTTP como GET, POST, PUT e DELETE, dependendo da operação que se deseja realizar.