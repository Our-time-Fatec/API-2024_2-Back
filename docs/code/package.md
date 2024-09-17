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
  - `load`: Carrega dados no banco de dados.
  - `start`: Inicia o servidor.
  - `dev`: Inicia o servidor em modo de desenvolvimento.

### Dependências

As dependências do projeto são listadas sob o campo `dependencies` e incluem:

- **bcrypt**: Biblioteca para hashing de senhas.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.
- **express**: Framework web para Node.js.
- **jsonwebtoken**: Implementação de JSON Web Tokens.
- **moment**: Biblioteca para manipulação de datas.
- **mongoose**: ODM (Object Data Modeling) para MongoDB.

### Dependências de Desenvolvimento

As dependências de desenvolvimento são listadas sob o campo `devDependencies` e incluem:

- **@types/bcrypt**: Tipos TypeScript para a biblioteca bcrypt.
- **@types/cors**: Tipos TypeScript para a biblioteca cors.
- **@types/express**: Tipos TypeScript para o framework express.
- **@types/jsonwebtoken**: Tipos TypeScript para a biblioteca jsonwebtoken.
- **@types/pg**: Tipos TypeScript para PostgreSQL.
- **ts-node**: Executa arquivos TypeScript diretamente.
- **ts-node-dev**: Ferramenta para desenvolvimento que reinicia automaticamente o servidor ao detectar alterações.
- **typescript**: Compilador TypeScript.

## Conclusão

O arquivo `package.json` é fundamental para a configuração e gerenciamento de um projeto Node.js, permitindo a instalação de dependências e a execução de scripts de forma organizada.