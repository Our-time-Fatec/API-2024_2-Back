---
title: dietaDiaria
description: 'Modelo Mongoose para a representação de uma dieta diária, incluindo grupos e alimentos consumidos.'
---

# dietaDiaria

O arquivo `dietaDiaria.ts` define o modelo Mongoose para a coleção de dietas diárias. Este modelo é utilizado para armazenar informações sobre a dieta de um usuário em um determinado dia da semana, incluindo detalhes sobre os grupos de alimentos consumidos.

## Estrutura do Modelo

### Schemas

1. **GruposConsumidosSchema**
   - **nome**: `String` (obrigatório) - Nome do grupo de consumo.
   - **alimentos**: `Array` de `AlimentoConsumidoSchema` - Lista de alimentos consumidos nesse grupo.

2. **DietaDiariaSchema**
   - **usuarioId**: `String` (obrigatório) - Identificador do usuário associado à dieta.
   - **diaSemana**: `String` (obrigatório) - Dia da semana em que a dieta é aplicada, deve ser um dos valores definidos em `DiasSemana`.
   - **dia**: `Date` (obrigatório) - Data específica da dieta.
   - **detalhes**: `DietaDetalhesSchema` (obrigatório) - Detalhes adicionais sobre a dieta.
   - **removidoEm**: `Date` (opcional) - Data em que a dieta foi removida, se aplicável.
   - **grupos**: `Array` de `GrupoSchema` (obrigatório) - Lista de grupos de alimentos, que não podem ter nomes duplicados.
   - **gruposConsumo**: `Array` de `GruposConsumidosSchema` - Lista de grupos de consumo associados à dieta.

### Validação

A validação do campo `grupos` garante que os nomes dos grupos não se repitam, utilizando um `Set` para verificar a unicidade.

## Exportação

O modelo `DietaDiariaModel` é exportado como o modelo Mongoose para a coleção `DietasDiarias`, permitindo a interação com a base de dados para operações de CRUD (Create, Read, Update, Delete).