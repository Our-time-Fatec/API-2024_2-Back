---
title: seed
description: 'Função para popular o banco de dados com dados iniciais de usuários, categorias e alimentos.'
---

# seed

A função `seedDatabase` é responsável por popular o banco de dados com dados iniciais, incluindo um usuário administrador, categorias de alimentos e uma lista de alimentos. Esta função deve ser executada uma única vez para garantir que os dados iniciais sejam inseridos no banco de dados.

## Estrutura da Função

### Importações

A função importa os seguintes módulos:

- **Categoria**: Modelo para manipulação de categorias de alimentos.
- **Alimento**: Modelo para manipulação de alimentos.
- **Usuario**: Modelo para manipulação de usuários.
- **Types**: Tipos do Mongoose.
- **criptografia**: Utilitário para criptografar senhas.

### Função `seedDatabase`

```typescript
async function seedDatabase() {
    // Lógica da função
}
```

#### Lógica da Função

1. **Criação do Usuário Administrador**:
   - Um objeto `userAdm` é criado com informações do administrador, incluindo nome, sobrenome, email e senha (criptografada).
   - A função verifica se já existem usuários no banco de dados. Se não houver, o usuário administrador é criado.

2. **Criação de Categorias**:
   - Um array de categorias é definido, contendo informações como código, nome e URL de um placeholder.
   - A função verifica se já existem categorias no banco de dados. Se não houver, as categorias são inseridas.

3. **Criação de Alimentos**:
   - Um array de alimentos é definido, onde cada alimento contém informações como nome, preparo, porção, código da categoria, ID do criador e detalhes nutricionais.
   - A função verifica se já existem alimentos no banco de dados. Se não houver, os alimentos são inseridos.

4. **Tratamento de Erros**:
   - A função possui um bloco `try-catch` para capturar e logar erros que possam ocorrer durante a execução.

### Exemplo de Uso

Para utilizar a função `seedDatabase`, basta importá-la e chamá-la em um contexto apropriado, como em um script de inicialização:

```typescript
import seedDatabase from './src/database/seed';

seedDatabase();
```

### Considerações Finais

- A função deve ser executada apenas uma vez para evitar duplicação de dados.
- É importante garantir que as variáveis de ambiente necessárias, como `ADMIN_PASSWORD`, estejam configuradas corretamente antes de executar a função.