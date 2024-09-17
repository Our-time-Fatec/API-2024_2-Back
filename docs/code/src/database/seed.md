
---
title: seed
description: 'Função para popular o banco de dados com dados iniciais de usuários, categorias e alimentos.'
---

# seed

A função `seedDatabase` é responsável por popular o banco de dados com dados iniciais, incluindo um usuário administrador, categorias de alimentos e alimentos em si. Esta função deve ser executada uma única vez para garantir que os dados não sejam duplicados.

## Estrutura da Função

A função realiza as seguintes operações:

1. **Criação do Usuário Administrador**:
   - Verifica se já existem usuários no banco de dados.
   - Se não houver, cria um usuário administrador com informações predefinidas, incluindo nome, sobrenome, email e senha criptografada.

2. **Inserção de Categorias**:
   - Define um conjunto de categorias de alimentos.
   - Verifica se já existem categorias no banco de dados.
   - Se não houver, insere as categorias definidas.

3. **Inserção de Alimentos**:
   - Define um conjunto de alimentos com informações como nome, preparo, porção, categoria e detalhes nutricionais.
   - Verifica se já existem alimentos no banco de dados.
   - Se não houver, insere os alimentos definidos.

4. **Tratamento de Erros**:
   - A função inclui um bloco `try-catch` para capturar e logar erros que possam ocorrer durante a execução.

## Uso

Para utilizar a função, basta importá-la e chamá-la em um contexto apropriado, como durante a inicialização da aplicação:

```javascript
import seedDatabase from './src/database/seed';

// Chame a função para popular o banco de dados
seedDatabase();
```

## Considerações

- Certifique-se de que a função seja chamada apenas uma vez para evitar a duplicação de dados.
- As credenciais do usuário administrador devem ser configuradas através de variáveis de ambiente para maior segurança.
