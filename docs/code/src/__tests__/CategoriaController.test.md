```
---
title: CategoriaController.test.ts
description: 'Testes unitários para o CategoriaController utilizando Jest e Supertest.'
---

# CategoriaController.test.ts

Este arquivo contém os testes unitários para o `CategoriaController`, que é responsável por gerenciar as operações relacionadas às categorias no sistema. Os testes são realizados utilizando as bibliotecas Jest e Supertest.

## Estrutura do Teste

Os testes são organizados em um bloco `describe` que agrupa os testes do `CategoriaController`. Cada teste individual é definido com a função `it`.

### Configuração Inicial

Antes de cada teste, a função `beforeEach` é utilizada para limpar todos os mocks, garantindo que os testes sejam independentes entre si.

```javascript
beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
});
```

### Testes

#### 1. Teste de Listagem de Categorias

Este teste verifica se a rota `/categorias` retorna um status 200 e a lista de categorias corretamente.

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

#### 2. Teste de Erro na Listagem de Categorias

Este teste simula um erro ao buscar as categorias e verifica se a resposta retorna um status 500.

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

## Conclusão

Os testes implementados garantem que o `CategoriaController` funcione conforme o esperado, tanto em cenários de sucesso quanto em casos de erro. A utilização de mocks permite simular o comportamento do modelo `Categoria`, isolando os testes da lógica de acesso a dados.