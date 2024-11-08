---
title: criptografia
description: 'Serviço de criptografia para gerenciamento de senhas utilizando bcrypt.'
---

# CriptografiaService

O `CriptografiaService` é uma classe responsável por fornecer métodos para criptografar e verificar senhas utilizando a biblioteca `bcrypt`. Este serviço é essencial para garantir a segurança das senhas armazenadas em um sistema.

## Estrutura da Classe

### Propriedades

- **saltRounds**: Número de rounds de sal utilizados para a criptografia. O valor padrão é 7.

### Métodos

#### `criptografarSenha(senha: string): Promise<string>`

Método assíncrono que recebe uma senha em formato de string e retorna uma promessa que resolve para a senha criptografada.

**Parâmetros:**
- `senha`: A senha a ser criptografada.

**Retorno:**
- Uma promessa que resolve para a senha criptografada.

#### `verificarSenha(senha: string, hash: string): Promise<boolean>`

Método assíncrono que verifica se uma senha fornecida corresponde a um hash previamente gerado.

**Parâmetros:**
- `senha`: A senha a ser verificada.
- `hash`: O hash da senha que será comparado.

**Retorno:**
- Uma promessa que resolve para um booleano indicando se a senha corresponde ao hash.

## Exemplo de Uso

```typescript
import CriptografiaService from './src/utils/criptografia';

// Criptografar uma senha
const senhaCriptografada = await CriptografiaService.criptografarSenha('minhaSenhaSecreta');

// Verificar a senha
const isSenhaValida = await CriptografiaService.verificarSenha('minhaSenhaSecreta', senhaCriptografada);
```

## Considerações Finais

O `CriptografiaService` é uma ferramenta fundamental para a segurança de aplicações que lidam com senhas. É recomendável ajustar o número de `saltRounds` conforme a necessidade de segurança e performance da aplicação.