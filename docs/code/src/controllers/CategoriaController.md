---
title: CategoriaController
description: 'Controlador responsável pela manipulação das categorias no sistema.'
---

# CategoriaController

O `CategoriaController` é responsável por gerenciar as operações relacionadas às categorias no sistema. Ele utiliza o modelo `Categoria` para interagir com o banco de dados e fornece métodos para listar as categorias.

## Métodos

### list

```typescript
async list(req: Request, res: Response): Promise<Response>
```

O método `list` é responsável por recuperar todas as categorias que não foram marcadas como removidas. Ele responde com um status HTTP 200 e uma lista de categorias em formato JSON. Em caso de erro, retorna um status HTTP 500 com uma mensagem de erro.

#### Parâmetros

- `req`: Objeto de requisição do Express.
- `res`: Objeto de resposta do Express.

#### Exemplo de Uso

```typescript
// Exemplo de chamada ao método list
const categorias = await categoriaController.list(req, res);
```

## Tratamento de Erros

Caso ocorra um erro durante a execução do método `list`, o controlador retornará uma resposta com status 500 e uma mensagem de erro, permitindo que o cliente saiba que houve um problema ao tentar listar as categorias.