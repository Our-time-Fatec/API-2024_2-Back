---
title: dietaFixa
description: 'Modelo de dados para Dieta Fixa utilizando Mongoose.'
---

# dietaFixa

O arquivo `dietaFixa.ts` define o modelo de dados para uma dieta fixa utilizando o Mongoose, uma biblioteca do Node.js que facilita a interação com o MongoDB. Este modelo inclui a definição de esquemas para detalhes da dieta, alimentos e grupos de alimentos.

## Estruturas de Dados

### DietaDetalhesSchema

Define os detalhes nutricionais de uma dieta.

```typescript
const DietaDetalhesSchema = new Schema<IDietaDetalhes>({
    valorEnergetico: { type: Number, required: true },
    proteinas: { type: Number, required: true },
    carboidratos: { type: Number, required: true },
    fibras: { type: Number, required: true },
    lipidios: { type: Number, required: true },
});
```

### AlimentoSchema

Define a estrutura de um alimento dentro da dieta.

```typescript
const AlimentoSchema = new Schema<IAlimentoDieta>({
    alimentoId: { type: String },
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true },
    preparo: { type: String, required: true },
    porcao: { type: Number, required: true },
    categoriaCodigo: { type: String, required: true },
    detalhes: { type: DietaDetalhesSchema, required: true },
});
```

### GrupoSchema

Define um grupo de alimentos, que pode incluir múltiplos alimentos.

```typescript
const GrupoSchema = new Schema<IGrupo>({
    nome: {
        type: String,
        required: true,
        enum: ['Café da Manhã', 'Almoço', 'Café da Tarde', 'Janta'],
    },
    alimentos: { type: [AlimentoSchema], required: true },
});
```

### DietaFixaSchema

Define a estrutura principal da dieta fixa.

```typescript
const DietaFixaSchema = new Schema<IDietaFixa>({
    usuarioId: { type: String, required: true },
    diaSemana: { type: String, enum: Object.values(DiasSemana), required: true },
    criadoEm: { type: Date, default: Date.now, required: true },
    atualizadoEm: { type: Date, default: null, required: false },
    removidoEm: { type: Date, default: null, required: false },
    detalhes: { type: DietaDetalhesSchema, required: true },
    grupos: {
        type: [GrupoSchema],
        required: true,
        validate: {
            validator: (v: IGrupo[]) => {
                const nomesUnicos = new Set(v.map(grupo => grupo.nome));
                return nomesUnicos.size === v.length;
            },
            message: 'Os grupos na dieta não podem se repetir.',
        },
    },
});
```

## Exportação do Modelo

O modelo `DietaFixa` é exportado para ser utilizado em outras partes da aplicação.

```typescript
const DietaFixaModel = model<IDietaFixa>('DietaFixa', DietaFixaSchema, 'DietasFixas');

export default DietaFixaModel;
```

## Considerações

- O esquema garante que os grupos de alimentos não se repitam na dieta.
- Os campos `criadoEm`, `atualizadoEm` e `removidoEm` são utilizados para controle de versão e histórico da dieta.
- O uso de enums para `diaSemana` assegura que apenas dias válidos sejam utilizados.