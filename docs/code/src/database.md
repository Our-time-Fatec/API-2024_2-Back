---
title: database
description: 'Pasta que contém as definições e interações com o banco de dados da aplicação.'
---

# database

A pasta `database` é responsável por gerenciar as interações com o banco de dados da aplicação. Ela contém arquivos que definem a conexão com o banco de dados e scripts para a inserção de dados iniciais (seed).

## Estrutura

- **connection.ts**: Este arquivo contém a lógica para estabelecer a conexão com o banco de dados.
- **seed.ts**: Este arquivo é utilizado para popular o banco de dados com dados iniciais, facilitando o desenvolvimento e testes.

## Uso

Os arquivos dentro da pasta `database` devem ser importados e utilizados nos controladores e serviços que necessitam de acesso ao banco de dados. A conexão deve ser estabelecida antes de qualquer operação de leitura ou escrita.