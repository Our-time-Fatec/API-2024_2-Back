
---
title: DietaController
description: 'Controlador responsável pela gestão das dietas, incluindo criação, atualização, listagem e remoção.'
---

# DietaController

O `DietaController` é responsável por gerenciar as operações relacionadas às dietas no sistema. Ele permite a criação, atualização, listagem, remoção e busca de dietas específicas. A seguir, são descritas as principais funcionalidades deste controlador.

## Métodos

### criarDieta

```typescript
static async criarDieta(req: Request, res: Response): Promise<Response>
```

Cria uma nova dieta para um usuário específico em um ou mais dias da semana.

#### Parâmetros

- `req.body`:
  - `userId`: ID do usuário.
  - `diaSemana`: Dia(s) da semana para a dieta.
  - `grupos`: Grupos de alimentos associados à dieta.

#### Respostas

- **201**: Dietas criadas com sucesso.
- **400**: Parâmetros inválidos ou já existe uma dieta para o dia da semana.
- **500**: Erro interno do servidor.

---

### atualizarDieta

```typescript
static async atualizarDieta(req: Request, res: Response): Promise<Response>
```

Atualiza uma dieta existente.

#### Parâmetros

- `req.params.id`: ID da dieta a ser atualizada.
- `req.body`:
  - `userId`: ID do usuário.
  - `diaSemana`: Novo dia da semana para a dieta.
  - `grupos`: Novos grupos de alimentos associados à dieta.

#### Respostas

- **200**: Dieta atualizada com sucesso.
- **400**: Parâmetros inválidos ou já existe uma dieta para o dia da semana.
- **403**: Permissão negada para atualizar a dieta.
- **404**: Dieta não encontrada.
- **500**: Erro interno do servidor.

---

### listarDietas

```typescript
static async listarDietas(req: Request, res: Response): Promise<Response>
```

Lista todas as dietas de um usuário.

#### Parâmetros

- `req.body`:
  - `userId`: ID do usuário.
- `req.query`:
  - `diaSemana`: (opcional) Dia da semana para filtrar as dietas.

#### Respostas

- **200**: Lista de dietas retornada com sucesso.
- **400**: Parâmetro `userId` ausente ou inválido.
- **500**: Erro interno do servidor.

---

### removerDieta

```typescript
static async removerDieta(req: Request, res: Response): Promise<Response>
```

Remove uma dieta existente.

#### Parâmetros

- `req.params.id`: ID da dieta a ser removida.
- `req.body`:
  - `userId`: ID do usuário.

#### Respostas

- **200**: Dieta removida com sucesso.
- **400**: Parâmetros inválidos ou ausentes.
- **403**: Permissão negada para remover a dieta.
- **404**: Dieta não encontrada.
- **500**: Erro interno do servidor.

---

### buscarDietaPorId

```typescript
static async buscarDietaPorId(req: Request, res: Response): Promise<Response>
```

Busca uma dieta específica pelo ID.

#### Parâmetros

- `req.params.id`: ID da dieta a ser buscada.
- `req.body`:
  - `userId`: ID do usuário.

#### Respostas

- **200**: Dieta encontrada e retornada com sucesso.
- **400**: ID da dieta é necessário.
- **403**: Permissão negada para visualizar a dieta.
- **404**: Dieta não encontrada ou já removida.
- **500**: Erro interno do servidor.
