---
title: jest.config.ts
description: 'Configuração do Jest para testes em um projeto TypeScript.'
---

# jest.config.ts

Este arquivo contém a configuração do Jest, uma popular biblioteca de testes para JavaScript e TypeScript. A configuração é feita para garantir que os testes sejam executados corretamente em um ambiente Node.js.

## Conteúdo do Arquivo

```typescript
import { config } from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env.dev
config({ path: '.env.dev' });

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // Define a pasta de testes
  // testTimeout: 10000,
};
```

## Descrição dos Componentes

- **dotenv**: A biblioteca `dotenv` é utilizada para carregar variáveis de ambiente a partir de um arquivo `.env`. Neste caso, o arquivo `.env.dev` é carregado.

- **preset**: A opção `preset: 'ts-jest'` indica que o Jest deve usar o `ts-jest`, um pré-processador que permite que o Jest entenda arquivos TypeScript.

- **testEnvironment**: Define o ambiente de teste como `node`, o que é apropriado para aplicações que rodam em um ambiente de servidor.

- **testMatch**: Especifica quais arquivos devem ser considerados como testes. Neste caso, todos os arquivos que terminam com `.test.ts` dentro da pasta `__tests__` serão incluídos.

- **testTimeout**: Esta linha está comentada, mas pode ser utilizada para definir um tempo limite para a execução dos testes, caso necessário.

## Considerações Finais

A configuração do Jest é essencial para garantir que os testes sejam executados de forma eficiente e organizada. É recomendável manter o arquivo `.env.dev` atualizado com as variáveis de ambiente necessárias para o ambiente de desenvolvimento.