---
title: authMiddleware
description: 'Middleware para autenticação de usuários utilizando JWT.'
---

# authMiddleware

O `authMiddleware` é um middleware para autenticação de usuários em uma aplicação Express, utilizando JSON Web Tokens (JWT). Ele verifica se um token de autenticação foi fornecido e se é válido, permitindo o acesso às rotas protegidas.

## Importações

O middleware utiliza as seguintes bibliotecas:

- `jsonwebtoken`: Para verificar a validade do token JWT.
- `express`: Para manipulação de requisições e respostas.

## Configuração do JWT

O segredo utilizado para assinar os tokens JWT é obtido a partir da variável de ambiente `JWT_SECRET`. Caso essa variável não esteja definida, um valor padrão `'secretKey'` é utilizado.

## Funcionamento

1. **Recepção do Token**: O middleware tenta obter o token do cabeçalho `Authorization` da requisição.
2. **Verificação do Token**:
   - Se o token não for fornecido, uma resposta com status `401` (Não Autorizado) é retornada, junto com uma mensagem informando que o token não foi fornecido.
   - Se o token for fornecido, ele é verificado utilizando a função `jwt.verify()`.
     - Se a verificação falhar, uma resposta com status `403` (Proibido) é retornada, informando que o token é inválido.
3. **Acesso ao ID do Usuário**: Se o token for válido, o ID do usuário é extraído do token decodificado e adicionado ao corpo da requisição (`req.body.userId`), permitindo que as rotas subsequentes acessem essa informação.
4. **Chamada do Próximo Middleware**: O middleware chama `next()` para passar o controle para o próximo middleware ou rota.

## Exemplo de Uso

Para utilizar o `authMiddleware`, basta importá-lo e aplicá-lo nas rotas que requerem autenticação:

```typescript
import authMiddleware from './middlewares/authMiddleware';

app.use('/api/protected-route', authMiddleware, (req, res) => {
    res.send('Acesso permitido!');
});
```

## Exportação

O middleware é exportado como padrão para ser utilizado em outras partes da aplicação.