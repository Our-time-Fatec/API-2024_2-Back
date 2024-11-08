---
title: seed
description: 'Função para popular o banco de dados com dados iniciais de usuários, categorias e alimentos.'
---

# seed

A função `seedDatabase` é responsável por popular o banco de dados com dados iniciais, incluindo um usuário administrador, categorias de alimentos e registros de alimentos. Esta função deve ser executada uma única vez para garantir que os dados iniciais sejam inseridos corretamente.

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
   - Um objeto `userAdm` é criado com informações do administrador, incluindo nome, sobrenome, email e senha criptografada.
   - A senha é criptografada utilizando a função `criptografarSenha`.

2. **Verificação de Usuários Existentes**:
   - A função verifica se já existem usuários no banco de dados. Se não houver, o usuário administrador é criado.

3. **Definição de Categorias**:
   - Um array de categorias é definido, cada uma com um código, nome e URL de placeholder.
   - A função verifica se já existem categorias no banco de dados. Se não houver, as categorias são inseridas.

4. **Definição de Alimentos**:
   - Um array de alimentos é definido, cada um com nome, preparo, porção, código da categoria, ID do criador e detalhes nutricionais.
   - A função verifica se já existem alimentos no banco de dados. Se não houver, os alimentos são inseridos.

5. **Log de Sucesso ou Erro**:
   - Um log é exibido no console indicando se o banco de dados foi populado com sucesso ou se ocorreu um erro.

## Exemplo de Uso

Para utilizar a função, basta importá-la e chamá-la em um contexto apropriado, como em um script de inicialização:

```typescript
import seedDatabase from './src/database/seed';

seedDatabase();
```

## Considerações Finais

- Esta função deve ser utilizada com cautela, pois insere dados diretamente no banco de dados.
- É recomendável executar a função em um ambiente de desenvolvimento ou teste antes de utilizá-la em produção.