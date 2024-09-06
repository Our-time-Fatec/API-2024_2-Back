---
title: API-2024_2-Back
description: 'Uma API desenvolvida em TypeScript para gerenciamento de usuarios, alimentos e dietas'
---

# API-2024_2-Back

## Visão Geral

O projeto **API-2024_2-Back** é uma API desenvolvida em TypeScript, projetada para gerenciar informações relacionadas a usuários, alimentos e dietas. A API utiliza o framework Express para a construção de rotas e a biblioteca Mongoose para a interação com um banco de dados MongoDB. O objetivo principal é fornecer um backend robusto e escalável para aplicações que necessitam de gerenciamento de dados de usuários, alimentos e dietas.

## Requisitos

Para rodar este projeto, você precisará ter os seguintes requisitos instalados em sua máquina:

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- MongoDB (ou outro banco de dados compatível)

## Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd API-2024_2-Back
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e adicione as configurações necessárias, como a URL do banco de dados.

4. **Inicie o servidor:**
   Para iniciar o servidor em modo de desenvolvimento, execute:
   ```bash
   npm run dev
   ```
   Para iniciar o servidor em modo de produção, execute:
   ```bash
   npm start
   ```

5. **Scripts adicionais:**
   - Para criar a estrutura do banco de dados, utilize:
     ```bash
     npm run create
     ```
   - Para carregar dados iniciais, utilize:
     ```bash
     npm run load
     ```

## Estrutura de Pastas

- `src/`: Contém o código-fonte da aplicação.
  - `database/`: Scripts relacionados à conexão e manipulação do banco de dados.
  - `func/`: Funções auxiliares.
  - `controllers/`: Controladores que gerenciam a lógica de negócios.
  - `Interfaces/`: Definições de interfaces TypeScript.
  - `models/`: Modelos de dados.
  - `middlewares/`: Middlewares para processamento de requisições.
  - `utils/`: Funções utilitárias.
  - `routes/`: Definições das rotas da API.

## Conclusão

Este projeto fornece uma base sólida para a construção de uma API de gerenciamento de usuários, alimentos e dietas.