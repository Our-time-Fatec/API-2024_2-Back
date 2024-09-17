---
title: Introdução
description: 'Um guia abrangente para entender e utilizar a API do projeto API-2024_2-Back.'
---

# Introdução

Esta documentação fornece uma visão geral da API do projeto **API-2024_2-Back**. O objetivo deste projeto é oferecer uma interface robusta e eficiente para a manipulação de dados relacionados a alimentos, categorias, dietas e usuários.

## Visão Geral do Projeto

O projeto é estruturado para facilitar a interação com um banco de dados que armazena informações sobre alimentos, categorias, dietas e usuários. A API é construída utilizando o framework Express e é projetada para ser escalável e de fácil manutenção.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

- **src/**: Contém todo o código-fonte da aplicação.
  - **database/**: Arquivos relacionados à conexão e inicialização do banco de dados.
  - **func/**: Funções auxiliares e lógicas de negócio.
  - **controllers/**: Controladores que gerenciam as requisições e respostas da API.
  - **Interfaces/**: Define as interfaces utilizadas no projeto.
  - **models/**: Modelos que representam as entidades do sistema.
  - **middlewares/**: Middlewares utilizados na aplicação.
  - **utils/**: Utilitários e funções auxiliares.
  - **types/**: Definições de tipos TypeScript.
  - **routes/**: Define as rotas da API.

## Requisitos

Para rodar o projeto, você precisará ter instalado:

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Como Rodar o Projeto

Para iniciar o projeto, siga os passos abaixo:

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Instale as dependências com o comando:
   ```bash
   npm install
   ```
4. Configure o banco de dados conforme necessário.
5. Inicie o servidor com o comando:
   ```bash
   npm start
   ```
6. Para desenvolvimento, você pode usar:
   ```bash
   npm run dev
   ```

Com isso, você estará pronto para interagir com a API e explorar suas funcionalidades.