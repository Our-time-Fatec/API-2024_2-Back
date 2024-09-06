---
title: seed
description: 'Função para popular o banco de dados com dados iniciais de usuários, categorias e alimentos.'
---

# seed

A função `seedDatabase` é responsável por popular o banco de dados com dados iniciais, incluindo um usuário administrador, categorias de alimentos e alimentos em si. Esta função deve ser executada uma única vez para garantir que os dados iniciais sejam inseridos no banco de dados.

## Estrutura da Função

A função realiza as seguintes operações:

1. **Criação do Usuário Administrador**:
   - Verifica se já existe um usuário no banco de dados. Se não houver, cria um usuário administrador com informações predefinidas, incluindo nome, sobrenome, email e senha criptografada.

2. **Inserção de Categorias**:
   - Define um conjunto de categorias de alimentos. Se não houver categorias existentes no banco de dados, insere as categorias predefinidas.

3. **Inserção de Alimentos**:
   - Define um conjunto de alimentos com informações como nome, preparo, porção e detalhes nutricionais. Se não houver alimentos existentes no banco de dados, insere os alimentos predefinidos.

4. **Tratamento de Erros**:
   - Caso ocorra algum erro durante o processo de inserção, a função captura e exibe uma mensagem de erro.

## Exemplo de Uso

Para utilizar a função `seedDatabase`, você deve importá-la e chamá-la em um contexto apropriado, como em um script de inicialização do banco de dados.

```javascript
import seedDatabase from './src/database/seed';

seedDatabase();
```

## Dependências

A função depende das seguintes entidades e utilitários:
- Modelos: `Usuario`, `Categoria`, `Alimento`
- Utilitário: `criptografia` para a criptografia da senha do usuário administrador
- Biblioteca: `mongoose` para interações com o banco de dados MongoDB

## Considerações Finais

Certifique-se de que a função `seedDatabase` seja executada apenas em um ambiente de desenvolvimento ou em um banco de dados que pode ser reinicializado, pois a execução repetida pode causar duplicação de dados ou erros.