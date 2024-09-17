---
title: DiasSemana
description: 'Enumeração que representa os dias da semana.'
---

# DiasSemana

A enumeração `DiasSemana` define os dias da semana com seus respectivos nomes. Esta enumeração pode ser utilizada em diversas partes do sistema onde a identificação dos dias da semana é necessária.

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

A enumeração `DiasSemana` pode ser utilizada para garantir que apenas valores válidos sejam atribuídos a variáveis que representam dias da semana, melhorando a legibilidade e a manutenção do código.