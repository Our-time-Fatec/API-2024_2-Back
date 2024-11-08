---
title: IUsuario
description: 'Interface que define a estrutura de um usuário no sistema, incluindo informações pessoais e de saúde.'
---

# IUsuario

A interface `IUsuario` define a estrutura de um usuário no sistema, incluindo informações pessoais, de saúde e hábitos. Esta interface é utilizada para garantir que todos os objetos de usuário sigam um formato consistente.

## Propriedades

- **id**: `string` (opcional)  
  Identificador único do usuário.

- **nome**: `string`  
  Nome do usuário.

- **sobrenome**: `string`  
  Sobrenome do usuário.

- **email**: `string`  
  Endereço de e-mail do usuário.

- **senha**: `string` (opcional)  
  Senha do usuário.

- **dataDeNascimento**: `Date`  
  Data de nascimento do usuário.

- **idade**: `number`  
  Idade do usuário.

- **peso**: `number`  
  Peso do usuário em quilogramas.

- **altura**: `number`  
  Altura do usuário em centímetros.

- **nivelDeSedentarismo**:  
  `Sedentário` | `Levemente ativo` | `Moderadamente ativo` | `Altamente ativo` | `Extremamente ativo`  
  Nível de atividade física do usuário.

- **sexo**:  
  `Masculino` | `Feminino`  
  Sexo do usuário.

- **objetivo**:  
  `Dieta de emagrecimento` | `Dieta de Ganho de Massa Muscular` | `Dieta Low Carb`  
  Objetivo dietético do usuário.

- **IMC**: `number` (opcional)  
  Índice de Massa Corporal do usuário.

- **taxaMetabolismoBasal**: `number` (opcional)  
  Taxa de metabolismo basal do usuário.

- **gastoDeCaloria**: `number` (opcional)  
  Gasto calórico diário do usuário.

- **consumoDeCaloriaPorDia**: `number` (opcional)  
  Consumo calórico diário do usuário.

- **ultimaVezUtilizado**: `Date` (opcional)  
  Data da última vez que o usuário utilizou o sistema.

- **criadoEm**: `Date` (opcional)  
  Data de criação do registro do usuário.

- **atualizadoEm**: `Date | null` (opcional)  
  Data da última atualização do registro do usuário.

- **removidoEm**: `Date | null` (opcional)  
  Data em que o registro do usuário foi removido.

- **metaAgua**: `number`  
  Meta de ingestão de água do usuário em mililitros.

- **agua**: `IAgua`  
  Objeto que contém informações sobre a ingestão de água do usuário.

## IAgua

A interface `IAgua` define a estrutura para as informações de ingestão de água do usuário.

### Propriedades

- **aguaIngerida**: `number`  
  Quantidade de água ingerida pelo usuário em mililitros.

- **atualizacao**: `Date`  
  Data da última atualização das informações de ingestão de água.