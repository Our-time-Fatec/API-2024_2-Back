---
title: DietaDiariaController
description: 'Controlador para gerenciar as dietas diárias dos usuários, incluindo listagem e busca de dietas.'
---

# DietaDiariaController

O `DietaDiariaController` é responsável por gerenciar as operações relacionadas às dietas diárias dos usuários. Ele fornece métodos para listar dietas, buscar dietas por ID e formatar as dietas de forma adequada.

## Métodos

### listarDietas

```typescript
static async listarDietas(req: Request, res: Response): Promise<Response>
```

Este método lista as dietas diárias de um usuário específico. Ele aceita um `userId` no corpo da requisição e um `diaSemana` como parâmetro de consulta.

#### Parâmetros

- `userId`: ID do usuário (obrigatório).
- `diaSemana`: Dia da semana para filtrar as dietas (opcional).

#### Respostas

- **200 OK**: Retorna a lista de dietas.
- **400 Bad Request**: Retorna erro se `userId` estiver ausente ou inválido, ou se `diaSemana` for inválido.
- **500 Internal Server Error**: Retorna erro em caso de falha ao listar as dietas.

### listarHoje

```typescript
static async listarHoje(req: Request, res: Response): Promise<Response>
```

Este método lista as dietas do dia atual para um usuário específico.

#### Parâmetros

- `userId`: ID do usuário (obrigatório).

#### Respostas

- **200 OK**: Retorna a lista de dietas do dia atual.
- **400 Bad Request**: Retorna erro se `userId` estiver ausente ou inválido.
- **500 Internal Server Error**: Retorna erro em caso de falha ao listar as dietas.

### listarHojeFormatado

```typescript
static async listarHojeFormatado(req: Request, res: Response): Promise<Response>
```

Este método lista as dietas do dia atual e formata a resposta, incluindo informações sobre os grupos de alimentos.

#### Parâmetros

- `userId`: ID do usuário (obrigatório).

#### Respostas

- **200 OK**: Retorna a lista de dietas do dia atual formatadas.
- **400 Bad Request**: Retorna erro se `userId` estiver ausente ou inválido.
- **500 Internal Server Error**: Retorna erro em caso de falha ao listar as dietas.

### buscarDietaPorId

```typescript
static async buscarDietaPorId(req: Request, res: Response): Promise<Response>
```

Este método busca uma dieta específica pelo seu ID.

#### Parâmetros

- `id`: ID da dieta (obrigatório, passado na URL).
- `userId`: ID do usuário (obrigatório, passado no corpo da requisição).

#### Respostas

- **200 OK**: Retorna a dieta encontrada.
- **400 Bad Request**: Retorna erro se o ID da dieta estiver ausente.
- **404 Not Found**: Retorna erro se a dieta não for encontrada ou já tiver sido removida.
- **403 Forbidden**: Retorna erro se o usuário não tiver permissão para visualizar a dieta.
- **500 Internal Server Error**: Retorna erro em caso de falha ao buscar a dieta.