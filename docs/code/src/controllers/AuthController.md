---
title: AuthController
description: 'Controlador de autenticação que gerencia login e refresh de tokens JWT.'
---

# AuthController

O `AuthController` é responsável por gerenciar a autenticação de usuários, incluindo o login e a renovação de tokens JWT. Ele utiliza o modelo `Usuario` para verificar credenciais e gerar tokens de acesso e refresh.

## Dependências

- `express`: Para manipulação de requisições e respostas HTTP.
- `jsonwebtoken`: Para criação e verificação de tokens JWT.
- `mongoose`: Para interações com o banco de dados MongoDB.
- `dotenv`: Para gerenciar variáveis de ambiente.

## Variáveis de Ambiente

O controlador utiliza as seguintes variáveis de ambiente:

- `JWT_SECRET`: Chave secreta para assinatura de tokens JWT.
- `JWT_SECRET_REFRESH`: Chave secreta para assinatura de tokens de refresh.

## Funções

### `generateToken(userId: Types.ObjectId, email: string)`

Gera um token JWT para um usuário.

#### Parâmetros

- `userId`: ID do usuário.
- `email`: Email do usuário.

#### Retorno

- Um token JWT assinado.

### `generateRefreshToken(userId: Types.ObjectId, email: string)`

Gera um token de refresh para um usuário.

#### Parâmetros

- `userId`: ID do usuário.
- `email`: Email do usuário.

#### Retorno

- Um token de refresh assinado.

## Métodos

### `login(req: Request, res: Response): Promise<void>`

Realiza o login do usuário.

#### Parâmetros

- `req`: Objeto de requisição que contém o email e a senha do usuário.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200**: Login realizado com sucesso, retorna os dados do usuário e tokens.
- **400**: E-mail e senha são obrigatórios.
- **401**: Usuário não encontrado ou credenciais inválidas.
- **500**: Erro no servidor.

### `refresh(req: Request, res: Response): Promise<Response>`

Renova o token JWT utilizando um refresh token.

#### Parâmetros

- `req`: Objeto de requisição que contém o refresh token.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200**: Retorna um novo token JWT e, opcionalmente, um novo refresh token.
- **401**: Refresh token não fornecido.
- **403**: Refresh token inválido ou expirado.

## Exemplo de Uso

```javascript
// Exemplo de login
app.post('/login', authController.login);

// Exemplo de refresh token
app.post('/refresh', authController.refresh);
```

## Considerações Finais

O `AuthController` é uma parte fundamental do sistema de autenticação, garantindo que apenas usuários válidos possam acessar recursos protegidos. É importante garantir que as chaves secretas sejam mantidas em segurança e que as práticas recomendadas de segurança sejam seguidas ao lidar com autenticação e tokens.