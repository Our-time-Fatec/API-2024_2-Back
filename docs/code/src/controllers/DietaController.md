
---
title: DietaController
description: 'Controlador responsável pela gestão das dietas, incluindo criação, atualização, listagem e remoção.'
---

# DietaController

O `DietaController` é responsável por gerenciar as operações relacionadas às dietas no sistema. Ele fornece métodos para criar, atualizar, listar, remover e buscar dietas específicas. Abaixo estão os métodos disponíveis e suas funcionalidades.

## Métodos

### criarDieta

```typescript
static async criarDieta(req: Request, res: Response): Promise<Response>
```

Cria uma nova dieta para um usuário em dias da semana especificados. 

#### Parâmetros

- `req.body`: Deve conter os seguintes campos:
  - `userId`: ID do usuário.
  - `diaSemana`: Dia(s) da semana para a dieta.
  - `grupos`: Grupos de alimentos associados à dieta.

#### Respostas

- **201**: Dietas criadas com sucesso.
- **400**: Parâmetros inválidos ou já existe dieta para os dias fornecidos.
- **500**: Erro interno ao processar a solicitação.

---

### atualizarDieta

```typescript
static async atualizarDieta(req: Request, res: Response): Promise<Response>
```

Atualiza uma dieta existente para um usuário.

#### Parâmetros

- `req.params.id`: ID da dieta a ser atualizada.
- `req.body`: Deve conter os seguintes campos:
  - `userId`: ID do usuário.
  - `diaSemana`: Novo dia da semana para a dieta.
  - `grupos`: Novos grupos de alimentos associados à dieta.

#### Respostas

- **200**: Dieta atualizada com sucesso.
- **400**: Parâmetros inválidos ou já existe uma dieta para o dia da semana.
- **404**: Dieta não encontrada.
- **403**: Permissão negada para atualizar a dieta.
- **500**: Erro interno ao processar a solicitação.

---

### listarDietas

```typescript
static async listarDietas(req: Request, res: Response): Promise<Response>
```

Lista todas as dietas de um usuário, com a opção de filtrar por dia da semana.

#### Parâmetros

- `req.body`: Deve conter o campo:
  - `userId`: ID do usuário.
- `req.query`: Pode conter o campo opcional:
  - `diaSemana`: Dia da semana para filtrar as dietas.

#### Respostas

- **200**: Lista de dietas retornada com sucesso.
- **400**: Parâmetro `userId` ausente ou inválido.
- **500**: Erro interno ao listar as dietas.

---

### removerDieta

```typescript
static async removerDieta(req: Request, res: Response): Promise<Response>
```

Remove uma dieta existente.

#### Parâmetros

- `req.params.id`: ID da dieta a ser removida.
- `req.body`: Deve conter o campo:
  - `userId`: ID do usuário.

#### Respostas

- **200**: Dieta removida com sucesso.
- **400**: Parâmetros inválidos ou ausentes.
- **404**: Dieta não encontrada.
- **403**: Permissão negada para remover a dieta.
- **500**: Erro interno ao processar a solicitação.

---

### buscarDietaPorId

```typescript
static async buscarDietaPorId(req: Request, res: Response): Promise<Response>
```

Busca uma dieta específica pelo ID.

#### Parâmetros

- `req.params.id`: ID da dieta a ser buscada.
- `req.body`: Deve conter o campo:
  - `userId`: ID do usuário.

#### Respostas

- **200**: Dieta encontrada e retornada com sucesso.
- **400**: ID da dieta é necessário.
- **404**: Dieta não encontrada ou já removida.
- **403**: Permissão negada para visualizar a dieta.
- **500**: Erro interno ao buscar a dieta.
