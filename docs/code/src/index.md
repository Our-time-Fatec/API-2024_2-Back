---
title: index
description: 'Arquivo principal que inicializa o servidor Express e configura a conexão com o banco de dados.'
---

# index.ts

Este arquivo é o ponto de entrada da aplicação, responsável por inicializar o servidor Express, configurar middlewares e estabelecer a conexão com o banco de dados.

## Estrutura do Código

1. **Importações**:
   - `express`: Framework para construção de aplicações web.
   - `cors`: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
   - `dotenv`: Carrega variáveis de ambiente a partir de um arquivo `.env`.
   - `routes`: Importa as rotas definidas na aplicação.
   - `connect`: Função para conectar ao banco de dados.
   - `seedDatabase`: Função para popular o banco de dados com dados iniciais.

2. **Configuração de Variáveis de Ambiente**:
   - As variáveis de ambiente são carregadas usando `dotenv.config()`.
   - A porta do servidor é definida pela variável de ambiente `PORT`, ou 3000 como padrão.

3. **Configuração do Express**:
   - Criação da instância do aplicativo Express.
   - Configuração do middleware para suportar JSON no corpo das requisições.
   - Configuração do CORS para permitir requisições de qualquer origem.

4. **Função `startServer`**:
   - Conecta ao MongoDB.
   - Realiza o seeding do banco de dados.
   - Inicia o servidor na porta especificada.
   - Define as rotas após a conexão e o seeding.

5. **Início do Servidor**:
   - A função `startServer` é chamada para iniciar a aplicação.

## Exemplo de Uso

Para iniciar a aplicação, certifique-se de que as variáveis de ambiente estão configuradas corretamente e execute o arquivo `index.ts`. O servidor será iniciado e estará disponível na porta especificada.