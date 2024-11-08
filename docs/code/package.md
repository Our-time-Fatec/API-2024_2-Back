---
title: package.json
description: 'Configuração do projeto servidor, incluindo dependências e scripts.'
---

# package.json

O arquivo `package.json` é um componente essencial de qualquer projeto Node.js, servindo como um manifesto que contém metadados relevantes sobre o projeto, incluindo suas dependências, scripts e informações de versão.

## Estrutura

### Campos principais

- **name**: Nome do projeto. Neste caso, é "servidor".
- **version**: Versão atual do projeto, definida como "1.0.0".
- **main**: O ponto de entrada do aplicativo, que neste caso é `dist/index.js`.
- **scripts**: Um conjunto de comandos que podem ser executados usando `npm run <script-name>`. Os scripts definidos são:
  - `create`: Executa o script para criar o banco de dados.
  - `load`: Executa o script para carregar dados no banco de dados.
  - `start`: Inicia o servidor.
  - `dev`: Inicia o servidor em modo de desenvolvimento.
  - `teste`: Executa os testes com Jest em modo verboso.
  - `test`: Executa os testes com Jest em modo de observação e verboso.
  - `build`: Compila o TypeScript para JavaScript.

### Dependências

- **dependencies**: Lista de pacotes necessários para o funcionamento do projeto em produção. As dependências incluem:
  - `bcrypt`: Para hashing de senhas.
  - `cors`: Para habilitar CORS.
  - `dotenv`: Para carregar variáveis de ambiente.
  - `express`: Framework web para Node.js.
  - `jsonwebtoken`: Para manipulação de tokens JWT.
  - `moment`: Para manipulação de datas.
  - `mongoose`: ODM para MongoDB.
  - `nodemailer`: Para envio de e-mails.
  - `serialport`: Para comunicação com portas seriais.
  - `servidor`: Referência a um pacote local.

- **devDependencies**: Lista de pacotes necessários apenas durante o desenvolvimento. As devDependencies incluem:
  - `@babel/preset-typescript`: Preset Babel para TypeScript.
  - `@types/*`: Tipos TypeScript para várias bibliotecas.
  - `jest`: Framework de testes.
  - `supertest`: Para testes de APIs.
  - `ts-jest`: Para integração do Jest com TypeScript.
  - `ts-node`: Para execução de arquivos TypeScript diretamente.
  - `typescript`: Compilador TypeScript.

## Licença

- **license**: O projeto está sob a licença ISC.

## Conclusão

O arquivo `package.json` é fundamental para a gestão de dependências e scripts em um projeto Node.js, facilitando o desenvolvimento e a manutenção do código.