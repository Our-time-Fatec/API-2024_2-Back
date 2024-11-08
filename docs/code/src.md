---
title: src
description: 'Diretório principal contendo a lógica da aplicação, incluindo controladores, modelos, rotas e utilitários.'
---

# src

O diretório `src` é o núcleo da aplicação, onde reside toda a lógica de negócio. Ele contém subdiretórios organizados que facilitam a manutenção e a escalabilidade do código. Abaixo está uma descrição dos principais componentes encontrados neste diretório:

## Estrutura do Diretório

- **controllers**: Contém os controladores que gerenciam a lógica de entrada e saída da aplicação, manipulando as requisições e respostas.
- **database**: Inclui arquivos relacionados à conexão com o banco de dados e scripts de seed para popular a base de dados.
- **enums**: Define enums utilizados em toda a aplicação, como dias da semana.
- **func**: Contém funções utilitárias que são utilizadas em diferentes partes da aplicação.
- **models**: Define os modelos de dados que representam as entidades da aplicação.
- **middlewares**: Inclui middlewares que interceptam requisições para realizar validações ou manipulações antes de chegar aos controladores.
- **Interfaces**: Define interfaces TypeScript que descrevem a forma dos objetos utilizados na aplicação.
- **routes**: Contém as definições das rotas da aplicação, mapeando URLs para os controladores correspondentes.
- **utils**: Inclui funções utilitárias que fornecem funcionalidades auxiliares, como criptografia e cálculos relacionados a dietas.
- **__tests__**: Contém os testes automatizados da aplicação, garantindo que a lógica funcione conforme o esperado.
- **types**: Define tipos TypeScript personalizados utilizados em toda a aplicação.

## Considerações Finais

A organização do diretório `src` é fundamental para a clareza e a eficiência do desenvolvimento. Cada subdiretório tem um propósito específico, permitindo que os desenvolvedores localizem rapidamente o código necessário e mantenham a aplicação de forma eficaz.