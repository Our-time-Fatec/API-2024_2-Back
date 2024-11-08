---
title: Introdução
description: 'Um guia abrangente para entender e utilizar a API do projeto API-2024_2-Back.'
---

# API-2024_2-Back

Esta documentação fornece uma visão geral da API do projeto API-2024_2-Back. O objetivo deste projeto é fornecer uma interface robusta e eficiente para a manipulação de dados relacionados a alimentos, categorias, dietas e usuários.

## Visão Geral do Projeto

O projeto API-2024_2-Back é uma aplicação backend desenvolvida em TypeScript, utilizando o framework Express. Ele é projetado para gerenciar informações sobre alimentos, categorias, dietas e usuários, permitindo operações como criação, leitura, atualização e exclusão (CRUD) de dados. A API também inclui funcionalidades de autenticação e autorização, garantindo a segurança das informações.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

- **src/**: Contém todo o código-fonte da aplicação.
  - **database/**: Contém arquivos relacionados à conexão e inicialização do banco de dados.
  - **func/**: Contém funções auxiliares e lógicas de negócio.
  - **controllers/**: Contém os controladores que gerenciam as requisições e respostas da API.
  - **Interfaces/**: Define as interfaces utilizadas no projeto.
  - **models/**: Contém os modelos que representam as entidades do sistema.
  - **middlewares/**: Contém middlewares utilizados na aplicação.
  - **utils/**: Contém utilitários e funções auxiliares.
  - **types/**: Contém definições de tipos TypeScript.
  - **routes/**: Define as rotas da API.

## Requisitos

Para executar o projeto, você precisará ter os seguintes requisitos instalados em sua máquina:

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- MongoDB (ou outro banco de dados configurado)

## Como Rodar o Projeto

Para iniciar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd API-2024_2-Back
   ```
3. Instale as dependências com o comando:
   ```bash
   npm install
   ```
4. Configure o banco de dados conforme necessário, editando as configurações em `src/database/connection.ts`.
5. Inicie o servidor com o comando:
   ```bash
   npm start
   ```
6. Para desenvolvimento, você pode usar:
   ```bash
   npm run dev
   ```

## Testes

Para executar os testes, utilize o comando:
```bash
npm test
```

Esta documentação deve fornecer uma base sólida para começar a trabalhar com a API do projeto API-2024_2-Back. Para mais informações sobre cada parte do projeto, consulte as seções específicas da documentação.