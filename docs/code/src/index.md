---
title: index
description: 'Arquivo principal que inicializa o servidor Express e configura as rotas e conexões com o banco de dados.'
---

# index.ts

O arquivo `index.ts` é o ponto de entrada da aplicação, responsável por inicializar o servidor Express, configurar middlewares e conectar ao banco de dados.

## Estrutura do Código

1. **Importações**:
   - Importa as bibliotecas necessárias: `express`, `cors`, `dotenv`, e as rotas e funções de conexão com o banco de dados.

2. **Configuração do Ambiente**:
   - Carrega as variáveis de ambiente usando `dotenv.config()`.

3. **Definição da Porta**:
   - Define a porta do servidor, utilizando a variável de ambiente `PORT` ou o valor padrão `3000`.

4. **Inicialização do Servidor**:
   - Cria uma instância do servidor Express.

5. **Middlewares**:
   - Configura o servidor para suportar JSON no corpo das requisições.
   - Habilita o CORS para permitir requisições de qualquer domínio.

6. **Conexão com o Banco de Dados**:
   - Estabelece a conexão com o MongoDB ao iniciar a aplicação.
   - Executa a função `seedDatabase()` para popular o banco de dados com dados iniciais.

7. **Inicialização do Servidor**:
   - O servidor é iniciado na porta especificada, e uma mensagem é exibida no console.

8. **Configuração de Rotas**:
   - Define as rotas da aplicação utilizando o módulo de rotas importado.

## Exemplo de Uso

Para iniciar a aplicação, execute o seguinte comando no terminal:

```bash
npm start
```

Certifique-se de que as variáveis de ambiente estão configuradas corretamente antes de iniciar o servidor.