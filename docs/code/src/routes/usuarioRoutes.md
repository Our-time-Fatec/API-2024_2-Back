---
title: usuarioRoutes
description: 'Definição das rotas para gerenciamento de usuários na aplicação.'
---

# usuarioRoutes

Este arquivo contém a definição das rotas relacionadas ao gerenciamento de usuários na aplicação. Utiliza o framework Express para criar as rotas e integra-se com o controlador de usuários e um middleware de autenticação.

## Estrutura das Rotas

As rotas definidas neste arquivo são as seguintes:

- `POST /`: Cria um novo usuário.
- `GET /`: Lista todos os usuários (requer autenticação).
- `GET /me`: Retorna os detalhes do usuário autenticado (requer autenticação).
- `PUT /`: Atualiza as informações do usuário autenticado (requer autenticação).
- `GET /mydetails`: Retorna detalhes adicionais do usuário autenticado (requer autenticação).
- `DELETE /`: Remove o usuário autenticado (requer autenticação).

## Importações

O arquivo importa os seguintes módulos:

- `Router` do Express para definir as rotas.
- `controller` do `UsuarioController` para manipulação das requisições.
- `authMiddleware` para proteger as rotas que requerem autenticação.

## Exemplo de Uso

Para utilizar estas rotas, você deve integrá-las ao seu aplicativo Express principal, como mostrado abaixo:

```javascript
import usuarioRoutes from './src/routes/usuarioRoutes';

const app = express();
app.use('/api/usuarios', usuarioRoutes);
```

## Considerações

As rotas que requerem autenticação utilizam o `authMiddleware`, que deve ser implementado para verificar a validade do token de autenticação antes de permitir o acesso às rotas protegidas.