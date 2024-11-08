---
title: usuarios
description: 'Modelo de dados para usuários, incluindo validações e estrutura de dados.'
---

# Modelo de Usuário

O arquivo `usuarios.ts` define o modelo de dados para usuários utilizando o Mongoose, uma biblioteca do Node.js para modelagem de dados MongoDB. Este modelo inclui diversas propriedades com validações específicas.

## Estrutura do Modelo

### Schema de Água

O `AguaSchema` é um subdocumento que armazena informações sobre a ingestão de água do usuário.

- **aguaIngerida**: Número que representa a quantidade de água ingerida. O valor padrão é 0.
- **atualizacao**: Data da última atualização, com valor padrão sendo a data atual.

### Schema de Usuário

O `UsuarioSchema` contém as seguintes propriedades:

- **nome**: String, obrigatório.
- **sobrenome**: String, obrigatório.
- **email**: String, obrigatório, deve ser único e em formato de e-mail válido.
- **senha**: String, obrigatório, não é retornado nas consultas.
- **dataDeNascimento**: Date, obrigatório.
- **idade**: Number.
- **peso**: Number, obrigatório.
- **altura**: Number, obrigatório.
- **nivelDeSedentarismo**: String, enum com opções de níveis de atividade.
- **sexo**: String, enum com opções "Masculino" e "Feminino".
- **objetivo**: String, enum com opções de dieta.
- **IMC**: Number.
- **taxaMetabolismoBasal**: Number.
- **gastoDeCaloria**: Number.
- **consumoDeCaloriaPorDia**: Number.
- **ultimaVezUtilizado**: Date, com valor padrão sendo a data atual.
- **criadoEm**: Date, com valor padrão sendo a data atual.
- **atualizadoEm**: Date, padrão é null.
- **removidoEm**: Date, padrão é null.
- **metaAgua**: Number.
- **agua**: Subdocumento do tipo `AguaSchema`.

## Transformação de Dados

O modelo inclui uma transformação para o método `toJSON`, que altera a estrutura do objeto retornado, removendo os campos `_id` e `__v`, e adicionando um campo `id`.

## Middleware

Um middleware `pre` é definido para o evento `save`, que atualiza a propriedade `ultimaVezUtilizado` com a data atual sempre que um usuário é salvo.

## Exportação

O modelo é exportado como `UsuarioModel`, que pode ser utilizado para interagir com a coleção "Usuarios" no MongoDB.