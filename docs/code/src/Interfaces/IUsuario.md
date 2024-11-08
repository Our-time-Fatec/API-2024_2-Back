---
title: IUsuario
description: 'Interface que define a estrutura de um usuário no sistema, incluindo informações pessoais e de saúde.'
---

# IUsuario

A interface `IUsuario` descreve a estrutura de um usuário no sistema, incluindo suas informações pessoais, dados de saúde e objetivos relacionados à dieta. 

## Estrutura

```typescript
export interface IUsuario {
  id?: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
  dataDeNascimento: Date;
  idade: number;
  peso: number;
  altura: number;
  nivelDeSedentarismo: "Sedentário" | "Levemente ativo" | "Moderadamente ativo" | "Altamente ativo" | "Extremamente ativo";
  sexo: "Masculino" | "Feminino";
  objetivo: "Dieta de emagrecimento" | "Dieta de Ganho de Massa Muscular" | "Dieta Low Carb";
  IMC?: number;
  taxaMetabolismoBasal?: number;
  gastoDeCaloria?: number;
  consumoDeCaloriaPorDia?: number;
  ultimaVezUtilizado?: Date;
  criadoEm?: Date;
  atualizadoEm?: Date | null;
  removidoEm?: Date | null;
  metaAgua: number;
  agua: IAgua;
}
```

### Propriedades

- **id**: (opcional) Identificador único do usuário.
- **nome**: Nome do usuário.
- **sobrenome**: Sobrenome do usuário.
- **email**: Endereço de e-mail do usuário.
- **senha**: (opcional) Senha do usuário.
- **dataDeNascimento**: Data de nascimento do usuário.
- **idade**: Idade do usuário em anos.
- **peso**: Peso do usuário em quilogramas.
- **altura**: Altura do usuário em centímetros.
- **nivelDeSedentarismo**: Nível de atividade física do usuário, podendo ser:
  - "Sedentário"
  - "Levemente ativo"
  - "Moderadamente ativo"
  - "Altamente ativo"
  - "Extremamente ativo"
- **sexo**: Sexo do usuário, podendo ser:
  - "Masculino"
  - "Feminino"
- **objetivo**: Objetivo dietético do usuário, podendo ser:
  - "Dieta de emagrecimento"
  - "Dieta de Ganho de Massa Muscular"
  - "Dieta Low Carb"
- **IMC**: (opcional) Índice de Massa Corporal do usuário.
- **taxaMetabolismoBasal**: (opcional) Taxa de metabolismo basal do usuário.
- **gastoDeCaloria**: (opcional) Gasto calórico diário do usuário.
- **consumoDeCaloriaPorDia**: (opcional) Consumo calórico diário do usuário.
- **ultimaVezUtilizado**: (opcional) Data da última utilização do sistema pelo usuário.
- **criadoEm**: (opcional) Data de criação do registro do usuário.
- **atualizadoEm**: (opcional) Data da última atualização do registro do usuário.
- **removidoEm**: (opcional) Data em que o registro do usuário foi removido.
- **metaAgua**: Meta de ingestão de água do usuário em mililitros.
- **agua**: Objeto que contém informações sobre a ingestão de água do usuário.

### IAgua

A interface `IAgua` define a estrutura relacionada à ingestão de água do usuário.

```typescript
export interface IAgua {
  aguaIngerida: number;
  atualizacao: Date;
}
```

#### Propriedades

- **aguaIngerida**: Quantidade de água ingerida pelo usuário em mililitros.
- **atualizacao**: Data da última atualização das informações de ingestão de água.