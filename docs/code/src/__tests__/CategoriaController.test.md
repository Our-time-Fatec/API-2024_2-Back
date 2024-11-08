```
---
title: CategoriaController.test.ts
description: 'Testes unitários para o CategoriaController utilizando Jest e Supertest.'
---

# CategoriaController.test.ts

Este arquivo contém os testes unitários para o `CategoriaController`, que é responsável por gerenciar as operações relacionadas às categorias no sistema. Os testes são realizados utilizando as bibliotecas Jest e Supertest.

## Estrutura do Teste

Os testes são organizados em um bloco `describe`, que agrupa os testes relacionados ao `CategoriaController`. Cada teste individual é definido com a função `it`.

### Configuração do Ambiente

Antes de cada teste, a função `jest.clearAllMocks()` é chamada para garantir que os mocks sejam limpos, evitando interferências entre os testes.

### Testes

#### 1. Teste de Listagem de Categorias

```javascript
it('deve retornar status 200 e a lista de categorias', async () => {
    // Mock da função Categoria.find para retornar uma lista fake de categorias
    (Categoria.find as jest.Mock).mockResolvedValue([...]);

    const response = await request(app).get('/categorias');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual([...]);
    expect(Categoria.find).toHaveBeenCalledWith({ removidoEm: null });
});
```

- **Objetivo**: Verificar se a rota `/categorias` retorna um status 200 e a lista correta de categorias.
- **Mock**: A função `Categoria.find` é mockada para retornar uma lista de categorias simuladas.

#### 2. Teste de Erro na Listagem de Categorias

```javascript
it('deve retornar status 500 em caso de erro', async () => {
    // Mock da função Categoria.find para simular um erro
    (Categoria.find as jest.Mock).mockRejectedValue(new Error('Erro ao buscar categorias'));

    const response = await request(app).get('/categorias');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
        message: "Erro ao listar categorias",
        error: {}
    });
});
```

- **Objetivo**: Verificar se a rota `/categorias` retorna um status 500 em caso de erro ao buscar categorias.
- **Mock**: A função `Categoria.find` é mockada para simular um erro.

## Conclusão

Os testes garantem que o `CategoriaController` se comporte conforme o esperado, tanto em situações de sucesso quanto em casos de erro. A utilização de mocks permite simular o comportamento do modelo `Categoria`, isolando os testes da lógica de banco de dados.