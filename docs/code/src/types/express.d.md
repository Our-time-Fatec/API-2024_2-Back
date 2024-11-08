---
title: express.d.ts
description: 'Declarações de tipos para estender a interface Request do Express com informações do usuário.'
---

# express.d.ts

Este arquivo contém declarações de tipos para estender a interface `Request` do framework Express. O objetivo é adicionar um campo opcional `user`, que pode ser utilizado para armazenar informações sobre o usuário autenticado.

## Estrutura do Arquivo

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

### Detalhes

- **Importação**: O arquivo começa importando o tipo `UserPayload`, que deve ser definido em outro local do seu projeto. Este tipo representa a estrutura dos dados do usuário que você deseja incluir na requisição.
  
- **Declaração Global**: A declaração `declare global` é utilizada para estender o namespace `Express`, permitindo que você adicione novas propriedades às interfaces existentes.

- **Interface Request**: A interface `Request` é estendida para incluir uma propriedade opcional `user`, que é do tipo `UserPayload`. Isso permite que você acesse os dados do usuário em qualquer lugar onde a interface `Request` é utilizada, como em middlewares ou controladores.

### Uso

Para utilizar essa extensão, você pode acessar a propriedade `user` em seus middlewares ou controladores, garantindo que o tipo correto seja inferido pelo TypeScript. Isso melhora a segurança do tipo e a legibilidade do código.