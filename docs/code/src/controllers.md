---
title: controllers
description: 'Contém os controladores que gerenciam a lógica de negócios da aplicação.'
---

# controllers

A pasta `controllers` é responsável por conter os controladores da aplicação, que são responsáveis por gerenciar a lógica de negócios e a interação entre os modelos e as rotas. Cada controlador é responsável por um conjunto específico de funcionalidades, permitindo uma organização clara e modular do código.

## Estrutura

Abaixo está a lista dos controladores presentes na pasta:

- **AlimentoConsumidoController.ts**: Gerencia as operações relacionadas aos alimentos consumidos pelos usuários.
- **AlimentoController.ts**: Controla as operações sobre os alimentos disponíveis na aplicação.
- **AuthController.ts**: Gerencia a autenticação e autorização de usuários.
- **CategoriaController.ts**: Controla as operações relacionadas às categorias de alimentos.
- **UsuarioController.ts**: Gerencia as operações relacionadas aos usuários da aplicação.
- **DietaController.ts**: Controla as operações sobre as dietas dos usuários.

## Funcionalidade

Cada controlador deve implementar métodos que correspondem às operações CRUD (Criar, Ler, Atualizar, Deletar) e outras funcionalidades específicas necessárias para a aplicação. A separação em diferentes controladores ajuda a manter o código organizado e facilita a manutenção e a escalabilidade do sistema.