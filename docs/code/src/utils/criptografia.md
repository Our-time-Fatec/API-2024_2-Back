---
title: criptografia
description: 'Serviço para criptografar e verificar senhas utilizando bcrypt.'
---

# CriptografiaService

O `CriptografiaService` é uma classe responsável por fornecer métodos para criptografar senhas e verificar senhas criptografadas utilizando a biblioteca `bcrypt`.

## Estrutura da Classe

### Propriedades

- `saltRounds: number`: Número de rounds de sal para a criptografia. O valor padrão é 7.

### Métodos

#### `criptografarSenha(senha: string): Promise<string>`

Método assíncrono que recebe uma senha em formato de string e retorna uma promessa que resolve para a senha criptografada.

**Parâmetros:**
- `senha`: A senha a ser criptografada.

**Retorno:**
- Uma promessa que resolve para a senha criptografada.

#### `verificarSenha(senha: string, hash: string): Promise<boolean>`

Método assíncrono que verifica se uma senha fornecida corresponde a um hash criptografado.

**Parâmetros:**
- `senha`: A senha a ser verificada.
- `hash`: O hash criptografado a ser comparado.

**Retorno:**
- Uma promessa que resolve para um booleano indicando se a senha corresponde ao hash.

## Exemplo de Uso

```typescript
import CriptografiaService from './src/utils/criptografia';

const senha = 'minhaSenhaSecreta';
const hash = await CriptografiaService.criptografarSenha(senha);

const isMatch = await CriptografiaService.verificarSenha(senha, hash);
console.log(isMatch); // true
```

## Exportação

A instância do `CriptografiaService` é exportada como padrão, permitindo fácil acesso aos métodos de criptografia e verificação de senhas.