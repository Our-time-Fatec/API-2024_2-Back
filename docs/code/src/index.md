---
title: index
description: 'Arquivo principal que configura e inicia o servidor Express, conectando ao banco de dados e definindo rotas.'
---

# index.ts

O arquivo `index.ts` é o ponto de entrada da aplicação, responsável por configurar e iniciar o servidor Express. Ele realiza a conexão com o banco de dados, aplica o seeding inicial e define as rotas da aplicação.

## Estrutura do Código

1. **Importações**:
   - Importa as bibliotecas necessárias, como `express`, `cors`, `dotenv`, e módulos internos para rotas e conexão com o banco de dados.

2. **Configuração de Variáveis de Ambiente**:
   - Utiliza `dotenv` para carregar variáveis de ambiente a partir de um arquivo `.env`.

3. **Configuração do Servidor**:
   - Define a porta do servidor, utilizando a variável de ambiente `PORT` ou a porta padrão 3000.
   - Cria uma instância do aplicativo Express.

4. **Middleware**:
   - Configura o middleware para suportar JSON no corpo das requisições.
   - Configura o CORS para permitir requisições de qualquer origem.

5. **Definição de Rotas**:
   - Aplica as rotas importadas do módulo `routes`.

6. **Tratamento de Erros**:
   - Adiciona um middleware para retornar uma mensagem de erro 404 caso a rota não seja encontrada.

7. **Função `startServer`**:
   - Conecta ao banco de dados MongoDB.
   - Realiza o seeding do banco de dados.
   - Inicia o servidor, exceto em ambiente de teste.

## Instruções para Uso

- Para iniciar a aplicação, certifique-se de que as variáveis de ambiente estão configuradas corretamente e execute o arquivo `index.ts`.
- O servidor estará disponível na porta especificada, e as rotas definidas poderão ser acessadas conforme a configuração do módulo de rotas.