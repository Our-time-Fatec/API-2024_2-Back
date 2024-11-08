---
title: authMiddleware
description: 'Middleware para autenticação de usuários utilizando JWT.'
---

# authMiddleware

O `authMiddleware` é um middleware para autenticação de usuários em uma aplicação Express, utilizando JSON Web Tokens (JWT). Este middleware verifica a presença e a validade do token de autenticação fornecido no cabeçalho da requisição.

## Importações

O arquivo importa os seguintes módulos:

- `jsonwebtoken`: Para verificar e decodificar o token JWT.
- `Request`, `Response`, `NextFunction`: Tipos do Express para definir os parâmetros da função middleware.
- `dotenv`: Para carregar variáveis de ambiente a partir de um arquivo `.env`.

## Configuração do JWT

O segredo utilizado para assinar o token JWT é obtido a partir das variáveis de ambiente. Caso não esteja definido, um valor padrão `'secretKey'` é utilizado.

```typescript
const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';
```

## Função Middleware

A função `authMiddleware` é definida da seguinte forma:

```typescript
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Lógica do middleware
};
```

### Lógica do Middleware

1. **Verificação do Token**: O middleware tenta obter o token do cabeçalho `Authorization` da requisição.
   - Se o token não estiver presente, uma resposta com status `401` (Não Autorizado) é enviada.

2. **Validação do Token**: O token é verificado utilizando a função `jwt.verify`.
   - Se o token for inválido, uma resposta com status `403` (Proibido) é enviada.
   - Se o token for válido, o `userId` decodificado é adicionado ao corpo da requisição (`req.body.userId`), e a execução do middleware prossegue chamando `next()`.

## Exportação

O middleware é exportado como padrão para ser utilizado em outras partes da aplicação.

```typescript
export default authMiddleware;
```

## Exemplo de Uso

Para utilizar o `authMiddleware`, você pode importá-lo e aplicá-lo em rotas que requerem autenticação:

```typescript
import authMiddleware from './middlewares/authMiddleware';

app.get('/protected-route', authMiddleware, (req, res) => {
    res.send('Esta é uma rota protegida!');
});
``` 

Este middleware é essencial para garantir que apenas usuários autenticados possam acessar rotas específicas da aplicação.