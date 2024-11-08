---
title: dietaFixa
description: 'Modelo de dados para a dieta fixa, incluindo detalhes nutricionais e grupos de alimentos.'
---

# dietaFixa

O arquivo `dietaFixa.ts` define o modelo de dados para a dieta fixa utilizando o Mongoose, uma biblioteca do Node.js para modelagem de dados MongoDB. Este modelo inclui esquemas para detalhes nutricionais, alimentos e grupos de alimentos.

## Estruturas de Dados

### DietaDetalhesSchema

Define os detalhes nutricionais de um alimento na dieta.

- **valorEnergetico**: Número, obrigatório.
- **proteinas**: Número, obrigatório.
- **carboidratos**: Número, obrigatório.
- **fibras**: Número, obrigatório.
- **lipidios**: Número, obrigatório.

### AlimentoSchema

Define a estrutura de um alimento na dieta.

- **alimentoId**: String, opcional.
- **nome**: String, obrigatório.
- **quantidade**: Número, obrigatório.
- **preparo**: String, obrigatório.
- **porcao**: Número, obrigatório.
- **categoriaCodigo**: String, obrigatório.
- **detalhes**: `DietaDetalhesSchema`, obrigatório.

### GrupoSchema

Define um grupo de alimentos na dieta.

- **nome**: String, obrigatório. Deve ser um dos seguintes valores: 'Café da Manhã', 'Almoço', 'Café da Tarde', 'Janta'.
- **alimentos**: Array de `AlimentoSchema`, obrigatório.

### DietaFixaSchema

Define a estrutura da dieta fixa.

- **usuarioId**: String, obrigatório.
- **diaSemana**: String, obrigatório. Deve ser um dos valores definidos em `DiasSemana`.
- **criadoEm**: Date, padrão é a data atual, obrigatório.
- **atualizadoEm**: Date, padrão é null, opcional.
- **removidoEm**: Date, padrão é null, opcional.
- **detalhes**: `DietaDetalhesSchema`, obrigatório.
- **grupos**: Array de `GrupoSchema`, obrigatório. Validação para garantir que os nomes dos grupos sejam únicos.

## Exportação

O modelo `DietaFixaModel` é exportado como um modelo Mongoose, permitindo a interação com a coleção 'DietasFixas' no MongoDB.

```typescript
const DietaFixaModel = model<IDietaFixa>('DietaFixa', DietaFixaSchema, 'DietasFixas');
export default DietaFixaModel;
```