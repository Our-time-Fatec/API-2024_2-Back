---
title: definirDietaDiaria
description: 'Classe responsável por definir, atualizar e remover dietas diárias para usuários, com base em dietas fixas e alimentos consumidos.'
---

# DefinirDietaDiaria

A classe `DefinirDietaDiaria` é responsável por gerenciar as dietas diárias dos usuários, permitindo a criação, atualização e remoção de dietas com base nas dietas fixas e nos alimentos consumidos.

## Métodos

### diaAtualDaSemana

```typescript
private diaAtualDaSemana(): DiasSemana
```

Retorna o dia atual da semana como um valor do enum `DiasSemana`.

### criarDietaDiaria

```typescript
public async criarDietaDiaria(userId: string): Promise<IDietaDiaria | null>
```

Cria uma nova dieta diária para o usuário especificado. Se já existir uma dieta diária para o dia atual, a dieta existente será reativada.

#### Parâmetros

- `userId`: O ID do usuário para o qual a dieta diária será criada.

#### Retorno

Retorna a nova dieta diária criada ou `null` se não houver uma dieta fixa para o dia.

### atualizarDietaDiaria

```typescript
public async atualizarDietaDiaria(userId: string, dieta: IDietaFixa): Promise<IDietaDiaria | null>
```

Atualiza a dieta diária do usuário com os novos detalhes fornecidos.

#### Parâmetros

- `userId`: O ID do usuário cuja dieta diária será atualizada.
- `dieta`: Um objeto do tipo `IDietaFixa` contendo os novos detalhes da dieta.

#### Retorno

Retorna a dieta diária atualizada ou `null` se não houver uma dieta diária existente.

### removerDietaDiaria

```typescript
public async removerDietaDiaria(userId: string): Promise<void>
```

Remove a dieta diária do usuário para o dia atual, marcando-a como removida.

#### Parâmetros

- `userId`: O ID do usuário cuja dieta diária será removida.

## Dependências

A classe utiliza os seguintes modelos e interfaces:

- `DiasSemana`: Enum que representa os dias da semana.
- `IAlimentoConsumido`: Interface que define a estrutura de um alimento consumido.
- `IDietaDiaria`, `IDietaFixa`, `IGrupoConsumo`: Interfaces que definem a estrutura das dietas e grupos de consumo.
- `AlimentoConsumidoModel`, `DietaDiariaModel`, `DietaFixaModel`: Modelos que representam as coleções no banco de dados.

## Exemplo de Uso

```typescript
const dietaDiaria = new DefinirDietaDiaria();
const novaDieta = await dietaDiaria.criarDietaDiaria('userId123');
```

Esta classe é uma parte fundamental do sistema de gerenciamento de dietas, permitindo que os usuários tenham uma dieta diária personalizada com base em suas preferências e hábitos alimentares.