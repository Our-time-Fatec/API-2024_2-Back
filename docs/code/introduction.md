---
title: Introdução
description: 'Um guia abrangente para entender e utilizar a API do projeto API-2024_2-Back.'
---

# Introdução

Esta documentação fornece uma visão geral da API do projeto **API-2024_2-Back**. O objetivo deste projeto é oferecer uma interface robusta e eficiente para a manipulação de dados relacionados a alimentos, categorias, dietas e usuários.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

- **src/**: Contém todo o código-fonte da aplicação.
  - **database/**: Contém arquivos relacionados à conexão e inicialização do banco de dados.
    - **connection.ts**: Configurações de conexão com o banco de dados.
    - **seed.ts**: Scripts para popular o banco de dados com dados iniciais.
  - **func/**: Contém funções auxiliares e lógicas de negócio.
    - **UsuarioFunc.ts**: Funções relacionadas à manipulação de usuários.
  - **controllers/**: Contém os controladores que gerenciam as requisições e respostas da API.
    - **AlimentoController.ts**: Controlador para operações relacionadas a alimentos.
    - **AuthController.ts**: Controlador para operações de autenticação.
    - **CategoriaController.ts**: Controlador para operações relacionadas a categorias.
    - **UsuarioController.ts**: Controlador para operações relacionadas a usuários.
  - **Interfaces/**: Define as interfaces utilizadas no projeto.
    - **IAlimento.ts**: Interface para o modelo de alimento.
    - **ICategoria.ts**: Interface para o modelo de categoria.
    - **IUsuario.ts**: Interface para o modelo de usuário.
  - **models/**: Contém os modelos que representam as entidades do sistema.
    - **alimento.ts**: Modelo para a entidade alimento.
    - **categoria.ts**: Modelo para a entidade categoria.
    - **usuarios.ts**: Modelo para a entidade usuário.
  - **middlewares/**: Contém middlewares utilizados na aplicação.
    - **authMiddleware.ts**: Middleware para autenticação de usuários.
  - **utils/**: Contém utilitários e funções auxiliares.
    - **criptografia.ts**: Funções para criptografia de dados.
  - **types/**: Contém definições de tipos TypeScript.
    - **express.d.ts**: Extensões para o módulo Express.
  - **routes/**: Define as rotas da API.
    - **alimentoRoutes.ts**: Rotas para operações relacionadas a alimentos.
    - **authRoutes.ts**: Rotas para operações de autenticação.
    - **categoriaRoutes.ts**: Rotas para operações relacionadas a categorias.
    - **usuarioRoutes.ts**: Rotas para operações relacionadas a usuários.
    - **index.ts**: Arquivo principal que agrupa todas as rotas.

## Como Rodar o Projeto

Para iniciar o projeto, siga os passos abaixo:

1. Clone o repositório.
2. Instale as dependências com o comando:
   ```bash
   npm install
   ```
3. Configure o banco de dados conforme necessário.
4. Inicie o servidor com o comando:
   ```bash
   npm start
   ```

## Requisitos

- Node.js (versão 14 ou superior)
- MongoDB (ou outro banco de dados conforme configuração)
- Dependências listadas no `package.json`

Com esta documentação, você deve estar apto a entender a estrutura e a funcionalidade da API, além de conseguir rodar o projeto em seu ambiente local.