---
title: UsuarioFunc
description: 'Classe responsável por cálculos relacionados à saúde do usuário, incluindo IMC, idade, taxa de metabolismo basal e consumo de calorias.'
---

# UsuarioFunc

A classe `UsuarioFunc` contém métodos para realizar cálculos relacionados à saúde e bem-estar do usuário. Os métodos incluem a calculadora de IMC, idade, taxa de metabolismo basal, calorias gastas, consumo de calorias por dia e meta de ingestão de água.

## Métodos

### `calculadoraIMC(altura: number, peso: number): number`

Calcula o Índice de Massa Corporal (IMC) com base na altura e peso fornecidos.

- **Parâmetros:**
  - `altura`: Altura do usuário em centímetros.
  - `peso`: Peso do usuário em quilogramas.
  
- **Retorno:** O IMC calculado como um número.

### `calculadoraIdade(dataDeNascimento: Date): number`

Calcula a idade do usuário com base na data de nascimento fornecida.

- **Parâmetros:**
  - `dataDeNascimento`: Data de nascimento do usuário.
  
- **Retorno:** A idade do usuário em anos.

### `calculadoraTaxaMetabolismoBasal(peso: number, altura: number, idade: number, sexo: string): number`

Calcula a Taxa de Metabolismo Basal (TMB) do usuário com base em peso, altura, idade e sexo.

- **Parâmetros:**
  - `peso`: Peso do usuário em quilogramas.
  - `altura`: Altura do usuário em centímetros.
  - `idade`: Idade do usuário em anos.
  - `sexo`: Sexo do usuário ("Masculino" ou "Feminino").
  
- **Retorno:** A TMB calculada como um número.

### `calculadoraCaloriasGastas(nivelDeSedentarismo: string, taxaMetabolismoBasal: number): number`

Calcula as calorias gastas com base no nível de sedentarismo e na TMB.

- **Parâmetros:**
  - `nivelDeSedentarismo`: Nível de atividade do usuário ("Sedentário", "Levemente ativo", "Moderadamente ativo", "Altamente ativo", "Extremamente ativo").
  - `taxaMetabolismoBasal`: TMB do usuário.
  
- **Retorno:** O total de calorias gastas como um número.

### `calcularConsumoDeCaloriaPorDia(objetivo: string, gastoDeCaloria: number): number`

Calcula o consumo de calorias por dia com base no objetivo do usuário e no gasto calórico.

- **Parâmetros:**
  - `objetivo`: Objetivo do usuário ("Dieta de emagrecimento", "Dieta de Ganho de Massa Muscular", "Dieta Low Carb").
  - `gastoDeCaloria`: Gasto calórico diário do usuário.
  
- **Retorno:** O consumo de calorias por dia calculado como um número.

### `calcularMetaAgua(peso: number): Promise<number>`

Calcula a meta de ingestão de água do usuário com base no peso.

- **Parâmetros:**
  - `peso`: Peso do usuário em quilogramas.
  
- **Retorno:** A meta de ingestão de água em mililitros, retornada como uma Promise.

### `checagemAgua(atualizacao: Date, usuario: any, forcedDate?: Date)`

Verifica se é um novo dia e atualiza a ingestão de água do usuário.

- **Parâmetros:**
  - `atualizacao`: Data da última atualização da ingestão de água.
  - `usuario`: Objeto do usuário que contém informações sobre a ingestão de água.
  - `forcedDate`: Data forçada para verificação (opcional).
  
- **Retorno:** Nenhum. Atualiza o estado do usuário se necessário.

## Observações

- A classe utiliza a fórmula de TMB para calcular as calorias gastas com base em diferentes níveis de atividade física.
- O método `checagemAgua` é utilizado para garantir que a ingestão de água seja reiniciada a cada novo dia.