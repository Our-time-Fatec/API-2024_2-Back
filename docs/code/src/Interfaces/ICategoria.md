---
title: ICategoria
description: 'Interface que define a estrutura de uma categoria no sistema.'
---

# ICategoria

A interface `ICategoria` é utilizada para definir a estrutura de uma categoria no sistema. Ela estende a interface `Document`, que é parte do Mongoose, permitindo que a categoria seja tratada como um documento em um banco de dados MongoDB.

## Propriedades

- **codigo**: `number`  
  Representa o código único da categoria.

- **nome**: `string`  
  Nome da categoria.

- **urlPlaceholder**: `string`  
  URL de um placeholder associado à categoria.

- **criadoEm**: `Date`  
  Data em que a categoria foi criada.

- **atualizadoEm**: `Date | null` (opcional)  
  Data da última atualização da categoria. Este campo é opcional e pode ser nulo.

- **removidoEm**: `Date | null` (opcional)  
  Data em que a categoria foi removida. Este campo é opcional e pode ser nulo.