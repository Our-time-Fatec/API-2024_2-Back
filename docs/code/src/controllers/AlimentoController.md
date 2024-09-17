---
title: AlimentoController
description: 'Controlador responsável pela manipulação de alimentos, incluindo criação, listagem, atualização e exclusão.'
---

# AlimentoController

O `AlimentoController` é responsável por gerenciar as operações relacionadas aos alimentos na aplicação. Ele fornece métodos para criar, listar, buscar, atualizar e deletar alimentos, além de filtrar alimentos por usuário.

## Métodos

### create

Cria um novo alimento.

**Parâmetros:**
- `req`: Objeto de requisição que contém os dados do alimento a ser criado.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

**Retorno:**
- Retorna um objeto JSON com os dados do alimento criado ou uma mensagem de erro.

### listAlimentos

Lista os alimentos com suporte a paginação e filtragem.

**Parâmetros:**
- `req`: Objeto de requisição que pode conter parâmetros de consulta para paginação e filtragem.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

**Retorno:**
- Retorna um objeto JSON com a lista de alimentos e informações de paginação.

### findAlimentoById

Busca um alimento pelo seu ID.

**Parâmetros:**
- `req`: Objeto de requisição que contém o ID do alimento a ser buscado.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

**Retorno:**
- Retorna um objeto JSON com os dados do alimento encontrado ou uma mensagem de erro.

### update

Atualiza os dados de um alimento existente.

**Parâmetros:**
- `req`: Objeto de requisição que contém o ID do alimento e os novos dados.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

**Retorno:**
- Retorna um objeto JSON com os dados do alimento atualizado ou uma mensagem de erro.

### delete

Deleta um alimento pelo seu ID.

**Parâmetros:**
- `req`: Objeto de requisição que contém o ID do alimento a ser deletado.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

**Retorno:**
- Retorna uma mensagem de sucesso ou erro.

### findAlimentosByUser

Busca alimentos criados por um usuário específico.

**Parâmetros:**
- `req`: Objeto de requisição que pode conter parâmetros de consulta para paginação e filtragem.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

**Retorno:**
- Retorna um objeto JSON com a lista de alimentos do usuário e informações de paginação.