---
title: categoria
description: 'Modelo de dados para a entidade Categoria utilizando Mongoose.'
---

# categoria

O arquivo `categoria.ts` define o modelo de dados para a entidade `Categoria` utilizando a biblioteca Mongoose. Este modelo é utilizado para interagir com a coleção `Categorias` no banco de dados MongoDB.

## Estrutura do Modelo

O modelo `Categoria` é definido através de um esquema (`Schema`) que especifica os campos e suas propriedades. Abaixo estão os campos definidos no esquema:

- **codigo**: 
  - Tipo: `Number`
  - Requerido: `true`
  - Descrição: Código único para identificar a categoria.

- **nome**: 
  - Tipo: `String`
  - Requerido: `true`
  - Descrição: Nome da categoria.

- **urlPlaceholder**: 
  - Tipo: `String`
  - Requerido: `true`
  - Descrição: URL placeholder associado à categoria.

- **criadoEm**: 
  - Tipo: `Date`
  - Padrão: `Date.now`
  - Descrição: Data de criação da categoria. É automaticamente definida para a data atual.

- **atualizadoEm**: 
  - Tipo: `Date`
  - Padrão: `null`
  - Descrição: Data da última atualização da categoria. Inicialmente é `null`.

- **removidoEm**: 
  - Tipo: `Date`
  - Padrão: `null`
  - Descrição: Data em que a categoria foi removida. Inicialmente é `null`.

## Exportação

O modelo `Categoria` é exportado como padrão, permitindo que seja utilizado em outras partes da aplicação para realizar operações de CRUD (Create, Read, Update, Delete) na coleção `Categorias`. 

```typescript
const Categoria = mongoose.model<ICategoria>('Categoria', CategoriaSchema, 'Categorias');
export default Categoria;
``` 

## Dependências

Este arquivo depende da interface `ICategoria`, que deve ser definida em `../Interfaces/ICategoria`, garantindo que o modelo siga a estrutura esperada para a categoria.