
---
title: AlimentoConsumidoController
description: 'Controlador para gerenciar alimentos consumidos, incluindo criação, listagem e deleção.'
---

# AlimentoConsumidoController

O `AlimentoConsumidoController` é responsável por gerenciar as operações relacionadas aos alimentos consumidos pelos usuários. Ele fornece métodos para criar, listar e deletar registros de alimentos consumidos, além de manipular a dieta diária associada a cada usuário.

## Métodos

### create

```typescript
async create(req: Request, res: Response): Promise<Response>
```

Cria um novo registro de alimento consumido. O método verifica se todos os campos necessários estão preenchidos e se o usuário e o alimento existem. Em seguida, calcula os detalhes nutricionais com base na proporção e quantidade informadas.

#### Parâmetros

- `req`: Objeto de requisição que contém os dados do alimento consumido.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **201 Created**: Retorna o alimento consumido salvo.
- **401 Unauthorized**: Retorna mensagem de erro se os campos obrigatórios não forem preenchidos.
- **404 Not Found**: Retorna mensagem de erro se o usuário ou alimento não forem encontrados.
- **500 Internal Server Error**: Retorna mensagem de erro em caso de falha no servidor.

### listAlimentosConsumidos

```typescript
async listAlimentosConsumidos(req: Request, res: Response): Promise<Response>
```

Lista todos os alimentos consumidos pelo usuário, com suporte à paginação.

#### Parâmetros

- `req`: Objeto de requisição que contém os parâmetros de paginação.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200 OK**: Retorna a lista de alimentos consumidos com informações de categoria.
- **500 Internal Server Error**: Retorna mensagem de erro em caso de falha no servidor.

### listAlimentosConsumidosSemana

```typescript
public async listAlimentosConsumidosSemana(req: Request, res: Response): Promise<Response>
```

Lista os alimentos consumidos na semana atual, organizando-os por dia da semana.

#### Parâmetros

- `req`: Objeto de requisição que contém o ID do usuário.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200 OK**: Retorna os alimentos consumidos organizados por dia da semana.
- **500 Internal Server Error**: Retorna mensagem de erro em caso de falha no servidor.

### delete

```typescript
async delete(req: Request, res: Response): Promise<Response>
```

Deleta um registro de alimento consumido. O método verifica se o usuário tem permissão para deletar o alimento.

#### Parâmetros

- `req`: Objeto de requisição que contém o ID do alimento a ser deletado.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200 OK**: Retorna mensagem de sucesso ao deletar o alimento.
- **404 Not Found**: Retorna mensagem de erro se o alimento não for encontrado.
- **403 Forbidden**: Retorna mensagem de erro se o usuário não tiver permissão para deletar o alimento.
- **500 Internal Server Error**: Retorna mensagem de erro em caso de falha no servidor.

### findAndDelete

```typescript
async findAndDelete(req: Request, res: Response): Promise<Response>
```

Procura e deleta um alimento consumido específico, reduzindo sua quantidade ou marcando-o como removido se a quantidade chegar a zero.

#### Parâmetros

- `req`: Objeto de requisição que contém os dados do alimento a ser encontrado e deletado.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200 OK**: Retorna mensagem de sucesso ao atualizar o alimento consumido.
- **404 Not Found**: Retorna mensagem de erro se o alimento não for encontrado.
- **403 Forbidden**: Retorna mensagem de erro se o usuário não tiver permissão para modificar o alimento consumido.
- **500 Internal Server Error**: Retorna mensagem de erro em caso de falha no servidor.
