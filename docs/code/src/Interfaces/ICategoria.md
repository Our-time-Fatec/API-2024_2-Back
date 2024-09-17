---
title: ICategoria
description: 'Interface que define a estrutura de uma categoria no sistema.'
---

# ICategoria

A interface `ICategoria` representa a estrutura de uma categoria no sistema. Ela estende a interface `Document`, que é parte do Mongoose, permitindo que a categoria seja utilizada como um documento em um banco de dados MongoDB.

## Propriedades

- **codigo**: `number`  
  O código único que identifica a categoria.

- **nome**: `string`  
  O nome da categoria.

- **urlPlaceholder**: `string`  
  Um URL que pode ser utilizado como um placeholder para a categoria.

- **criadoEm**: `Date`  
  A data em que a categoria foi criada.

- **atualizadoEm**: `Date | null` (opcional)  
  A data da última atualização da categoria. Este campo é opcional e pode ser `null`.

- **removidoEm**: `Date | null` (opcional)  
  A data em que a categoria foi removida. Este campo é opcional e pode ser `null`.