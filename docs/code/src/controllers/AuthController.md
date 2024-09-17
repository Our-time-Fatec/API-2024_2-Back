---
title: AuthController
description: 'Controlador de autenticação que gerencia login e refresh de tokens.'
---

# AuthController

O `AuthController` é responsável por gerenciar a autenticação de usuários, incluindo o login e a renovação de tokens JWT. Ele utiliza o modelo de usuário e funções utilitárias para criptografia e geração de tokens.

## Dependências

- `express`: Para manipulação de requisições e respostas HTTP.
- `jsonwebtoken`: Para criação e verificação de tokens JWT.
- `mongoose`: Para interações com o banco de dados MongoDB.
- `criptografia`: Funções utilitárias para manipulação de senhas.

## Variáveis de Ambiente

- `JWT_SECRET`: Chave secreta para assinatura de tokens JWT.
- `REFRESH_SECRET`: Chave secreta para assinatura de tokens de refresh.
- `JWT_EXPIRES_IN`: Tempo de expiração do token JWT (padrão: 1 dia).
- `REFRESH_EXPIRES_IN`: Tempo de expiração do token de refresh (padrão: 30 dias).

## Funções

### `generateToken(userId: Types.ObjectId, email: string)`

Gera um token JWT para um usuário específico.

- **Parâmetros:**
  - `userId`: ID do usuário.
  - `email`: Email do usuário.
  
- **Retorno:** Token JWT assinado.

### `generateRefreshToken(userId: Types.ObjectId, email: string)`

Gera um token de refresh para um usuário específico.

- **Parâmetros:**
  - `userId`: ID do usuário.
  - `email`: Email do usuário.
  
- **Retorno:** Token de refresh assinado.

## Métodos

### `login(req: Request, res: Response): Promise<void>`

Realiza o login do usuário.

- **Parâmetros:**
  - `req`: Objeto de requisição que contém o email e a senha do usuário.
  - `res`: Objeto de resposta para enviar a resposta ao cliente.

- **Fluxo:**
  1. Verifica se o email e a senha foram fornecidos.
  2. Busca o usuário no banco de dados.
  3. Verifica se a senha está correta.
  4. Gera e retorna o token JWT e o refresh token.

### `refresh(req: Request, res: Response): Promise<Response>`

Renova o token JWT utilizando um refresh token.

- **Parâmetros:**
  - `req`: Objeto de requisição que contém o refresh token.
  - `res`: Objeto de resposta para enviar a resposta ao cliente.

- **Fluxo:**
  1. Verifica se o refresh token foi fornecido.
  2. Decodifica e verifica o refresh token.
  3. Gera um novo token JWT e, opcionalmente, um novo refresh token.
  4. Retorna o novo token JWT e o novo refresh token.

## Exemplo de Uso

```javascript
// Exemplo de login
app.post('/login', authController.login);

// Exemplo de refresh token
app.post('/refresh', authController.refresh);
```

## Considerações Finais

O `AuthController` é uma parte fundamental do sistema de autenticação, garantindo que os usuários possam se autenticar de forma segura e que seus tokens sejam gerenciados adequadamente. É importante garantir que as chaves secretas sejam mantidas em segurança e que as senhas sejam sempre criptografadas.