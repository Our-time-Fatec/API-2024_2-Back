---
title: express.d.ts
description: 'Declarações de tipos para estender a interface Request do Express com informações do usuário.'
---

# express.d.ts

Este arquivo contém declarações de tipos para estender a interface `Request` do framework Express. Ele permite que você adicione informações adicionais ao objeto de requisição, como o payload do usuário autenticado.

## Conteúdo

```typescript
import { UserPayload } from './path/to/your/userPayload'; // Importe o tipo que representa o payload do seu usuário, se você o tiver

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload; // Defina o tipo do usuário conforme seu payload
        }
    }
}
```

## Descrição

- **Importação**: O arquivo começa importando o tipo `UserPayload`, que deve ser definido em outro local do seu projeto. Este tipo representa a estrutura dos dados do usuário que você deseja incluir na requisição.

- **Declaração Global**: A declaração `declare global` é utilizada para estender o namespace `Express`. Isso permite que você adicione propriedades personalizadas à interface `Request`.

- **Interface Request**: A interface `Request` é estendida para incluir uma propriedade opcional `user`, que é do tipo `UserPayload`. Isso significa que, ao manipular requisições no seu aplicativo, você pode acessar `req.user` para obter informações sobre o usuário autenticado, se disponível.

## Uso

Para utilizar essa extensão, certifique-se de que o tipo `UserPayload` esteja corretamente definido e importado. Após isso, você poderá acessar `req.user` em seus middlewares e controladores, facilitando a manipulação de dados do usuário durante o processamento das requisições.