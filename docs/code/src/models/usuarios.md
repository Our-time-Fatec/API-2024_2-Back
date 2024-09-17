---
title: usuarios
description: 'Modelo de dados para usuários, incluindo validações e transformações.'
---

# Modelo de Usuário

O arquivo `usuarios.ts` define o modelo de dados para usuários utilizando o Mongoose, uma biblioteca do Node.js para modelagem de dados MongoDB. Este modelo inclui diversas propriedades com validações e transformações específicas.

## Estrutura do Modelo

O modelo `UsuarioSchema` é definido com as seguintes propriedades:

- **nome**: String, obrigatório.
- **sobrenome**: String, obrigatório.
- **email**: String, obrigatório, único, deve ser um formato de e-mail válido.
- **senha**: String, obrigatório, não é retornado nas consultas.
- **dataDeNascimento**: Date, obrigatório.
- **idade**: Number, opcional.
- **peso**: Number, obrigatório.
- **altura**: Number, obrigatório.
- **nivelDeSedentarismo**: String, opcional, deve ser um dos valores: "Sedentário", "Levemente ativo", "Moderadamente ativo", "Altamente ativo", "Extremamente ativo".
- **sexo**: String, opcional, deve ser "Masculino" ou "Feminino".
- **objetivo**: String, opcional, deve ser um dos valores: "Dieta de emagrecimento", "Dieta de Ganho de Massa Muscular", "Dieta Low Carb".
- **IMC**: Number, opcional.
- **taxaMetabolismoBasal**: Number, opcional.
- **gastoDeCaloria**: Number, opcional.
- **consumoDeCaloriaPorDia**: Number, opcional.
- **ultimaVezUtilizado**: Date, padrão é a data atual.
- **criadoEm**: Date, padrão é a data atual.
- **atualizadoEm**: Date, padrão é `null`.
- **removidoEm**: Date, padrão é `null`.

## Validações

O campo **email** possui uma validação que utiliza uma expressão regular para garantir que o formato do e-mail seja válido. Caso contrário, uma mensagem de erro personalizada é retornada.

## Transformações

O modelo inclui uma transformação para o método `toJSON`, que altera a estrutura do objeto retornado, removendo os campos `_id` e `__v`, e adicionando um campo `id` que corresponde ao `_id`.

## Middleware

Um middleware `pre('save')` é utilizado para atualizar o campo `ultimaVezUtilizado` com a data atual sempre que um documento de usuário é salvo.

## Exportação

O modelo é exportado como `UsuarioModel`, que pode ser utilizado em outras partes da aplicação para interagir com a coleção "Usuarios" no MongoDB.