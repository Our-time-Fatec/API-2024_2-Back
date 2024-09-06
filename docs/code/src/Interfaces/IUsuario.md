---
title: IUsuario
description: 'Interface que define a estrutura de um usuário no sistema.'
---

# IUsuario

A interface `IUsuario` define a estrutura de dados para um usuário no sistema. Ela inclui informações pessoais e métricas de saúde que podem ser utilizadas em diversas funcionalidades da aplicação.

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
  Senha do usuário para autenticação.

- **dataDeNascimento**: `Date`  
  Data de nascimento do usuário.

- **idade**: `number`  
  Idade do usuário.

- **peso**: `number`  
  Peso do usuário em quilogramas.

- **altura**: `number`  
  Altura do usuário em centímetros.

- **nivelDeSedentarismo**: `"Sedentário" | "Levemente ativo" | "Moderadamente ativo" | "Altamente ativo" | "Extremamente ativo"` (opcional)  
  Nível de atividade física do usuário.

- **sexo**: `"Masculino" | "Feminino"` (opcional)  
  Sexo do usuário.

- **objetivo**: `"Dieta de emagrecimento" | "Dieta de Ganho de Massa Muscular" | "Dieta Low Carb"` (opcional)  
  Objetivo nutricional do usuário.

- **IMC**: `number` (opcional)  
  Índice de Massa Corporal do usuário.

- **taxaMetabolismoBasal**: `number` (opcional)  
  Taxa de metabolismo basal do usuário.

- **gastoDeCaloria**: `number` (opcional)  
  Gasto calórico diário do usuário.

- **ultimaVezUtilizado**: `Date` (opcional)  
  Data da última vez que o usuário utilizou o sistema.

- **criadoEm**: `Date` (opcional)  
  Data de criação do registro do usuário.

- **atualizadoEm**: `Date | null` (opcional)  
  Data da última atualização do registro do usuário.

- **removidoEm**: `Date | null` (opcional)  
  Data em que o registro do usuário foi removido.