---
title: ICategoria
description: 'Interface que define a estrutura de uma categoria no sistema.'
---

# ICategoria

A interface `ICategoria` representa a estrutura de uma categoria no sistema. Ela estende a interface `Document`, o que significa que é compatível com a estrutura de documentos do MongoDB.

## Propriedades

- **codigo**: `number`  
  O código único que identifica a categoria.

- **nome**: `string`  
  O nome da categoria.

- **urlPlaceholder**: `string`  
  Um URL que pode ser usado como um placeholder para a categoria.

- **criadoEm**: `Date`  
  A data em que a categoria foi criada.

- **atualizadoEm**: `Date | null` (opcional)  
  A data em que a categoria foi atualizada pela última vez. Este campo pode ser nulo.

- **removidoEm**: `Date | null` (opcional)  
  A data em que a categoria foi removida. Este campo pode ser nulo.