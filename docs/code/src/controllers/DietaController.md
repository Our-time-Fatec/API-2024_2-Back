
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

Cria uma nova dieta para um usuário. Verifica se os parâmetros obrigatórios estão presentes e se já existe uma dieta para os dias da semana fornecidos.

**Parâmetros:**
- `req.body`: Deve conter `userId`, `diaSemana` e `grupos`.

**Retorno:**
- `201`: Dietas criadas com sucesso.
- `400`: Parâmetros inválidos ou já existe dieta para os dias fornecidos.
- `500`: Erro interno.

### atualizarDieta

```typescript
static async atualizarDieta(req: Request, res: Response): Promise<Response>
```

Atualiza uma dieta existente. Verifica se o usuário tem permissão para atualizar a dieta e se não existe outra dieta para o mesmo dia da semana.

**Parâmetros:**
- `req.params.id`: ID da dieta a ser atualizada.
- `req.body`: Deve conter `userId`, `diaSemana` e `grupos`.

**Retorno:**
- `200`: Dieta atualizada com sucesso.
- `400`: Parâmetros inválidos ou já existe dieta para o dia fornecido.
- `404`: Dieta não encontrada.
- `500`: Erro interno.

### listarDietas

```typescript
static async listarDietas(req: Request, res: Response): Promise<Response>
```

Lista todas as dietas de um usuário. Permite filtrar por dia da semana.

**Parâmetros:**
- `req.body`: Deve conter `userId`.
- `req.query`: Pode conter `diaSemana`.

**Retorno:**
- `200`: Lista de dietas.
- `400`: Parâmetros inválidos.
- `500`: Erro interno.

### removerDieta

```typescript
static async removerDieta(req: Request, res: Response): Promise<Response>
```

Remove uma dieta existente. Verifica se o usuário tem permissão para remover a dieta.

**Parâmetros:**
- `req.params.id`: ID da dieta a ser removida.
- `req.body`: Deve conter `userId`.

**Retorno:**
- `200`: Dieta removida com sucesso.
- `400`: Parâmetros inválidos.
- `404`: Dieta não encontrada.
- `500`: Erro interno.

### buscarDietaPorId

```typescript
static async buscarDietaPorId(req: Request, res: Response): Promise<Response>
```

Busca uma dieta específica pelo ID. Verifica se o usuário tem permissão para visualizar a dieta.

**Parâmetros:**
- `req.params.id`: ID da dieta a ser buscada.
- `req.body`: Deve conter `userId`.

**Retorno:**
- `200`: Dieta encontrada.
- `400`: ID da dieta é necessário.
- `404`: Dieta não encontrada ou já removida.
- `500`: Erro interno.
