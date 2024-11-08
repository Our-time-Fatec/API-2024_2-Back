
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

- `userId` (string): ID do usuário cujas dietas devem ser listadas.
- `diaSemana` (string, opcional): Dia da semana para filtrar as dietas.

#### Respostas

- **200 OK**: Retorna a lista de dietas.
- **400 Bad Request**: Retorna mensagem de erro se `userId` ou `diaSemana` forem inválidos.
- **500 Internal Server Error**: Retorna mensagem de erro em caso de falha no servidor.

### listarHoje

```typescript
static async listarHoje(req: Request, res: Response): Promise<Response>
```

Este método lista as dietas do dia atual para um usuário específico.

#### Parâmetros

- `userId` (string): ID do usuário cujas dietas devem ser listadas.

#### Respostas

- **200 OK**: Retorna a lista de dietas do dia atual.
- **400 Bad Request**: Retorna mensagem de erro se `userId` for inválido.
- **500 Internal Server Error**: Retorna mensagem de erro em caso de falha no servidor.

### listarHojeFormatado

```typescript
static async listarHojeFormatado(req: Request, res: Response): Promise<Response>
```

Este método lista as dietas do dia atual e as formata para uma melhor apresentação.

#### Parâmetros

- `userId` (string): ID do usuário cujas dietas devem ser listadas.

#### Respostas

- **200 OK**: Retorna a lista de dietas do dia atual formatadas.
- **400 Bad Request**: Retorna mensagem de erro se `userId` for inválido.
- **500 Internal Server Error**: Retorna mensagem de erro em caso de falha no servidor.

### buscarDietaPorId

```typescript
static async buscarDietaPorId(req: Request, res: Response): Promise<Response>
```

Este método busca uma dieta específica pelo seu ID.

#### Parâmetros

- `id` (string): ID da dieta a ser buscada.

#### Respostas

- **200 OK**: Retorna a dieta encontrada.
- **400 Bad Request**: Retorna mensagem de erro se o ID da dieta não for fornecido.
- **403 Forbidden**: Retorna mensagem de erro se o usuário não tiver permissão para visualizar a dieta.
- **404 Not Found**: Retorna mensagem de erro se a dieta não for encontrada.
- **500 Internal Server Error**: Retorna mensagem de erro em caso de falha no servidor.
