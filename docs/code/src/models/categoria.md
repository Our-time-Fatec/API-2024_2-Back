---
title: categoria
description: 'Modelo de dados para a entidade Categoria utilizando Mongoose.'
---

# categoria

Este arquivo define o modelo de dados para a entidade **Categoria** utilizando o Mongoose, uma biblioteca do Node.js que facilita a interação com o MongoDB.

## Estrutura do Modelo

O modelo `Categoria` é definido através de um esquema (`Schema`) que especifica os campos e suas propriedades. Abaixo estão os detalhes dos campos:

- **codigo**: 
  - Tipo: `Number`
  - Requerido: `true`
  - Descrição: Código único da categoria.

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

O modelo `Categoria` é exportado como um modelo Mongoose, permitindo que ele seja utilizado em outras partes da aplicação para realizar operações de CRUD (Create, Read, Update, Delete) na coleção `Categorias`.

```typescript
const Categoria = mongoose.model<ICategoria>('Categoria', CategoriaSchema, 'Categorias');
export default Categoria;
``` 

## Dependências

Este modelo depende da interface `ICategoria`, que deve ser definida no arquivo `src/Interfaces/ICategoria.ts`. A interface deve especificar a estrutura esperada para os dados da categoria.