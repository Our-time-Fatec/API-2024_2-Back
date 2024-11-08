---
title: jest.config.ts
description: 'Configuração do Jest para testes em um projeto TypeScript.'
---

# jest.config.ts

Este arquivo contém a configuração do Jest, um framework de testes para JavaScript, utilizado neste projeto que utiliza TypeScript.

## Conteúdo

O arquivo realiza as seguintes operações:

1. **Importação do dotenv**: Carrega as variáveis de ambiente a partir de um arquivo `.env.dev` utilizando a biblioteca `dotenv`.
   
   ```typescript
   import { config } from 'dotenv';
   config({ path: '.env.dev' });
   ```

2. **Exportação da configuração do Jest**: Define as configurações do Jest, incluindo o preset, ambiente de teste e a correspondência de testes.

   ```typescript
   export default {
     preset: 'ts-jest',
     testEnvironment: 'node',
     testMatch: ['**/__tests__/**/*.test.ts'], // Define a pasta de testes
     // testTimeout: 10000,
   };
   ```

## Configurações

- **preset**: Utiliza `ts-jest` para suporte a TypeScript.
- **testEnvironment**: Define o ambiente de teste como `node`.
- **testMatch**: Especifica que os testes devem ser encontrados na pasta `__tests__` e que os arquivos de teste devem ter a extensão `.test.ts`.
- **testTimeout**: (Comentado) Permite definir um tempo limite para os testes, caso necessário.

## Uso

Para executar os testes, utilize o comando:

```bash
npm test
```

ou

```bash
jest
```

Certifique-se de que as dependências necessárias estão instaladas, incluindo `jest`, `ts-jest` e `dotenv`.