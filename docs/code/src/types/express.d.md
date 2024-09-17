---
title: express.d.ts
description: 'Declarações de tipos para estender a interface Request do Express com informações do usuário.'
---

# express.d.ts

Este arquivo contém declarações de tipos para estender a interface `Request` do framework Express. O objetivo é adicionar um campo opcional `user`, que pode ser utilizado para armazenar informações sobre o usuário autenticado.

## Estrutura do Código

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

- **Importação**: O arquivo começa importando o tipo `UserPayload`, que deve ser definido em outro local do seu projeto. Este tipo representa a estrutura de dados do payload do usuário.
  
- **Declaração Global**: A declaração `declare global` é utilizada para estender o namespace `Express`, permitindo que você adicione novas propriedades às interfaces existentes.

- **Interface Request**: A interface `Request` do Express é estendida para incluir uma propriedade opcional `user`, que é do tipo `UserPayload`. Isso permite que você acesse as informações do usuário diretamente a partir do objeto `Request` em seus manipuladores de rotas.

### Uso

Ao utilizar este tipo estendido, você pode acessar o usuário autenticado em qualquer middleware ou rota do Express, facilitando a implementação de lógica de autorização e personalização de respostas com base nas informações do usuário.