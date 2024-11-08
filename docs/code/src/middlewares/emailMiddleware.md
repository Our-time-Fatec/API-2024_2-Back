---
title: emailMiddleware
description: 'Middleware para envio de e-mails de redefinição de senha utilizando Nodemailer.'
---

# emailMiddleware

Este módulo contém a implementação de um middleware para o envio de e-mails de redefinição de senha. Utiliza a biblioteca Nodemailer para facilitar o envio de e-mails através do SMTP do Gmail.

## Dependências

- `nodemailer`: Biblioteca para envio de e-mails.
- `dotenv`: Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.

## Configuração

O middleware é configurado para usar o servidor SMTP do Gmail. As credenciais de autenticação (usuário e senha) devem ser definidas nas variáveis de ambiente.

```javascript
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

### sendPasswordResetEmail

```typescript
const sendPasswordResetEmail = async (email: string, resetLink: string) => { ... }
```

#### Parâmetros

- `email`: O endereço de e-mail do destinatário.
- `resetLink`: O link para redefinição de senha que será enviado no corpo do e-mail.

#### Retorno

Retorna um booleano indicando se o e-mail foi enviado com sucesso.

#### Exemplo de Uso

```javascript
const emailSent = await sendPasswordResetEmail('usuario@example.com', 'http://link-para-redefinicao.com');
if (emailSent) {
    console.log('E-mail de redefinição enviado com sucesso.');
} else {
    console.log('Falha ao enviar o e-mail de redefinição.');
}
```

## Considerações de Segurança

- Nunca exponha suas credenciais de e-mail diretamente no código. Utilize variáveis de ambiente para armazená-las de forma segura.
- Considere usar um serviço de e-mail dedicado para produção, evitando o uso de contas pessoais.