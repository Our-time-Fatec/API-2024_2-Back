---
title: src
description: 'Diretório principal do código-fonte, contendo a implementação da aplicação.'
---

# src

O diretório `src` é o núcleo da aplicação, onde todo o código-fonte é organizado. Ele contém subdiretórios que agrupam funcionalidades específicas, como controladores, modelos, interfaces, middlewares e rotas. A seguir, uma breve descrição de cada subdiretório:

- **database**: Contém arquivos relacionados à conexão com o banco de dados e scripts de inicialização (seed).
- **func**: Agrupa funções utilitárias específicas da aplicação.
- **controllers**: Implementa a lógica de controle da aplicação, gerenciando as interações entre as rotas e os modelos.
- **Interfaces**: Define as interfaces TypeScript que descrevem a estrutura dos dados utilizados na aplicação.
- **models**: Contém as definições dos modelos de dados, representando as entidades da aplicação.
- **middlewares**: Implementa middlewares que podem ser utilizados nas rotas para manipulação de requisições e respostas.
- **utils**: Agrupa funções utilitárias que podem ser utilizadas em diferentes partes da aplicação.
- **types**: Contém definições de tipos TypeScript, como extensões para bibliotecas externas.
- **routes**: Define as rotas da aplicação, mapeando URLs para controladores específicos.

Este diretório é fundamental para a organização e manutenção do código, facilitando a escalabilidade e a legibilidade da aplicação.