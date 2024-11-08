---
title: UsuarioFunc
description: 'Classe responsável por cálculos relacionados à saúde do usuário, incluindo IMC, idade, taxa de metabolismo basal e consumo de calorias.'
---

# UsuarioFunc

A classe `UsuarioFunc` contém métodos para realizar cálculos relacionados à saúde e nutrição do usuário. Os métodos disponíveis incluem:

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

Calcula a Taxa de Metabolismo Basal (TMB) do usuário.

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

Calcula o consumo diário de calorias com base no objetivo do usuário.

- **Parâmetros:**
  - `objetivo`: Objetivo do usuário ("Dieta de emagrecimento", "Dieta de Ganho de Massa Muscular", "Dieta Low Carb").
  - `gastoDeCaloria`: Total de calorias gastas.
  
- **Retorno:** O consumo de calorias por dia calculado como um número.

### `calcularMetaAgua(peso: number): Promise<number>`

Calcula a meta de ingestão de água diária com base no peso do usuário.

- **Parâmetros:**
  - `peso`: Peso do usuário em quilogramas.
  
- **Retorno:** A meta de água em mililitros como uma Promise.

### `checagemAgua(atualizacao: Date, usuario: any, forcedDate?: Date)`

Verifica se houve uma nova atualização de ingestão de água e, se necessário, reseta a quantidade de água ingerida.

- **Parâmetros:**
  - `atualizacao`: Data da última atualização de ingestão de água.
  - `usuario`: Objeto do usuário que contém informações sobre a ingestão de água.
  - `forcedDate`: Data forçada para verificação (opcional).
  
- **Retorno:** Nenhum. Este método realiza uma operação assíncrona de atualização no banco de dados.

## Observações

- A TMB é ajustada com base no nível de atividade do usuário, conforme as seguintes categorias:
  - Sedentário: TMB × 1,2
  - Levemente ativo: TMB × 1,375
  - Moderadamente ativo: TMB × 1,55
  - Altamente ativo: TMB × 1,725
  - Extremamente ativo: TMB × 1,9

Esta classe é útil para aplicações que necessitam de cálculos relacionados à saúde e nutrição, permitindo que os usuários monitorem e gerenciem suas metas de saúde de forma eficaz.