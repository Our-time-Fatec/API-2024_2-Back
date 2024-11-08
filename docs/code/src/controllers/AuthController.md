---
title: AuthController
description: 'Controlador de autenticação que gerencia login e refresh de tokens.'
---

# AuthController

O `AuthController` é responsável por gerenciar a autenticação de usuários, incluindo o login e a geração de tokens JWT (JSON Web Tokens) e refresh tokens. Este controlador utiliza o modelo `Usuario` para verificar credenciais e gerar tokens de acesso.

## Dependências

- `express`: Para manipulação de requisições e respostas HTTP.
- `jsonwebtoken`: Para criação e verificação de tokens JWT.
- `mongoose`: Para interações com o banco de dados MongoDB.
- `dotenv`: Para gerenciar variáveis de ambiente.

## Variáveis de Ambiente

O controlador utiliza as seguintes variáveis de ambiente:

- `JWT_SECRET`: Chave secreta para assinatura do token JWT.
- `JWT_SECRET_REFRESH`: Chave secreta para assinatura do refresh token.
- `JWT_EXPIRES_IN`: Tempo de expiração do token JWT (padrão: 1 dia).
- `REFRESH_EXPIRES_IN`: Tempo de expiração do refresh token (padrão: 30 dias).

## Métodos

### `login(req: Request, res: Response): Promise<void>`

Realiza o login do usuário.

#### Parâmetros

- `req`: Objeto da requisição que contém o corpo com `email` e `senha`.
- `res`: Objeto da resposta para enviar os resultados.

#### Respostas

- **200**: Login realizado com sucesso, retorna os dados do usuário (sem a senha) e os tokens.
- **400**: E-mail e senha são obrigatórios.
- **401**: Usuário não encontrado ou credenciais inválidas.
- **500**: Erro no servidor.

### `refresh(req: Request, res: Response): Promise<Response>`

Gera um novo token JWT utilizando um refresh token válido.

#### Parâmetros

- `req`: Objeto da requisição que contém o corpo com `refreshToken`.
- `res`: Objeto da resposta para enviar os resultados.

#### Respostas

- **200**: Retorna um novo token JWT e, opcionalmente, um novo refresh token.
- **401**: Refresh token não fornecido.
- **403**: Refresh token inválido ou expirado.

## Funções Auxiliares

### `generateToken(userId: Types.ObjectId, email: string)`

Gera um token JWT para um usuário específico.

### `generateRefreshToken(userId: Types.ObjectId, email: string)`

Gera um refresh token para um usuário específico.