
---
title: AlimentoController
description: 'Controlador responsável pela manipulação de alimentos, incluindo criação, listagem, atualização e exclusão.'
---

# AlimentoController

O `AlimentoController` é uma classe que gerencia as operações relacionadas aos alimentos em uma aplicação Express. Ele fornece métodos para criar, listar, encontrar, atualizar e deletar alimentos, além de filtrar alimentos por usuário.

## Métodos

### create

```typescript
async create(req: Request, res: Response): Promise<Response>
```

Cria um novo alimento com base nos dados fornecidos no corpo da requisição.

#### Parâmetros

- `req`: Objeto de requisição que contém os dados do alimento.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **201**: Alimento criado com sucesso.
- **404**: Usuário não encontrado.
- **500**: Erro ao criar alimento.

---

### listAlimentos

```typescript
async listAlimentos(req: Request, res: Response): Promise<Response>
```

Lista os alimentos com base em filtros opcionais, como paginação, categoria e termo de busca.

#### Parâmetros

- `req`: Objeto de requisição que pode conter parâmetros de consulta para filtragem.
- `res`: Objeto de resposta para enviar a lista de alimentos.

#### Respostas

- **200**: Lista de alimentos com informações de categoria.
- **500**: Erro ao listar alimentos.

---

### findAlimentoById

```typescript
async findAlimentoById(req: Request, res: Response): Promise<Response>
```

Encontra um alimento específico pelo seu ID.

#### Parâmetros

- `req`: Objeto de requisição que contém o ID do alimento nos parâmetros.
- `res`: Objeto de resposta para enviar o alimento encontrado.

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

- `req`: Objeto de requisição que contém o ID do alimento e os novos dados no corpo.
- `res`: Objeto de resposta para enviar o alimento atualizado.

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

Deleta um alimento específico.

#### Parâmetros

- `req`: Objeto de requisição que contém o ID do alimento nos parâmetros.
- `res`: Objeto de resposta para confirmar a exclusão.

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

Lista os alimentos criados por um usuário específico.

#### Parâmetros

- `req`: Objeto de requisição que contém o ID do usuário e parâmetros de consulta para filtragem.
- `res`: Objeto de resposta para enviar a lista de alimentos do usuário.

#### Respostas

- **200**: Lista de alimentos do usuário com informações de categoria.
- **500**: Erro ao listar alimentos.
