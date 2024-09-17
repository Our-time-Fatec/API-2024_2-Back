---
title: CategoriaController
description: 'Controlador responsável pela manipulação das categorias no sistema.'
---

# CategoriaController

O `CategoriaController` é responsável por gerenciar as operações relacionadas às categorias no sistema. Ele utiliza o modelo `Categoria` para interagir com o banco de dados e fornece métodos para listar as categorias disponíveis.

## Métodos

### list

```typescript
async list(req: Request, res: Response): Promise<Response>
```

O método `list` é responsável por recuperar todas as categorias que não foram removidas. Ele responde com um status HTTP 200 e um JSON contendo a lista de categorias, ou um status HTTP 500 em caso de erro.

#### Parâmetros

- `req`: O objeto de requisição do Express.
- `res`: O objeto de resposta do Express.

#### Respostas

- **200 OK**: Retorna um JSON com a lista de categorias.
- **500 Internal Server Error**: Retorna um JSON com uma mensagem de erro caso ocorra uma falha ao listar as categorias.