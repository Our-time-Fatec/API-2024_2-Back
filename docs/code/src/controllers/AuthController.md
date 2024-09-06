---
title: AuthController
description: 'Controlador de autenticação que gerencia login e refresh de tokens.'
---

# AuthController

O `AuthController` é responsável por gerenciar a autenticação de usuários, incluindo o login e a renovação de tokens JWT. Ele utiliza o modelo de usuário e funções de criptografia para validar credenciais e gerar tokens de acesso.

## Dependências

- `express`: Para manipulação de requisições e respostas HTTP.
- `jsonwebtoken`: Para criação e verificação de tokens JWT.
- `mongoose`: Para interações com o banco de dados MongoDB.
- `criptografia`: Módulo utilitário para verificar senhas.

## Variáveis de Ambiente

- `JWT_SECRET`: Chave secreta para assinatura de tokens JWT.
- `REFRESH_SECRET`: Chave secreta para assinatura de tokens de refresh.
- `JWT_EXPIRES_IN`: Tempo de expiração do token JWT (padrão: 1 dia).
- `REFRESH_EXPIRES_IN`: Tempo de expiração do token de refresh (padrão: 30 dias).

## Métodos

### `login(req: Request, res: Response): Promise<void>`

Realiza o login do usuário.

#### Parâmetros

- `req`: Objeto de requisição que contém o corpo com `email` e `senha`.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200**: Login realizado com sucesso, retorna os dados do usuário (sem a senha) e os tokens.
- **400**: E-mail e senha são obrigatórios.
- **401**: Usuário não encontrado ou credenciais inválidas.
- **500**: Erro no servidor.

### `refresh(req: Request, res: Response): Promise<Response>`

Renova o token de acesso utilizando um refresh token.

#### Parâmetros

- `req`: Objeto de requisição que contém o corpo com `refreshToken`.
- `res`: Objeto de resposta para enviar a resposta ao cliente.

#### Respostas

- **200**: Retorna um novo token de acesso e, opcionalmente, um novo refresh token.
- **401**: Refresh token não fornecido.
- **403**: Refresh token inválido ou expirado.

## Funções Internas

### `generateToken(userId: Types.ObjectId, email: string)`

Gera um token JWT para o usuário.

### `generateRefreshToken(userId: Types.ObjectId, email: string)`

Gera um token de refresh para o usuário.

## Exemplo de Uso

```javascript
// Exemplo de requisição de login
const response = await authController.login(req, res);
```

## Considerações Finais

O `AuthController` é uma parte fundamental do sistema de autenticação, garantindo que apenas usuários válidos possam acessar recursos protegidos. É importante manter as chaves secretas seguras e considerar a implementação de políticas adicionais de segurança, como a expiração de tokens e a revogação de refresh tokens.