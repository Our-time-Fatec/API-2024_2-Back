
---
title: UsuarioController
description: 'Controlador responsável pela gestão de usuários, incluindo criação, atualização, listagem e remoção.'
---

# UsuarioController

O `UsuarioController` é responsável por gerenciar as operações relacionadas aos usuários no sistema. Ele fornece métodos para criar, listar, obter detalhes, atualizar e remover usuários, além de gerenciar a atualização de informações específicas, como a quantidade de água ingerida.

## Métodos

### create

Cria um novo usuário no sistema.

**Parâmetros:**
- `req`: Objeto de requisição que contém os dados do usuário.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

**Retorno:**
- Resposta com status 201 se o usuário for criado com sucesso, ou um erro apropriado.

### list

Lista todos os usuários ativos no sistema.

**Parâmetros:**
- `req`: Objeto de requisição.
- `res`: Objeto de resposta.

**Retorno:**
- Resposta com status 200 e a lista de usuários.

### getUsuario

Obtém as informações de um usuário específico.

**Parâmetros:**
- `req`: Objeto de requisição que contém o ID do usuário.
- `res`: Objeto de resposta.

**Retorno:**
- Resposta com status 200 e os detalhes do usuário, ou um erro se o usuário não for encontrado.

### update

Atualiza as informações de um usuário existente.

**Parâmetros:**
- `req`: Objeto de requisição que contém os dados atualizados do usuário.
- `res`: Objeto de resposta.

**Retorno:**
- Resposta com status 200 se a atualização for bem-sucedida, ou um erro apropriado.

### delete

Remove um usuário do sistema, marcando-o como removido.

**Parâmetros:**
- `req`: Objeto de requisição que contém o ID do usuário.
- `res`: Objeto de resposta.

**Retorno:**
- Resposta com status 200 se o usuário for removido com sucesso, ou um erro se o usuário não for encontrado.

### getUsuarioDetalhes

Obtém detalhes adicionais sobre um usuário, incluindo informações sobre a ingestão de água e alimentos consumidos.

**Parâmetros:**
- `req`: Objeto de requisição que contém o ID do usuário.
- `res`: Objeto de resposta.

**Retorno:**
- Resposta com status 200 e os detalhes do usuário, ou um erro se o usuário não for encontrado.

### atualzarAgua

Atualiza a quantidade de água ingerida por um usuário.

**Parâmetros:**
- `req`: Objeto de requisição que contém a quantidade de água e o ID do usuário.
- `res`: Objeto de resposta.

**Retorno:**
- Resposta com status 200 se a atualização for bem-sucedida, ou um erro apropriado.

### zerarAgua

Zera a quantidade de água ingerida por um usuário.

**Parâmetros:**
- `req`: Objeto de requisição que contém o ID do usuário.
- `res`: Objeto de resposta.

**Retorno:**
- Resposta com status 200 e a quantidade de água zerada, ou um erro se o usuário não for encontrado.

### editPassword

Atualiza a senha de um usuário.

**Parâmetros:**
- `req`: Objeto de requisição que contém a nova senha e o link de email.
- `res`: Objeto de resposta.

**Retorno:**
- Resposta com status 200 se a senha for atualizada com sucesso, ou um erro apropriado.

### verificarEmail

Verifica se um email está associado a um usuário e envia um link de redefinição de senha, se necessário.

**Parâmetros:**
- `req`: Objeto de requisição que contém o email e o link de redefinição.
- `res`: Objeto de resposta.

**Retorno:**
- Resposta com status 200 se o email existir, ou um erro se não for encontrado.
