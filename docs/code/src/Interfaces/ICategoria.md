---
title: ICategoria
description: 'Interface que define a estrutura de uma categoria no sistema.'
---

# ICategoria

A interface `ICategoria` é utilizada para representar a estrutura de uma categoria no sistema. Ela estende a interface `Document`, que é parte do Mongoose, permitindo que a categoria seja tratada como um documento em um banco de dados MongoDB.

## Propriedades

- **codigo**: `number`  
  Representa o código único da categoria.

- **nome**: `string`  
  O nome da categoria.

- **urlPlaceholder**: `string`  
  Um URL que pode ser utilizado como um placeholder para a categoria.

- **criadoEm**: `Date`  
  A data em que a categoria foi criada.

- **atualizadoEm**: `Date | null` (opcional)  
  A data em que a categoria foi atualizada pela última vez. Este campo é opcional e pode ser nulo.

- **removidoEm**: `Date | null` (opcional)  
  A data em que a categoria foi removida. Este campo é opcional e pode ser nulo.