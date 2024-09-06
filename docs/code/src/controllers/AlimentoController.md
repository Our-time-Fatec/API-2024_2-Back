---
title: AlimentoController
description: 'Controlador responsável pela manipulação de dados relacionados a alimentos, incluindo criação, listagem, atualização e exclusão.'
---

# AlimentoController

O `AlimentoController` é uma classe que gerencia as operações relacionadas aos alimentos em uma aplicação Express. Ele fornece métodos para criar, listar, buscar, atualizar e deletar alimentos, além de filtrar alimentos por usuário.

## Métodos

### create

```typescript
async create(req: Request, res: Response): Promise<Response>
```

Cria um novo alimento. O método espera que os dados do alimento sejam enviados no corpo da requisição.

#### Parâmetros

- `req`: Objeto da requisição que contém os dados do alimento.
- `res`: Objeto da resposta que será enviado ao cliente.

#### Respostas

- **201**: Alimento criado com sucesso.
- **404**: Usuário não encontrado.
- **500**: Erro ao criar alimento.

---

### listAlimentos

```typescript
async listAlimentos(req: Request, res: Response): Promise<Response>
```

Lista os alimentos, com suporte à paginação e filtragem por categoria.

#### Parâmetros

- `req`: Objeto da requisição que pode conter parâmetros de paginação e filtro.
- `res`: Objeto da resposta que será enviado ao cliente.

#### Respostas

- **200**: Lista de alimentos com informações de categoria.
- **500**: Erro ao listar alimentos.

---

### findAlimentoById

```typescript
async findAlimentoById(req: Request, res: Response): Promise<Response>
```

Busca um alimento específico pelo seu ID.

#### Parâmetros

- `req`: Objeto da requisição que contém o ID do alimento.
- `res`: Objeto da resposta que será enviado ao cliente.

#### Respostas

- **200**: Alimento encontrado com informações de categoria.
- **404**: Alimento não encontrado.
- **500**: Erro ao buscar alimento.

---

### update

```typescript
async update(req: Request, res: Response): Promise<Response>
```

Atualiza os dados de um alimento existente.

#### Parâmetros

- `req`: Objeto da requisição que contém o ID do alimento e os novos dados.
- `res`: Objeto da resposta que será enviado ao cliente.

#### Respostas

- **200**: Alimento atualizado com sucesso.
- **404**: Alimento não encontrado.
- **403**: Permissão negada para editar o alimento.
- **500**: Erro ao editar alimento.

---

### delete

```typescript
async delete(req: Request, res: Response): Promise<Response>
```

Deleta um alimento existente.

#### Parâmetros

- `req`: Objeto da requisição que contém o ID do alimento.
- `res`: Objeto da resposta que será enviado ao cliente.

#### Respostas

- **200**: Alimento deletado com sucesso.
- **404**: Alimento não encontrado.
- **403**: Permissão negada para deletar o alimento.
- **500**: Erro ao deletar alimento.

---

### findAlimentosByUser

```typescript
async findAlimentosByUser(req: Request, res: Response): Promise<Response>
```

Lista os alimentos criados por um usuário específico, com suporte à paginação e filtragem por categoria.

#### Parâmetros

- `req`: Objeto da requisição que pode conter parâmetros de paginação e filtro.
- `res`: Objeto da resposta que será enviado ao cliente.

#### Respostas

- **200**: Lista de alimentos do usuário com informações de categoria.
- **500**: Erro ao listar alimentos.