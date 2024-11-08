---
title: dietaDiaria
description: 'Modelo Mongoose para a representação de uma dieta diária, incluindo grupos de consumo e validações.'
---

# dietaDiaria

O arquivo `dietaDiaria.ts` define um modelo Mongoose para a coleção de dietas diárias. Este modelo é utilizado para armazenar informações sobre as dietas de usuários, incluindo detalhes sobre os grupos de alimentos consumidos.

## Estrutura do Modelo

### Schema: `DietaDiariaSchema`

O `DietaDiariaSchema` contém os seguintes campos:

- **usuarioId**: `String` (obrigatório)  
  Identificador do usuário associado à dieta diária.

- **diaSemana**: `String` (obrigatório)  
  Representa o dia da semana em que a dieta é aplicada. Este campo é restrito aos valores definidos no enum `DiasSemana`.

- **dia**: `Date` (obrigatório)  
  Data específica da dieta diária.

- **detalhes**: `DietaDetalhesSchema` (obrigatório)  
  Detalhes adicionais sobre a dieta, definidos em um schema separado.

- **removidoEm**: `Date` (opcional)  
  Data em que a dieta foi removida, se aplicável. O valor padrão é `null`.

- **grupos**: `Array<GrupoSchema>` (obrigatório)  
  Lista de grupos de alimentos associados à dieta. Este campo possui uma validação que garante que os nomes dos grupos sejam únicos.

- **gruposConsumo**: `Array<GruposConsumidosSchema>` (opcional)  
  Lista de grupos de consumo, que contém os alimentos consumidos.

### Schema: `GruposConsumidosSchema`

O `GruposConsumidosSchema` é definido com os seguintes campos:

- **nome**: `String` (obrigatório)  
  Nome do grupo de consumo.

- **alimentos**: `Array<AlimentoConsumidoSchema>`  
  Lista de alimentos consumidos dentro deste grupo.

## Validações

O modelo inclui uma validação para o campo `grupos`, que assegura que não haja grupos com nomes duplicados. Caso essa validação falhe, uma mensagem de erro será retornada.

## Exportação

O modelo `DietaDiariaModel` é exportado como o modelo Mongoose para a coleção `DietasDiarias`, permitindo que seja utilizado em outras partes da aplicação para operações de CRUD.