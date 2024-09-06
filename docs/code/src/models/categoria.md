---
title: categoria
description: 'Modelo de dados para a entidade Categoria utilizando Mongoose.'
---

# categoria

Este arquivo define o modelo de dados para a entidade **Categoria** utilizando a biblioteca Mongoose. O modelo especifica a estrutura e as regras de validação para os documentos da coleção **Categorias** no banco de dados.

## Estrutura do Modelo

O modelo **Categoria** é definido através de um esquema (`Schema`) que inclui os seguintes campos:

- **codigo**: 
  - Tipo: `Number`
  - Requerido: `true`
  - Descrição: Código único que identifica a categoria.

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
  - Descrição: Data da última atualização da categoria. Inicialmente nula.

- **removidoEm**: 
  - Tipo: `Date`
  - Padrão: `null`
  - Descrição: Data em que a categoria foi removida. Inicialmente nula.

## Exportação

O modelo **Categoria** é exportado como um modelo Mongoose, permitindo que ele seja utilizado em outras partes da aplicação para interagir com a coleção **Categorias** no banco de dados.

```typescript
const Categoria = mongoose.model<ICategoria>('Categoria', CategoriaSchema, 'Categorias');
export default Categoria;
```