---
title: AlimentoConsumidoController
description: 'Controlador para gerenciar alimentos consumidos, incluindo criação, listagem e exclusão.'
---

# AlimentoConsumidoController

O `AlimentoConsumidoController` é responsável por gerenciar as operações relacionadas aos alimentos consumidos pelos usuários. Ele fornece métodos para criar, listar e deletar registros de alimentos consumidos.

## Métodos

### create

```typescript
async create(req: Request, res: Response): Promise<Response>
```

Cria um novo registro de alimento consumido. O método espera que o corpo da requisição contenha os campos `_id`, `porcao`, `quantidade` e `userId`.

#### Parâmetros

- `req`: Objeto da requisição que contém os dados do usuário e do alimento.
- `res`: Objeto da resposta que será enviado ao cliente.

#### Respostas

- **201 Created**: Retorna o alimento consumido salvo.
- **401 Unauthorized**: Retorna uma mensagem de erro se os campos obrigatórios não forem preenchidos.
- **404 Not Found**: Retorna uma mensagem de erro se o usuário ou o alimento não forem encontrados.
- **500 Internal Server Error**: Retorna uma mensagem de erro em caso de falha no servidor.

### listAlimentosConsumidos

```typescript
async listAlimentosConsumidos(req: Request, res: Response): Promise<Response>
```

Lista todos os alimentos consumidos pelo usuário. O método suporta paginação através dos parâmetros de consulta `limit` e `page`.

#### Parâmetros

- `req`: Objeto da requisição que contém o `userId` e parâmetros de consulta.
- `res`: Objeto da resposta que será enviado ao cliente.

#### Respostas

- **200 OK**: Retorna uma lista de alimentos consumidos com informações de categoria.
- **500 Internal Server Error**: Retorna uma mensagem de erro em caso de falha no servidor.

### delete

```typescript
async delete(req: Request, res: Response): Promise<Response>
```

Deleta um registro de alimento consumido. O método verifica se o usuário tem permissão para deletar o alimento.

#### Parâmetros

- `req`: Objeto da requisição que contém o `id` do alimento a ser deletado e o `userId`.
- `res`: Objeto da resposta que será enviado ao cliente.

#### Respostas

- **200 OK**: Retorna uma mensagem de sucesso ao deletar o alimento.
- **404 Not Found**: Retorna uma mensagem de erro se o alimento não for encontrado.
- **403 Forbidden**: Retorna uma mensagem de erro se o usuário não tiver permissão para deletar o alimento.
- **500 Internal Server Error**: Retorna uma mensagem de erro em caso de falha no servidor.