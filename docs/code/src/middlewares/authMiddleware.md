---
title: authMiddleware
description: 'Middleware de autenticação para verificar tokens JWT em requisições.'
---

# authMiddleware

O `authMiddleware` é um middleware para o Express que verifica a presença e a validade de um token JWT (JSON Web Token) nas requisições. Ele é utilizado para proteger rotas que requerem autenticação.

## Importações

O middleware utiliza as seguintes bibliotecas:

- `jsonwebtoken`: Para verificar e decodificar o token JWT.
- `express`: Para manipulação de requisições e respostas.
- `dotenv`: Para carregar variáveis de ambiente a partir de um arquivo `.env`.

## Configuração

O segredo utilizado para assinar os tokens JWT é carregado a partir das variáveis de ambiente. Caso não esteja definido, um valor padrão `'secretKey'` é utilizado.

```typescript
const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';
```

## Funcionamento

1. O middleware extrai o token do cabeçalho `Authorization` da requisição.
2. Se o token não estiver presente, uma resposta com status `401` (Não Autorizado) é enviada.
3. Se o token estiver presente, ele é verificado utilizando a função `jwt.verify`.
4. Se a verificação falhar, uma resposta com status `403` (Proibido) é enviada.
5. Se a verificação for bem-sucedida, o `userId` decodificado do token é adicionado ao corpo da requisição (`req.body.userId`), e o próximo middleware é chamado.

## Exemplo de Uso

Para utilizar o `authMiddleware`, basta importá-lo e aplicá-lo nas rotas que requerem autenticação:

```typescript
import authMiddleware from './middlewares/authMiddleware';

app.get('/protected-route', authMiddleware, (req, res) => {
    res.send('Esta é uma rota protegida!');
});
```

## Exportação

O middleware é exportado como padrão para ser utilizado em outras partes da aplicação.

```typescript
export default authMiddleware;
```