
---
title: UsuarioController
description: 'Controlador responsável pela gestão de usuários, incluindo criação, atualização, listagem e remoção.'
---

# UsuarioController

O `UsuarioController` é responsável por gerenciar as operações relacionadas aos usuários no sistema. Ele fornece métodos para criar, listar, obter detalhes, atualizar e remover usuários, além de gerenciar a atualização de informações específicas, como a ingestão de água e a redefinição de senhas.

## Métodos

### create

```typescript
public async create(req: Request, res: Response): Promise<Response>
```

Cria um novo usuário com os dados fornecidos no corpo da requisição. Realiza validações de e-mail e senha, e retorna um token de autenticação.

#### Parâmetros

- `req`: Objeto da requisição que contém os dados do usuário.
- `res`: Objeto da resposta para enviar o resultado da operação.

#### Respostas

- `201`: Usuário criado com sucesso.
- `400`: Erros de validação (e-mail já em uso, senha inválida).
- `401`: E-mail e senha não fornecidos.
- `500`: Erro interno do servidor.

---

### list

```typescript
public async list(_: Request, res: Response): Promise<void>
```

Lista todos os usuários ativos no sistema.

#### Parâmetros

- `res`: Objeto da resposta para enviar a lista de usuários.

#### Respostas

- `200`: Lista de usuários.
- `500`: Erro ao listar usuários.

---

### getUsuario

```typescript
public async getUsuario(req: Request, res: Response): Promise<void>
```

Obtém os detalhes de um usuário específico com base no ID fornecido.

#### Parâmetros

- `req`: Objeto da requisição que contém o ID do usuário.
- `res`: Objeto da resposta para enviar os detalhes do usuário.

#### Respostas

- `200`: Detalhes do usuário.
- `404`: Usuário não encontrado.
- `500`: Erro ao buscar informações do usuário.

---

### update

```typescript
public async update(req: Request, res: Response): Promise<Response>
```

Atualiza as informações de um usuário existente.

#### Parâmetros

- `req`: Objeto da requisição que contém os dados atualizados do usuário.
- `res`: Objeto da resposta para enviar o resultado da operação.

#### Respostas

- `200`: Usuário atualizado com sucesso.
- `404`: Usuário não encontrado.
- `500`: Erro ao atualizar usuário.

---

### delete

```typescript
public async delete(req: Request, res: Response): Promise<Response>
```

Remove um usuário do sistema, marcando-o como removido.

#### Parâmetros

- `req`: Objeto da requisição que contém o ID do usuário.
- `res`: Objeto da resposta para enviar o resultado da operação.

#### Respostas

- `200`: Usuário removido com sucesso.
- `404`: Usuário não encontrado.
- `500`: Erro ao remover usuário.

---

### getUsuarioDetalhes

```typescript
public async getUsuarioDetalhes(req: Request, res: Response): Promise<void>
```

Obtém detalhes adicionais sobre um usuário, incluindo informações sobre a ingestão de água e alimentos consumidos.

#### Parâmetros

- `req`: Objeto da requisição que contém o ID do usuário.
- `res`: Objeto da resposta para enviar os detalhes do usuário.

#### Respostas

- `200`: Detalhes do usuário, incluindo totais de alimentos consumidos.
- `404`: Usuário não encontrado.
- `500`: Erro ao buscar informações do usuário.

---

### atualzarAgua

```typescript
public async atualzarAgua(req: Request, res: Response): Promise<Response>
```

Atualiza a quantidade de água ingerida por um usuário.

#### Parâmetros

- `req`: Objeto da requisição que contém a quantidade de água e o ID do usuário.
- `res`: Objeto da resposta para enviar o resultado da operação.

#### Respostas

- `200`: Quantidade de água atualizada com sucesso.
- `404`: Usuário não encontrado.
- `500`: Erro ao atualizar a quantidade de água.

---

### zerarAgua

```typescript
public async zerarAgua(req: Request, res: Response): Promise<Response>
```

Zera a quantidade de água ingerida por um usuário.

#### Parâmetros

- `req`: Objeto da requisição que contém o ID do usuário.
- `res`: Objeto da resposta para enviar o resultado da operação.

#### Respostas

- `200`: Quantidade de água zerada com sucesso.
- `404`: Usuário não encontrado.
- `500`: Erro ao zerar a quantidade de água.

---

### editPassword

```typescript
public async editPassword(req: Request, res: Response): Promise<Response>
```

Atualiza a senha de um usuário com base no link de redefinição fornecido.

#### Parâmetros

- `req`: Objeto da requisição que contém a nova senha e o link de redefinição.
- `res`: Objeto da resposta para enviar o resultado da operação.

#### Respostas

- `200`: Senha atualizada com sucesso.
- `400`: Erros de validação (senha não fornecida, inválida).
- `404`: Usuário não encontrado.
- `500`: Erro ao atualizar a senha.

---

### verificarEmail

```typescript
public async verificarEmail(req: Request, res: Response): Promise<Response>
```

Verifica se um e-mail está registrado no sistema e envia um e-mail de redefinição de senha, se necessário.

#### Parâmetros

- `req`: Objeto da requisição que contém o e-mail e o link de redefinição.
- `res`: Objeto da resposta para enviar o resultado da operação.

#### Respostas

- `200`: E-mail existe.
- `404`: E-mail não encontrado.
- `500`: Erro ao verificar o e-mail.
