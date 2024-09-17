---
title: UsuarioFunc
description: 'Classe responsável por cálculos relacionados à saúde e nutrição, incluindo IMC, idade, taxa de metabolismo basal e consumo de calorias.'
---

# UsuarioFunc

A classe `UsuarioFunc` contém métodos para realizar cálculos relacionados à saúde e nutrição. Os métodos disponíveis incluem:

## Métodos

### `calculadoraIMC(altura: number, peso: number): number`

Calcula o Índice de Massa Corporal (IMC) com base na altura e peso fornecidos.

- **Parâmetros:**
  - `altura`: Altura em centímetros.
  - `peso`: Peso em quilogramas.
  
- **Retorno:** 
  - O IMC calculado como um número.

### `calculadoraIdade(dataDeNascimento: Date): number`

Calcula a idade com base na data de nascimento fornecida.

- **Parâmetros:**
  - `dataDeNascimento`: Data de nascimento do usuário.
  
- **Retorno:** 
  - A idade em anos como um número.

### `calculadoraTaxaMetabolismoBasal(peso: number, altura: number, idade: number, sexo: string): Promise<number>`

Calcula a Taxa de Metabolismo Basal (TMB) com base no peso, altura, idade e sexo do usuário.

- **Parâmetros:**
  - `peso`: Peso em quilogramas.
  - `altura`: Altura em centímetros.
  - `idade`: Idade em anos.
  - `sexo`: Sexo do usuário ("Masculino" ou "Feminino").
  
- **Retorno:** 
  - A TMB calculada como uma promessa que resolve para um número.

### `calculadoraCaloriasGastas(nivelDeSedentarismo: string, taxaMetabolismoBasal: number): Promise<number>`

Calcula as calorias gastas com base no nível de sedentarismo e na TMB.

- **Parâmetros:**
  - `nivelDeSedentarismo`: Nível de atividade do usuário ("Sedentário", "Levemente ativo", "Moderadamente ativo", "Altamente ativo", "Extremamente ativo").
  - `taxaMetabolismoBasal`: TMB do usuário.
  
- **Retorno:** 
  - As calorias gastas calculadas como uma promessa que resolve para um número.

### `calcularConsumoDeCaloriaPorDia(objetivo: string, gastoDeCaloria: number): Promise<number>`

Calcula o consumo de calorias por dia com base no objetivo do usuário e no gasto de calorias.

- **Parâmetros:**
  - `objetivo`: Objetivo do usuário ("Dieta de emagrecimento", "Dieta de Ganho de Massa Muscular", "Dieta Low Carb").
  - `gastoDeCaloria`: Gasto calórico diário.
  
- **Retorno:** 
  - O consumo de calorias por dia calculado como uma promessa que resolve para um número.

## Notas

Os fatores de multiplicação para o cálculo de calorias gastas com base no nível de sedentarismo são os seguintes:

- Sedentário: TMB × 1,2
- Levemente ativo: TMB × 1,375
- Moderadamente ativo: TMB × 1,55
- Altamente ativo: TMB × 1,725
- Extremamente ativo: TMB × 1,9