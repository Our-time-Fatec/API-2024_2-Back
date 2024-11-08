
---
title: routes.test.ts
description: 'Testes para as rotas da aplicação, incluindo autenticação, usuários, alimentos e dietas.'
---

# Testes de Rotas

Este arquivo contém testes automatizados para as rotas da aplicação, utilizando a biblioteca `supertest` para simular requisições HTTP. Os testes abrangem funcionalidades de autenticação, gerenciamento de usuários, alimentos e dietas.

## Estrutura dos Testes

Os testes estão organizados em grupos, cada um representando um conjunto de rotas. Abaixo estão os principais grupos de testes:

### 1. Configuração Inicial

- **beforeAll**: Conecta ao banco de dados de teste e realiza o login de um usuário para obter um token de autenticação.
- **afterAll**: Desconecta do banco de dados após a execução dos testes.

### 2. Testes de Rotas

#### 2.1 Rotas de Usuário

- **404 para rota inexistente**: Verifica se a rota `/usuario/testeteste` retorna um erro 404.
- **Criação de usuário**: Testa a criação de um novo usuário e mede o tempo de resposta.
- **Validação de senha**: Testa a falha ao tentar criar um usuário com senha curta.
- **Login**: Verifica se o login retorna um token válido.
- **Detalhes do usuário**: Testa a recuperação dos detalhes do usuário autenticado.
- **Atualização de usuário**: Verifica se a atualização dos dados do usuário é bem-sucedida.
- **Deleção de usuário**: Testa a remoção do usuário.

#### 2.2 Rotas de Autenticação

- **Login com credenciais inválidas**: Verifica se o login falha com um usuário não existente ou senha errada.

#### 2.3 Rotas de Alimento

- **Criação de alimento**: Testa a criação de um novo alimento.
- **Listagem de alimentos**: Verifica se a listagem de alimentos retorna resultados.
- **Atualização e deleção de alimento**: Testa a atualização e remoção de um alimento.

#### 2.4 Rotas de Alimento Consumido

- **Registro de alimento consumido**: Testa a criação de um registro de alimento consumido.
- **Listagem de alimentos consumidos**: Verifica se a listagem de alimentos consumidos retorna resultados.

#### 2.5 Rotas de Dietas

- **Criação de dieta**: Testa a criação de uma nova dieta.
- **Listagem de dietas**: Verifica se a listagem de dietas retorna resultados.
- **Atualização e deleção de dieta**: Testa a atualização e remoção de uma dieta.

### 3. Funções de Usuário

#### 3.1 Cálculos e Validações

- **Cálculo de IMC**: Testa a função que calcula o Índice de Massa Corporal (IMC).
- **Cálculo de idade**: Verifica se a função calcula a idade corretamente.
- **Cálculo de Taxa Metabólica Basal (TMB)**: Testa a função para calcular a TMB para diferentes sexos.
- **Cálculo de calorias gastas**: Verifica se a função calcula corretamente as calorias gastas com base no nível de sedentarismo.

### Conclusão

Os testes garantem que as rotas da aplicação funcionem conforme o esperado, cobrindo cenários de sucesso e falha. A execução regular desses testes é recomendada para manter a integridade da aplicação durante o desenvolvimento.
