---
title: authMiddleware
description: 'Middleware para autenticação de usuários utilizando JWT.'
---

# authMiddleware

O `authMiddleware` é um middleware para autenticação de usuários em uma aplicação Express. Ele utiliza JSON Web Tokens (JWT) para verificar a autenticidade das requisições.

## Funcionamento

1. **Recepção do Token**: O middleware tenta obter o token JWT do cabeçalho `Authorization` da requisição.
2. **Verificação do Token**: Se o token não for fornecido, uma resposta com status 401 (Não Autorizado) é enviada. Caso o token seja fornecido, ele é verificado utilizando a chave secreta definida na variável de ambiente `JWT_SECRET`.
3. **Decodificação do Token**: Se a verificação for bem-sucedida, o ID do usuário é extraído do token decodificado e adicionado ao corpo da requisição (`req.body.userId`).
4. **Continuação do Fluxo**: O middleware chama `next()` para passar o controle para o próximo middleware ou rota.

## Exemplo de Uso

```typescript
import express from 'express';
import authMiddleware from './middlewares/authMiddleware';

const app = express();

app.use(authMiddleware);

app.get('/protected-route', (req, res) => {
    res.send(`Usuário ID: ${req.body.userId}`);
});
```

## Dependências

- `jsonwebtoken`: Biblioteca para manipulação de JSON Web Tokens.
- `express`: Framework web para Node.js.

## Variáveis de Ambiente

- `JWT_SECRET`: Chave secreta utilizada para assinar e verificar os tokens JWT. Se não estiver definida, o valor padrão será `'secretKey'`.