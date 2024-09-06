---
title: package.json
description: 'Configuração do projeto servidor, incluindo dependências e scripts.'
---

# package.json

O arquivo `package.json` é um componente essencial de qualquer projeto Node.js, pois contém metadados relevantes sobre o projeto, incluindo suas dependências, scripts e informações de versão.

## Estrutura do arquivo

### Campos principais

- **name**: Nome do projeto. Neste caso, é "servidor".
- **version**: Versão atual do projeto, definida como "1.0.0".
- **main**: O ponto de entrada do aplicativo, que neste caso é `dist/index.js`.
- **scripts**: Scripts que podem ser executados usando o comando `npm run`. Os scripts definidos são:
  - `create`: Executa o script de criação do banco de dados.
  - `load`: Executa o script para carregar dados no banco de dados.
  - `start`: Inicia o servidor executando `src/index.ts`.
  - `dev`: Inicia o servidor em modo de desenvolvimento com recarregamento automático.

### Dependências

- **dependencies**: Lista de pacotes necessários para o funcionamento do projeto em produção:
  - `bcrypt`: Biblioteca para hashing de senhas.
  - `cors`: Middleware para habilitar CORS.
  - `dotenv`: Carrega variáveis de ambiente de um arquivo `.env`.
  - `express`: Framework web para Node.js.
  - `jsonwebtoken`: Biblioteca para manipulação de JSON Web Tokens.
  - `mongoose`: ODM para MongoDB.

- **devDependencies**: Lista de pacotes necessários apenas durante o desenvolvimento:
  - `@types/bcrypt`: Tipos TypeScript para o pacote bcrypt.
  - `@types/cors`: Tipos TypeScript para o pacote cors.
  - `@types/express`: Tipos TypeScript para o pacote express.
  - `@types/jsonwebtoken`: Tipos TypeScript para o pacote jsonwebtoken.
  - `@types/pg`: Tipos TypeScript para o pacote pg.
  - `ts-node`: Executa arquivos TypeScript diretamente.
  - `ts-node-dev`: Executa arquivos TypeScript com recarregamento automático.
  - `typescript`: Compilador TypeScript.

## Considerações Finais

O `package.json` é fundamental para gerenciar as dependências e scripts do projeto, facilitando o desenvolvimento e a manutenção do código. É importante mantê-lo atualizado conforme novas dependências são adicionadas ou removidas do projeto.