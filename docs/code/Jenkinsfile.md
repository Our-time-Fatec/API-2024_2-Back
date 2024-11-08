---
title: Jenkinsfile
description: 'Configuração do pipeline Jenkins para automação de build e testes.'
---

# Jenkinsfile

Este arquivo contém a configuração do pipeline Jenkins, que automatiza o processo de build e testes de um projeto Node.js. Abaixo estão as etapas definidas no pipeline.

## Estrutura do Pipeline

### Agent
O pipeline é configurado para ser executado em qualquer agente disponível.

### Stages

1. **Checkout Code**
   - Realiza o checkout do código-fonte do repositório.

2. **Set up Node.js and install dependencies**
   - Configura a instalação do Node.js e verifica as versões do Node.js e npm.

3. **Install Dependencies**
   - Instala as dependências do projeto.

4. **Set up MongoDB**
   - Inicia um contêiner do MongoDB utilizando Docker, configurando a porta e o banco de dados inicial.

5. **Set up .env.dev file**
   - Cria um arquivo `.env.dev` com as variáveis de ambiente necessárias para o projeto.

6. **Wait for MongoDB**
   - Aguarda até que o MongoDB esteja acessível, tentando 5 vezes com um intervalo de 2 segundos entre as tentativas.

7. **Build Project**
   - Compila o projeto utilizando o comando `npm run build`.

8. **Run Tests**
   - Executa os testes do projeto com o comando `npm run teste`.

### Post Actions
- **always**: Executa ações de limpeza, se necessário.
- **success**: Exibe uma mensagem indicando que o pipeline foi concluído com sucesso.
- **failure**: Exibe uma mensagem indicando que o pipeline falhou.

## Considerações Finais
Este Jenkinsfile é uma base para automação de processos de CI/CD em projetos Node.js, podendo ser adaptado conforme as necessidades específicas do projeto.