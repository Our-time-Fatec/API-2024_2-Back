---
title: usuarioRoutes
description: 'Rotas para gerenciamento de usuários, incluindo criação, listagem, atualização e exclusão.'
---

# usuarioRoutes

Este arquivo define as rotas relacionadas ao gerenciamento de usuários na aplicação. Utiliza o framework Express para a criação de rotas e inclui middleware de autenticação para proteger algumas das rotas.

## Estrutura das Rotas

As seguintes rotas estão disponíveis:

- `POST /`: Cria um novo usuário.
- `GET /`: Lista todos os usuários (requer autenticação).
- `GET /me`: Obtém os detalhes do usuário autenticado (requer autenticação).
- `PUT /`: Atualiza os dados do usuário autenticado (requer autenticação).
- `PUT /agua`: Atualiza a quantidade de água do usuário (requer autenticação).
- `PUT /agua/zerar`: Zera a quantidade de água do usuário (requer autenticação).
- `GET /mydetails`: Obtém detalhes adicionais do usuário autenticado (requer autenticação).
- `DELETE /`: Exclui o usuário autenticado (requer autenticação).
- `PUT /editPassword`: Edita a senha do usuário (sem autenticação).
- `GET /verify`: Verifica o email do usuário (sem autenticação).

## Importações

O arquivo importa os seguintes módulos:

- `Router` do Express para definir as rotas.
- `controller` do `UsuarioController` para manipulação das requisições.
- `authMiddleware` para proteger as rotas que requerem autenticação.

## Exportação

As rotas são exportadas como um módulo padrão para serem utilizadas em outras partes da aplicação.