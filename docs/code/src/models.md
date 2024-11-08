---
title: models
description: 'Contém as definições dos modelos de dados utilizados na aplicação.'
---

# models

A pasta `models` contém as definições dos modelos de dados utilizados na aplicação. Esses modelos representam as entidades principais do sistema e são utilizados para interagir com o banco de dados, facilitando a manipulação e a validação dos dados.

## Estrutura

Abaixo estão os arquivos contidos na pasta `models`:

- `alimentoConsumido.ts`: Define o modelo para o registro de alimentos consumidos pelos usuários.
- `alimento.ts`: Representa o modelo de alimentos disponíveis no sistema.
- `categoria.ts`: Define o modelo para as categorias de alimentos.
- `dietaDiaria.ts`: Representa o modelo para as dietas diárias dos usuários.
- `dietaFixa.ts`: Define o modelo para dietas fixas que podem ser atribuídas aos usuários.
- `usuarios.ts`: Representa o modelo de usuários do sistema.

## Uso

Os modelos são utilizados em conjunto com os controladores e rotas para realizar operações de CRUD (Create, Read, Update, Delete) no banco de dados. Cada modelo deve ser importado nos respectivos controladores onde suas funcionalidades são necessárias.