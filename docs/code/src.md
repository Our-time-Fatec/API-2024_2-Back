---
title: src
description: 'Diretório principal contendo a implementação do projeto, incluindo controladores, modelos, rotas e utilitários.'
---

# src

O diretório `src` é a raiz da implementação do projeto. Ele contém todos os componentes necessários para a funcionalidade da aplicação, organizados em subdiretórios conforme descrito abaixo:

- **controllers**: Contém os controladores que gerenciam a lógica de negócios e as interações com os modelos.
- **database**: Inclui a configuração da conexão com o banco de dados e scripts de seed para inicialização de dados.
- **func**: Contém funções auxiliares que suportam a lógica da aplicação.
- **Interfaces**: Define as interfaces TypeScript que descrevem a estrutura dos dados utilizados na aplicação.
- **models**: Contém os modelos que representam as entidades do domínio da aplicação.
- **middlewares**: Inclui middlewares que interceptam requisições e podem realizar validações ou autenticações.
- **routes**: Define as rotas da aplicação, mapeando URLs para os controladores correspondentes.
- **types**: Contém definições de tipos personalizados para uso em toda a aplicação.
- **utils**: Inclui funções utilitárias que fornecem funcionalidades auxiliares.

Este diretório é fundamental para a organização e manutenção do código, permitindo uma estrutura modular e escalável.