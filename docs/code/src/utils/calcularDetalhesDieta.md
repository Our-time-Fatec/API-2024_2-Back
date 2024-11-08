---
title: calcularDetalhesDieta
description: 'Função para calcular detalhes nutricionais de uma dieta com base em grupos de alimentos.'
---

# calcularDetalhesDieta

A função `calcularDetalhesDieta` é responsável por calcular os detalhes nutricionais de uma dieta, agrupando os alimentos e somando suas propriedades nutricionais.

## Parâmetros

A função recebe um parâmetro:

- `grupos`: Um array de objetos, onde cada objeto representa um grupo de alimentos. Cada grupo contém:
  - `nome`: O nome do grupo.
  - `alimentos`: Um array de objetos, onde cada objeto contém:
    - `alimentoId`: O ID do alimento.
    - `porcao`: A porção do alimento.
    - `quantidade`: A quantidade do alimento.

## Retorno

A função retorna uma Promise que resolve para um objeto contendo:

- `gruposCompletos`: Um array de grupos com os alimentos completos, incluindo detalhes nutricionais.
- `dietaDetalhes`: Um objeto com os totais nutricionais da dieta, incluindo:
  - `valorEnergetico`: Total de calorias.
  - `proteinas`: Total de proteínas.
  - `carboidratos`: Total de carboidratos.
  - `fibras`: Total de fibras.
  - `lipidios`: Total de lipídios.

## Exceções

A função lança um erro se algum alimento não for encontrado no banco de dados, com a mensagem: `Alimento com ID {alimentoId} não encontrado.`

## Exemplo de Uso

```typescript
const grupos = [
    {
        nome: "Café da Manhã",
        alimentos: [
            { alimentoId: "1", porcao: 100, quantidade: 2 },
            { alimentoId: "2", porcao: 50, quantidade: 1 }
        ]
    }
];

calcularDetalhesDieta(grupos)
    .then(({ gruposCompletos, dietaDetalhes }) => {
        console.log(gruposCompletos);
        console.log(dietaDetalhes);
    })
    .catch(error => {
        console.error(error);
    });
```