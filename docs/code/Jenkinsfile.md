---
title: Jenkinsfile
description: 'Configuração do pipeline Jenkins para automação de build e testes.'
---

# Jenkinsfile

Este arquivo contém a configuração do pipeline Jenkins para automatizar o processo de build e testes de um projeto Node.js. O pipeline é dividido em várias etapas, cada uma responsável por uma parte específica do processo de integração contínua.

## Estrutura do Pipeline

### Agent
Define o agente que executará o pipeline. Neste caso, é utilizado `agent any`, permitindo que o pipeline seja executado em qualquer agente disponível.

### Stages
O pipeline é dividido em várias etapas (stages), cada uma com um conjunto de passos (steps) a serem executados.

#### 1. Checkout Code
- **Descrição**: Realiza o checkout do código-fonte do repositório.
- **Passos**:
  - `checkout scm`: Faz o checkout do código a partir do sistema de controle de versão.

#### 2. Set up Node.js and install dependencies
- **Descrição**: Configura o ambiente Node.js e verifica as versões instaladas.
- **Passos**:
  - `tools { nodejs 'Node' }`: Define a instalação do Node.js a ser utilizada.
  - `sh 'node -v'`: Verifica a versão do Node.js.
  - `sh 'npm -v'`: Verifica a versão do npm.

#### 3. Install Dependencies
- **Descrição**: Instala as dependências do projeto.
- **Passos**:
  - `sh 'npm install'`: Comando para instalar as dependências do projeto (comentado no exemplo).

#### 4. Set up MongoDB
- **Descrição**: Inicia um contêiner do MongoDB utilizando Docker.
- **Passos**:
  - `docker.image('mongo:5.0').withRun(...)`: Inicia o contêiner do MongoDB na porta 27017.

#### 5. Set up .env.dev file
- **Descrição**: Cria um arquivo `.env.dev` com as variáveis de ambiente necessárias.
- **Passos**:
  - `writeFile file: '.env.dev', text: """..."""`: Escreve as variáveis de ambiente no arquivo.

#### 6. Wait for MongoDB
- **Descrição**: Aguarda até que o MongoDB esteja acessível.
- **Passos**:
  - `retry(5) { ... }`: Tenta verificar a disponibilidade do MongoDB até 5 vezes, com um intervalo de 2 segundos entre as tentativas.

#### 7. Build Project
- **Descrição**: Compila o projeto.
- **Passos**:
  - `sh 'npm run build'`: Executa o comando de build do projeto.

#### 8. Run Tests
- **Descrição**: Executa os testes do projeto.
- **Passos**:
  - `sh 'npm run teste'`: Executa os testes definidos no projeto.

### Post Actions
Define ações a serem executadas após a conclusão do pipeline, independentemente do resultado.

- **always**: Executa sempre, independentemente do sucesso ou falha.
- **success**: Executa se o pipeline for concluído com sucesso.
- **failure**: Executa se o pipeline falhar.

## Considerações Finais
Este Jenkinsfile fornece uma base sólida para a automação de builds e testes em um projeto Node.js, garantindo que as dependências sejam instaladas corretamente e que o ambiente esteja configurado antes da execução dos testes.