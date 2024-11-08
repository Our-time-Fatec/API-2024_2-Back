
---
title: routes.test.ts
description: 'Testes para as rotas da aplicação, incluindo autenticação, usuários, alimentos e dietas.'
---

# Testes das Rotas

Este arquivo contém testes automatizados para as rotas da aplicação, utilizando a biblioteca `supertest` para simular requisições HTTP. Os testes abrangem funcionalidades de autenticação, gerenciamento de usuários, alimentos e dietas.

## Estrutura dos Testes

Os testes estão organizados em diferentes descrições (`describe`) que agrupam os testes relacionados a cada funcionalidade. Cada teste é implementado utilizando a função `it`, que descreve o que está sendo testado.

### Configuração Inicial

Antes de todos os testes, a conexão com o banco de dados de teste é estabelecida e um usuário é autenticado para obter um token de autenticação.

```typescript
beforeAll(async () => {
    await connectTestDB();
    const loginResponse = await request(app).post("/auth/login").send({
        email: "sales@gmail.com",
        senha: "123123",
    });
    generalAuthToken = loginResponse.body.token;
});
```

Após todos os testes, a conexão com o banco de dados é desconectada.

```typescript
afterAll(async () => {
    await disconnectTestDB();
});
```

### Testes de Rotas

#### Rotas de Usuário

Os testes para as rotas de usuário incluem a criação, atualização e deleção de usuários, além de verificações de autenticação.

```typescript
describe("Testando as rotas de Usuário", () => {
    it("Deve criar um usuário com sucesso e medir o tempo de resposta", async () => {
        // Teste de criação de usuário
    });
    // Outros testes...
});
```

#### Rotas de Autenticação

Os testes de autenticação verificam se o login e a validação de usuários estão funcionando corretamente.

```typescript
describe("Testando rotas de Autenticação", () => {
    it("Deve retornar um erro por não encontrar o usuário", async () => {
        // Teste de erro de autenticação
    });
    // Outros testes...
});
```

#### Rotas de Alimento

Os testes para as rotas de alimento incluem a criação, listagem, atualização e deleção de alimentos.

```typescript
describe("Testando as rotas de Alimento", () => {
    it("Deve criar um alimento com sucesso", async () => {
        // Teste de criação de alimento
    });
    // Outros testes...
});
```

#### Rotas de Alimento Consumido

Os testes para as rotas de alimento consumido verificam a criação e listagem de alimentos que foram consumidos.

```typescript
describe("Testando as rotas de Alimento Consumido", () => {
    it("Deve criar um alimento com sucesso", async () => {
        // Teste de criação de alimento consumido
    });
    // Outros testes...
});
```

#### Rotas de Categoria

Os testes para as rotas de categoria verificam se as categorias de alimentos estão sendo listadas corretamente.

```typescript
describe("Testando rotas de Categoria", () => {
    it("Deve listas todas as categorias", async () => {
        // Teste de listagem de categorias
    });
    // Outros testes...
});
```

#### Rotas de Dietas Fixas

Os testes para as rotas de dietas fixas incluem a criação, atualização e deleção de dietas.

```typescript
describe("Testando rotas de Dietas Fixas", () => {
    it("Deve criar uma dieta com sucesso", async () => {
        // Teste de criação de dieta
    });
    // Outros testes...
});
```

#### Rotas de Dietas Diárias

Os testes para as rotas de dietas diárias verificam a criação e listagem de dietas diárias.

```typescript
describe("Testando rotas de Dietas Diárias", () => {
    it("Deve criar uma dieta para hoje", async () => {
        // Teste de criação de dieta diária
    });
    // Outros testes...
});
```

### Funções de Utilidade

Além dos testes de rotas, o arquivo também contém testes para funções utilitárias relacionadas ao usuário, como cálculo de IMC, idade e taxa de metabolismo basal.

```typescript
describe("UsuarioFunc", () => {
    let usuarioFunc: UsuarioFunc;

    beforeEach(() => {
        usuarioFunc = new UsuarioFunc();
    });

    describe("Testando calculadoraIMC", () => {
        it("Deve calcular o IMC corretamente", () => {
            // Teste de cálculo de IMC
        });
    });
    // Outros testes...
});
```

## Conclusão

Os testes implementados neste arquivo garantem que as rotas da aplicação funcionem conforme o esperado, proporcionando uma base sólida para o desenvolvimento contínuo e a manutenção do código.
