---
title: DiasSemana
description: 'Enumeração que representa os dias da semana.'
---

# DiasSemana

A enumeração `DiasSemana` define os dias da semana com seus respectivos nomes. Esta enumeração pode ser utilizada para facilitar a manipulação e a validação de dados relacionados a dias da semana em aplicações.

## Enumeração

```typescript
export enum DiasSemana {
    Domingo = "Domingo",
    Segunda = "Segunda-feira",
    Terca = "Terça-feira",
    Quarta = "Quarta-feira",
    Quinta = "Quinta-feira",
    Sexta = "Sexta-feira",
    Sabado = "Sábado",
}
```

### Valores

- **Domingo**: Representa o primeiro dia da semana.
- **Segunda-feira**: Representa o segundo dia da semana.
- **Terça-feira**: Representa o terceiro dia da semana.
- **Quarta-feira**: Representa o quarto dia da semana.
- **Quinta-feira**: Representa o quinto dia da semana.
- **Sexta-feira**: Representa o sexto dia da semana.
- **Sábado**: Representa o sétimo dia da semana.

## Uso

A enumeração `DiasSemana` pode ser utilizada em diversas partes da aplicação, como em validações, exibições de dados e lógica de negócios que envolvem dias da semana. Por exemplo:

```typescript
function verificarDia(dia: DiasSemana) {
    if (dia === DiasSemana.Segunda) {
        console.log("Hoje é segunda-feira!");
    }
}
```

Essa enumeração proporciona uma maneira clara e tipada de trabalhar com os dias da semana, evitando o uso de strings literais e possíveis erros de digitação.