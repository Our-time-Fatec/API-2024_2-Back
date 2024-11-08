---
title: controllers
description: 'Contém os controladores responsáveis pela lógica de negócios da aplicação.'
---

# controllers

A pasta `controllers` contém os controladores que gerenciam a lógica de negócios da aplicação. Cada controlador é responsável por uma entidade específica e lida com as requisições e respostas relacionadas a essa entidade.

## Estrutura

Abaixo está a lista dos controladores disponíveis nesta pasta:

- **AlimentoConsumidoController.ts**: Gerencia as operações relacionadas aos alimentos consumidos.
- **AuthController.ts**: Responsável pela autenticação e gerenciamento de usuários.
- **AlimentoController.ts**: Controla as operações relacionadas aos alimentos.
- **CategoriaController.ts**: Gerencia as categorias de alimentos.
- **ArduinoController.ts**: Controla a interação com dispositivos Arduino.
- **UsuarioController.ts**: Gerencia as operações relacionadas aos usuários.
- **DietaController.ts**: Controla as operações relacionadas às dietas.
- **DietaDiariaController.ts**: Gerencia as dietas diárias dos usuários.

## Funcionalidade

Cada controlador implementa métodos que correspondem às operações CRUD (Criar, Ler, Atualizar, Deletar) e outras funcionalidades específicas, permitindo a interação com os modelos e a manipulação dos dados da aplicação.