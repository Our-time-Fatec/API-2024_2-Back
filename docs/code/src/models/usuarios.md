---
title: usuarios
description: 'Modelo de dados para usuários, incluindo validações e transformações.'
---

# Modelo de Usuário

O arquivo `usuarios.ts` define o esquema do modelo de dados para usuários utilizando o Mongoose. Este modelo inclui diversas propriedades com validações específicas e transformações para a representação JSON.

## Estrutura do Esquema

O esquema `UsuarioSchema` é definido com as seguintes propriedades:

- **nome**: String, obrigatório.
- **sobrenome**: String, obrigatório.
- **email**: String, obrigatório, único, deve ser um formato de e-mail válido.
- **senha**: String, obrigatório, não incluído nas consultas por padrão.
- **dataDeNascimento**: Date, obrigatório.
- **peso**: Number, obrigatório.
- **altura**: Number, obrigatório.
- **nivelDeSedentarismo**: String, opcional, com valores possíveis:
  - Sedentário
  - Levemente ativo
  - Moderadamente ativo
  - Altamente ativo
  - Extremamente ativo
- **sexo**: String, opcional, com valores possíveis:
  - Masculino
  - Feminino
- **objetivo**: String, opcional, com valores possíveis:
  - Dieta de emagrecimento
  - Dieta de Ganho de Massa Muscular
  - Dieta Low Carb
- **IMC**: Number, opcional.
- **taxaMetabolismoBasal**: Number, opcional.
- **gastoDeCaloria**: Number, opcional.
- **ultimaVezUtilizado**: Date, padrão é a data atual.
- **criadoEm**: Date, padrão é a data atual.
- **atualizadoEm**: Date, padrão é null.
- **removidoEm**: Date, padrão é null.

## Validações

O campo **email** possui uma validação que utiliza uma expressão regular para garantir que o formato do e-mail seja válido. Caso contrário, uma mensagem de erro personalizada é retornada.

## Transformações

O esquema inclui uma transformação para o método `toJSON`, que altera a representação do documento ao ser convertido para JSON. O campo `_id` é substituído por `id`, e os campos `__v` e `_id` são removidos.

## Middleware

Um middleware `pre('save')` é utilizado para atualizar o campo `ultimaVezUtilizado` com a data atual sempre que um documento de usuário é salvo.

## Exportação

O modelo é exportado como `UsuarioModel`, que pode ser utilizado para interagir com a coleção "Usuarios" no banco de dados MongoDB.