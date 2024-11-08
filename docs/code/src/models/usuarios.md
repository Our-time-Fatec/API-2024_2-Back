---
title: usuarios
description: 'Modelo de dados para usuários, incluindo validações e estrutura de dados.'
---

# Modelo de Usuário

O arquivo `usuarios.ts` define o modelo de dados para usuários utilizando o Mongoose, uma biblioteca do Node.js para modelagem de dados MongoDB. Este modelo inclui diversas propriedades com validações específicas.

## Estrutura do Modelo

### Esquema de Água

```typescript
const AguaSchema = new Schema<IAgua>({
  aguaIngerida: {
    type: Number,
    default: 0,
  },
  atualizacao: { 
    type: Date, 
    default: Date.now 
  } 
});
```

- **aguaIngerida**: Número que representa a quantidade de água ingerida, com valor padrão de 0.
- **atualizacao**: Data da última atualização, com valor padrão da data atual.

### Esquema de Usuário

```typescript
const UsuarioSchema = new Schema<IUsuario>({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  sobrenome: {
    type: String,
    required: [true, "Sobrenome é obrigatório"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "O e-mail é obrigatório"],
    validate: {
      validator: function (value: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
      },
      message: (props: any) =>
        `${props.value} não é um formato de e-mail válido`,
    },
  },
  senha: {
    type: String,
    select: false,
    trim: true,
    required: [true, "A senha é obrigatória"],
  },
  dataDeNascimento: {
    type: Date,
    required: [true, "Preencha sua idade"],
  },
  idade: {
    type: Number,
  },
  peso: {
    type: Number,
    required: [true, "Preencha seu peso"],
  },
  altura: {
    type: Number,
    required: [true, "Preencha sua altura"],
  },
  nivelDeSedentarismo: {
    type: String,
    enum: [
      "Sedentário",
      "Levemente ativo",
      "Moderadamente ativo",
      "Altamente ativo",
      "Extremamente ativo",
    ],
  },
  sexo: {
    type: String,
    enum: ["Masculino", "Feminino"],
  },
  objetivo: {
    type: String,
    enum: [
      "Dieta de emagrecimento",
      "Dieta de Ganho de Massa Muscular",
      "Dieta Low Carb",
    ],
  },
  IMC: {
    type: Number,
  },
  taxaMetabolismoBasal: {
    type: Number,
  },
  gastoDeCaloria: {
    type: Number,
  },
  consumoDeCaloriaPorDia: {
    type: Number,
  },
  ultimaVezUtilizado: {
    type: Date,
    default: Date.now,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
  atualizadoEm: {
    type: Date,
    default: null,
  },
  removidoEm: {
    type: Date,
    default: null,
  },
  metaAgua: {
    type: Number,
  },
  agua: {
    type: AguaSchema,
  }
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});
```

#### Propriedades

- **nome**: Nome do usuário (obrigatório).
- **sobrenome**: Sobrenome do usuário (obrigatório).
- **email**: E-mail do usuário (obrigatório, único, com validação de formato).
- **senha**: Senha do usuário (obrigatório, não retornada em consultas).
- **dataDeNascimento**: Data de nascimento do usuário (obrigatório).
- **idade**: Idade do usuário.
- **peso**: Peso do usuário (obrigatório).
- **altura**: Altura do usuário (obrigatório).
- **nivelDeSedentarismo**: Nível de sedentarismo do usuário (opções pré-definidas).
- **sexo**: Sexo do usuário (opções pré-definidas).
- **objetivo**: Objetivo da dieta do usuário (opções pré-definidas).
- **IMC**: Índice de Massa Corporal do usuário.
- **taxaMetabolismoBasal**: Taxa de metabolismo basal do usuário.
- **gastoDeCaloria**: Gasto calórico do usuário.
- **consumoDeCaloriaPorDia**: Consumo calórico diário do usuário.
- **ultimaVezUtilizado**: Data da última utilização do usuário (padrão: data atual).
- **criadoEm**: Data de criação do registro (padrão: data atual).
- **atualizadoEm**: Data da última atualização do registro.
- **removidoEm**: Data de remoção do registro.
- **metaAgua**: Meta de ingestão de água do usuário.
- **agua**: Subdocumento que contém informações sobre a ingestão de água.

### Middleware

```typescript
UsuarioSchema.pre("save", function (next) {
  this.ultimaVezUtilizado = new Date();
  next();
});
```

- O middleware `pre("save")` atualiza a propriedade `ultimaVezUtilizado` com a data atual sempre que um usuário é salvo.

### Exportação do Modelo

```typescript
const UsuarioModel = mongoose.model<IUsuario>("Usuario", UsuarioSchema, "Usuarios");
export default UsuarioModel;
```

- O modelo `UsuarioModel` é exportado para ser utilizado em outras partes da aplicação. Ele é associado à coleção "Usuarios" no MongoDB.