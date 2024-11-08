---
title: categoria
description: 'Modelo de dados para a entidade Categoria utilizando Mongoose.'
---

# categoria

Este arquivo define o modelo de dados para a entidade **Categoria** utilizando o Mongoose, uma biblioteca do Node.js que facilita a interação com o MongoDB.

## Estrutura do Modelo

O modelo **Categoria** é definido através de um esquema (Schema) que especifica os campos e suas propriedades. Abaixo estão os campos que compõem o modelo:

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
  - Descrição: URL de um placeholder associado à categoria.

- **criadoEm**: 
  - Tipo: `Date`
  - Padrão: `Date.now`
  - Descrição: Data de criação da categoria. Se não fornecida, será preenchida automaticamente com a data atual.

- **atualizadoEm**: 
  - Tipo: `Date`
  - Padrão: `null`
  - Descrição: Data da última atualização da categoria. Inicialmente nula.

- **removidoEm**: 
  - Tipo: `Date`
  - Padrão: `null`
  - Descrição: Data em que a categoria foi removida. Inicialmente nula.

## Exportação

O modelo **Categoria** é exportado como um modelo Mongoose, permitindo que ele seja utilizado em outras partes da aplicação para realizar operações de CRUD (Create, Read, Update, Delete) no banco de dados MongoDB.

```typescript
const Categoria = mongoose.model<ICategoria>('Categoria', CategoriaSchema, 'Categorias');
export default Categoria;
``` 

## Dependências

Este arquivo depende da interface `ICategoria`, que deve ser definida no arquivo `src/Interfaces/ICategoria.ts`. A interface especifica a estrutura esperada para os dados da categoria, garantindo a integridade dos dados ao interagir com o banco de dados.