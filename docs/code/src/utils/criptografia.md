---
title: CriptografiaService
description: 'Serviço para criptografar e verificar senhas utilizando bcrypt.'
---

# CriptografiaService

O `CriptografiaService` é uma classe responsável por fornecer métodos para criptografar senhas e verificar senhas criptografadas utilizando a biblioteca `bcrypt`. Este serviço é essencial para garantir a segurança das senhas armazenadas em um sistema.

## Estrutura da Classe

### Propriedades

- `saltRounds: number`: Número de rounds utilizados para gerar o hash da senha. O valor padrão é 7.

### Métodos

#### `async criptografarSenha(senha: string): Promise<string>`

Método responsável por criptografar uma senha.

- **Parâmetros**:
  - `senha`: A senha em formato de string que será criptografada.
  
- **Retorno**: Uma `Promise` que resolve para a senha criptografada em formato de string.

#### `async verificarSenha(senha: string, hash: string): Promise<boolean>`

Método responsável por verificar se uma senha fornecida corresponde a um hash armazenado.

- **Parâmetros**:
  - `senha`: A senha em formato de string que será verificada.
  - `hash`: O hash da senha armazenado em formato de string.
  
- **Retorno**: Uma `Promise` que resolve para um booleano indicando se a senha corresponde ao hash.

## Exemplo de Uso

```typescript
import CriptografiaService from './src/utils/criptografia';

const senha = 'minhaSenhaSecreta';
const hash = await CriptografiaService.criptografarSenha(senha);

const isMatch = await CriptografiaService.verificarSenha(senha, hash);
console.log(isMatch); // true
```

## Considerações

- É recomendável ajustar o número de `saltRounds` de acordo com as necessidades de segurança e desempenho do seu sistema.
- O uso de `bcrypt` é uma prática comum para garantir a segurança das senhas em aplicações.