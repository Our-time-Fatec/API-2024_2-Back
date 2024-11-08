---
title: database
description: 'Pasta responsável pela gestão da conexão e manipulação de dados da aplicação.'
---

# database

A pasta `database` contém os arquivos e scripts necessários para a configuração e manipulação do banco de dados da aplicação. Ela é fundamental para a interação entre a aplicação e o sistema de gerenciamento de banco de dados (SGBD) utilizado.

## Estrutura

A pasta `database` inclui os seguintes arquivos:

- **connection.ts**: Este arquivo é responsável por estabelecer a conexão com o banco de dados. Ele contém as configurações necessárias, como URL, credenciais e opções de conexão.

- **seed.ts**: Este arquivo é utilizado para popular o banco de dados com dados iniciais. É útil para testes e desenvolvimento, permitindo que a aplicação comece com um conjunto de dados pré-definido.

## Importância

A correta configuração da pasta `database` é crucial para garantir que a aplicação funcione corretamente, permitindo a persistência e recuperação de dados de forma eficiente.