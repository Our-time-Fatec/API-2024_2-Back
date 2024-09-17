---
title: UsuarioController
description: 'Controlador responsável pela gestão de usuários, incluindo criação, listagem, atualização e remoção.'
---

# UsuarioController

O `UsuarioController` é responsável por gerenciar as operações relacionadas aos usuários no sistema. Ele fornece métodos para criar, listar, obter, atualizar e remover usuários, além de calcular detalhes relacionados à saúde e nutrição.

## Métodos

### create

```typescript
public async create(req: Request, res: Response): Promise<Response>
```

Cria um novo usuário. Valida os dados de entrada e criptografa a senha antes de armazenar no banco de dados.

#### Parâmetros

- `req`: Objeto de requisição que contém os dados do usuário.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **201**: Usuário criado com sucesso.
- **400**: Erros de validação (e-mail ou senha inválidos).
- **401**: E-mail e senha não fornecidos.
- **500**: Erro interno do servidor.

---

### list

```typescript
public async list(_: Request, res: Response): Promise<void>
```

Lista todos os usuários ativos no sistema.

#### Parâmetros

- `res`: Objeto de resposta para enviar a lista de usuários.

#### Respostas

- **200**: Lista de usuários.
- **500**: Erro ao listar usuários.

---

### getUsuario

```typescript
public async getUsuario(req: Request, res: Response): Promise<void>
```

Obtém as informações de um usuário específico.

#### Parâmetros

- `req`: Objeto de requisição que contém o ID do usuário.
- `res`: Objeto de resposta para enviar as informações do usuário.

#### Respostas

- **200**: Informações do usuário.
- **404**: Usuário não encontrado.
- **500**: Erro ao buscar informações do usuário.

---

### update

```typescript
public async update(req: Request, res: Response): Promise<Response>
```

Atualiza as informações de um usuário existente.

#### Parâmetros

- `req`: Objeto de requisição que contém os dados atualizados do usuário.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200**: Usuário atualizado com sucesso.
- **404**: Usuário não encontrado.
- **500**: Erro ao atualizar usuário.

---

### delete

```typescript
public async delete(req: Request, res: Response): Promise<Response>
```

Remove um usuário do sistema, marcando-o como removido.

#### Parâmetros

- `req`: Objeto de requisição que contém o ID do usuário a ser removido.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200**: Usuário removido com sucesso.
- **404**: Usuário não encontrado.
- **500**: Erro ao remover usuário.

---

### getUsuarioDetalhes

```typescript
public async getUsuarioDetalhes(req: Request, res: Response): Promise<void>
```

Obtém detalhes sobre os alimentos consumidos por um usuário em um dia específico.

#### Parâmetros

- `req`: Objeto de requisição que contém o ID do usuário.
- `res`: Objeto de resposta para enviar os detalhes dos alimentos.

#### Respostas

- **200**: Detalhes dos alimentos consumidos pelo usuário.
- **404**: Usuário não encontrado.
- **500**: Erro ao buscar informações do usuário.