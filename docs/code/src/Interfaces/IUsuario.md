---
title: IUsuario
description: 'Interface que define a estrutura de um usuário no sistema.'
---

# IUsuario

A interface `IUsuario` define a estrutura de dados para um usuário no sistema. Ela inclui informações pessoais, dados de saúde e preferências de dieta.

## Propriedades

- **id** (opcional): `string` - Identificador único do usuário.
- **nome**: `string` - Nome do usuário.
- **sobrenome**: `string` - Sobrenome do usuário.
- **email**: `string` - Endereço de e-mail do usuário.
- **senha** (opcional): `string` - Senha do usuário.
- **dataDeNascimento**: `Date` - Data de nascimento do usuário.
- **idade**: `number` - Idade do usuário.
- **peso**: `number` - Peso do usuário em quilogramas.
- **altura**: `number` - Altura do usuário em centímetros.
- **nivelDeSedentarismo**: `"Sedentário" | "Levemente ativo" | "Moderadamente ativo" | "Altamente ativo" | "Extremamente ativo"` - Nível de atividade física do usuário.
- **sexo**: `"Masculino" | "Feminino"` - Sexo do usuário.
- **objetivo**: `"Dieta de emagrecimento" | "Dieta de Ganho de Massa Muscular" | "Dieta Low Carb"` - Objetivo dietético do usuário.
- **IMC** (opcional): `number` - Índice de Massa Corporal do usuário.
- **taxaMetabolismoBasal** (opcional): `number` - Taxa de metabolismo basal do usuário.
- **gastoDeCaloria** (opcional): `number` - Gasto calórico diário do usuário.
- **consumoDeCaloriaPorDia** (opcional): `number` - Consumo calórico diário do usuário.
- **ultimaVezUtilizado** (opcional): `Date` - Data da última vez que o usuário utilizou o sistema.
- **criadoEm** (opcional): `Date` - Data de criação do registro do usuário.
- **atualizadoEm** (opcional): `Date | null` - Data da última atualização do registro do usuário.
- **removidoEm** (opcional): `Date | null` - Data em que o registro do usuário foi removido.

## Exemplo de Uso

```typescript
const usuario: IUsuario = {
    nome: "João",
    sobrenome: "Silva",
    email: "joao.silva@example.com",
    dataDeNascimento: new Date("1990-01-01"),
    idade: 33,
    peso: 70,
    altura: 175,
    nivelDeSedentarismo: "Moderadamente ativo",
    sexo: "Masculino",
    objetivo: "Dieta de emagrecimento",
    criadoEm: new Date(),
};
```