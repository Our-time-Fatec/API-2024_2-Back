---
title: models
description: 'Contém as definições dos modelos de dados utilizados na aplicação.'
---

# models

A pasta `models` contém as definições dos modelos de dados utilizados na aplicação. Esses modelos representam as entidades principais do sistema e são utilizados para interagir com o banco de dados, definindo a estrutura e as relações entre os dados.

## Estrutura

Abaixo estão os arquivos contidos na pasta `models`:

- **alimento.ts**: Define o modelo para a entidade Alimento.
- **alimentoConsumido.ts**: Define o modelo para a entidade AlimentoConsumido.
- **categoria.ts**: Define o modelo para a entidade Categoria.
- **dietaFixa.ts**: Define o modelo para a entidade DietaFixa.
- **usuarios.ts**: Define o modelo para a entidade Usuario.

## Uso

Os modelos são utilizados em conjunto com os controladores e as rotas para realizar operações de CRUD (Create, Read, Update, Delete) nas entidades correspondentes. Cada modelo deve ser importado nos controladores que necessitam interagir com os dados da entidade.