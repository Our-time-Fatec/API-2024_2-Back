---
title: UsuarioFunc
description: 'Classe responsável por cálculos relacionados à saúde, como IMC, idade, taxa de metabolismo basal e calorias gastas.'
---

# UsuarioFunc

A classe `UsuarioFunc` contém métodos para realizar cálculos relacionados à saúde, incluindo o Índice de Massa Corporal (IMC), idade, taxa de metabolismo basal e calorias gastas com base no nível de atividade física.

## Métodos

### `calculadoraIMC(altura: number, peso: number): number`

Calcula o Índice de Massa Corporal (IMC) com base na altura e peso fornecidos.

- **Parâmetros:**
  - `altura`: Altura em centímetros.
  - `peso`: Peso em quilogramas.
  
- **Retorno:** 
  - Retorna o valor do IMC como um número.

### `calculadoraIdade(dataDeNascimento: Date): number`

Calcula a idade com base na data de nascimento fornecida.

- **Parâmetros:**
  - `dataDeNascimento`: Data de nascimento do usuário.
  
- **Retorno:** 
  - Retorna a idade em anos como um número.

### `calculadoraTaxaMetabolismoBasal(peso: number, altura: number, idade: number, sexo: string): Promise<number>`

Calcula a Taxa de Metabolismo Basal (TMB) com base no peso, altura, idade e sexo do usuário.

- **Parâmetros:**
  - `peso`: Peso em quilogramas.
  - `altura`: Altura em centímetros.
  - `idade`: Idade em anos.
  - `sexo`: Sexo do usuário, que pode ser "Masculino" ou "Feminino".
  
- **Retorno:** 
  - Retorna a TMB como uma Promise que resolve para um número.

### `calculadoraCaloriasGastas(nivelDeSedentarismo: string, taxaMetabolismoBasal: number): Promise<number>`

Calcula as calorias gastas com base no nível de sedentarismo e na taxa de metabolismo basal.

- **Parâmetros:**
  - `nivelDeSedentarismo`: Nível de atividade física do usuário, que pode ser "Sedentário", "Levemente ativo", "Moderadamente ativo", "Altamente ativo" ou "Extremamente ativo".
  - `taxaMetabolismoBasal`: Valor da TMB calculada anteriormente.
  
- **Retorno:** 
  - Retorna as calorias gastas como uma Promise que resolve para um número.

## Níveis de Sedentarismo

Os níveis de sedentarismo utilizados para o cálculo das calorias gastas são:

- **Sedentário:** TMB × 1,2
- **Levemente ativo:** TMB × 1,375
- **Moderadamente ativo:** TMB × 1,55
- **Altamente ativo:** TMB × 1,725
- **Extremamente ativo:** TMB × 1,9