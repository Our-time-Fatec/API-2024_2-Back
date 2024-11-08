---
title: routes
description: 'Diretório que contém as definições das rotas da API, organizadas por recursos.'
---

# routes

O diretório `routes` é responsável por definir as rotas da API, organizando-as de acordo com os diferentes recursos do sistema. Cada arquivo dentro deste diretório contém as rotas específicas para um determinado recurso, facilitando a manutenção e a escalabilidade da aplicação.

## Estrutura do Diretório

O diretório `routes` contém os seguintes arquivos:

- **alimentoRoutes.ts**: Define as rotas relacionadas ao recurso "alimento".
- **alimentoConsumidoRoutes.ts**: Define as rotas para gerenciar alimentos consumidos.
- **authRoutes.ts**: Contém as rotas para autenticação de usuários.
- **categoriaRoutes.ts**: Define as rotas para gerenciar categorias de alimentos.
- **dietaDiariaRoutes.ts**: Contém as rotas para gerenciar dietas diárias.
- **dietaRoutes.ts**: Define as rotas para gerenciar dietas fixas.
- **index.ts**: Arquivo principal que agrega todas as rotas.
- **usuarioRoutes.ts**: Define as rotas relacionadas ao gerenciamento de usuários.

## Considerações

A organização das rotas em arquivos separados permite uma melhor modularização do código, facilitando a leitura e a manutenção. Cada arquivo deve exportar suas rotas para que possam ser utilizadas no arquivo `index.ts`, onde todas as rotas são combinadas e exportadas para uso na aplicação.