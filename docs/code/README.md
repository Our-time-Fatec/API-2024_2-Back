---
title: API-2024_2-Back
description: 'Documentação da API para o projeto API-2024_2-Back, incluindo informações sobre estrutura, funcionalidades e uso.'
---

# API-2024_2-Back

Esta documentação fornece uma visão geral da API do projeto API-2024_2-Back. O objetivo deste projeto é fornecer uma interface robusta e eficiente para a manipulação de dados relacionados a alimentos, categorias, dietas e usuários.

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

## Como Usar

Para iniciar o projeto, siga os passos abaixo:

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure o banco de dados conforme necessário.
4. Inicie o servidor com `npm start`.
