
---
title: UsuarioController
description: 'Controlador responsável pela gestão de usuários, incluindo criação, listagem, atualização e remoção.'
---

# UsuarioController

O `UsuarioController` é responsável por gerenciar as operações relacionadas aos usuários no sistema. Ele fornece métodos para criar, listar, atualizar e remover usuários, utilizando o modelo `Usuario` e funções auxiliares para cálculos relacionados à saúde.

## Métodos

### create

```typescript
public async create(req: Request, res: Response): Promise<Response>
```

Cria um novo usuário. O método valida os dados de entrada, verifica se o e-mail já está em uso e criptografa a senha antes de salvar o usuário no banco de dados.

#### Parâmetros

- `req`: Objeto de requisição que contém os dados do usuário no corpo da requisição.
- `res`: Objeto de resposta utilizado para enviar a resposta ao cliente.

#### Respostas

- **201 Created**: Retorna os dados do usuário criado.
- **400 Bad Request**: Retorna mensagens de erro se os dados de entrada não forem válidos.
- **401 Unauthorized**: Retorna erro se o e-mail e a senha não forem fornecidos.
- **500 Internal Server Error**: Retorna erro em caso de falha no servidor.

### list

```typescript
public async list(_: Request, res: Response): Promise<void>
```

Lista todos os usuários que não foram removidos. Os usuários são retornados em ordem crescente de e-mail.

#### Parâmetros

- `res`: Objeto de resposta utilizado para enviar a resposta ao cliente.

#### Respostas

- **200 OK**: Retorna a lista de usuários.
- **500 Internal Server Error**: Retorna erro em caso de falha ao listar usuários.

### update

```typescript
public async update(req: Request, res: Response): Promise<Response>
```

Atualiza os dados de um usuário existente. O método permite a atualização de todos os campos, incluindo a senha, que é criptografada novamente.

#### Parâmetros

- `req`: Objeto de requisição que contém os dados do usuário a serem atualizados no corpo da requisição.
- `res`: Objeto de resposta utilizado para enviar a resposta ao cliente.

#### Respostas

- **200 OK**: Retorna mensagem de sucesso e os dados do usuário atualizado.
- **404 Not Found**: Retorna erro se o usuário não for encontrado.
- **500 Internal Server Error**: Retorna erro em caso de falha ao atualizar o usuário.

### delete

```typescript
public async delete(req: Request, res: Response): Promise<Response>
```

Remove um usuário marcando-o como removido. O usuário não é excluído do banco de dados, mas sua data de remoção é registrada.

#### Parâmetros

- `req`: Objeto de requisição que contém o ID do usuário a ser removido no corpo da requisição.
- `res`: Objeto de resposta utilizado para enviar a resposta ao cliente.

#### Respostas

- **200 OK**: Retorna mensagem de sucesso ao remover o usuário.
- **404 Not Found**: Retorna erro se o usuário não for encontrado.
- **500 Internal Server Error**: Retorna erro em caso de falha ao remover o usuário.
