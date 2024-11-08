---
title: usuarioRoutes
description: 'Definição das rotas para gerenciamento de usuários na aplicação.'
---

# usuarioRoutes

Este arquivo contém a definição das rotas relacionadas ao gerenciamento de usuários na aplicação. Utiliza o framework Express para criar as rotas e integra-se com o controlador de usuários e middleware de autenticação.

## Estrutura das Rotas

As rotas definidas neste arquivo são as seguintes:

- `POST /`: Cria um novo usuário.
- `GET /`: Lista todos os usuários (requer autenticação).
- `GET /me`: Obtém os detalhes do usuário autenticado (requer autenticação).
- `PUT /`: Atualiza as informações do usuário autenticado (requer autenticação).
- `PUT /agua`: Atualiza a quantidade de água do usuário autenticado (requer autenticação).
- `PUT /agua/zerar`: Zera a quantidade de água do usuário autenticado (requer autenticação).
- `GET /mydetails`: Obtém detalhes adicionais do usuário autenticado (requer autenticação).
- `DELETE /`: Deleta o usuário autenticado (requer autenticação).
- `PUT /editPassword`: Edita a senha do usuário (sem necessidade de autenticação).
- `GET /verify`: Verifica o email do usuário (sem necessidade de autenticação).

## Importações

O arquivo importa os seguintes módulos:

- `Router` do Express para definir as rotas.
- `controller` do `UsuarioController` para manipulação das requisições.
- `authMiddleware` para proteger as rotas que requerem autenticação.

## Exportação

As rotas são exportadas como um módulo padrão, permitindo que sejam utilizadas em outras partes da aplicação.