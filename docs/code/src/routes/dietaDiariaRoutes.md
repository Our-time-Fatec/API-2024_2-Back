---
title: dietaDiariaRoutes
description: 'Rotas para gerenciamento das dietas diárias no sistema.'
---

# dietaDiariaRoutes

Este arquivo contém as definições das rotas para o gerenciamento das dietas diárias no sistema. Utiliza o framework Express para a criação das rotas e está integrado ao `DietaDiariaController` para manipulação das requisições.

## Rotas Definidas

- **GET /me**
  - **Descrição**: Lista todas as dietas do usuário autenticado.
  - **Controlador**: `DietaDiariaController.listarDietas`

- **GET /:id**
  - **Descrição**: Busca uma dieta específica pelo ID.
  - **Controlador**: `DietaDiariaController.buscarDietaPorId`

- **GET /me/hoje**
  - **Descrição**: Lista as dietas do usuário para o dia atual.
  - **Controlador**: `DietaDiariaController.listarHoje`

- **GET /me/forma**
  - **Descrição**: Lista as dietas do usuário para o dia atual em um formato específico.
  - **Controlador**: `DietaDiariaController.listarHojeFormatado`

## Exportação

As rotas são exportadas como um módulo padrão, permitindo que sejam utilizadas em outras partes da aplicação.