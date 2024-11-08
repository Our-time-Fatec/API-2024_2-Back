---
title: emailMiddleware
description: 'Middleware para envio de e-mails de redefinição de senha utilizando Nodemailer.'
---

# emailMiddleware

Este módulo contém a implementação de um middleware para o envio de e-mails de redefinição de senha. Utiliza a biblioteca Nodemailer para facilitar o envio de e-mails através do SMTP.

## Dependências

- **nodemailer**: Biblioteca para envio de e-mails.
- **dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`.

## Configuração

O módulo configura um transportador SMTP utilizando as credenciais do Gmail. As credenciais são carregadas a partir de variáveis de ambiente.

```typescript
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "davincitestes@gmail.com",
        pass: "jyuysedeghrphcpp"
    }
});
```

## Funções

### `sendPasswordResetEmail`

Esta função é responsável por enviar um e-mail de redefinição de senha para o usuário.

#### Parâmetros

- `email` (string): O endereço de e-mail do destinatário.
- `resetLink` (string): O link para redefinição de senha.

#### Retorno

Retorna um booleano indicando se o e-mail foi enviado com sucesso.

#### Exemplo de Uso

```typescript
const emailSent = await sendPasswordResetEmail('usuario@example.com', 'http://link-para-redefinicao.com');
if (emailSent) {
    console.log('E-mail de redefinição enviado com sucesso.');
} else {
    console.log('Falha ao enviar o e-mail de redefinição.');
}
```

## Exportação

O módulo exporta a função `sendPasswordResetEmail` para ser utilizada em outras partes da aplicação.

```typescript
export { sendPasswordResetEmail };
```