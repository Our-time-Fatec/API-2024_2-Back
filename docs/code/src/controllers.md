---
title: controllers
description: 'Contém os controladores responsáveis pela lógica de negócios da aplicação.'
---

# controllers

A pasta `controllers` contém os controladores que gerenciam a lógica de negócios da aplicação. Cada controlador é responsável por interagir com os modelos e gerenciar as requisições e respostas do cliente. 

## Estrutura

Abaixo está a lista dos controladores disponíveis nesta pasta:

- **AlimentoConsumidoController.ts**: Gerencia as operações relacionadas aos alimentos consumidos.
- **AlimentoController.ts**: Controla as operações referentes aos alimentos.
- **ArduinoController.ts**: Interage com dispositivos Arduino para coletar e enviar dados.
- **AuthController.ts**: Gerencia a autenticação de usuários.
- **CategoriaController.ts**: Controla as operações relacionadas às categorias de alimentos.
- **DietaController.ts**: Gerencia as operações relacionadas às dietas.
- **DietaDiariaController.ts**: Controla as dietas diárias dos usuários.
- **UsuarioController.ts**: Gerencia as operações relacionadas aos usuários.

## Uso

Os controladores são utilizados nas rotas da aplicação para processar as requisições e retornar as respostas apropriadas. Cada controlador deve ser importado nas rotas correspondentes para que suas funcionalidades possam ser acessadas.