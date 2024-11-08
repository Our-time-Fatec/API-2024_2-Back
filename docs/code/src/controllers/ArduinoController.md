---
title: ArduinoController
description: 'Controlador responsável por gerenciar as interações relacionadas ao Arduino, incluindo a obtenção do último consumo de água do usuário.'
---

# ArduinoController

O `ArduinoController` é uma classe que gerencia as interações entre a aplicação e o modelo de dados do usuário, especificamente para operações relacionadas ao Arduino. Este controlador é responsável por fornecer informações sobre o último consumo de água registrado para um usuário específico.

## Métodos

### `getUltimoConsumoAgua(req: Request, res: Response): Promise<void>`

Este método é responsável por recuperar o último horário de consumo de água de um usuário.

#### Parâmetros

- `req`: O objeto de requisição que contém os parâmetros da URL, incluindo o `Id` do usuário.
- `res`: O objeto de resposta que será utilizado para enviar a resposta ao cliente.

#### Comportamento

1. O método tenta buscar o usuário pelo `Id` fornecido nos parâmetros da requisição.
2. Se o usuário não for encontrado, retorna um status 404 com uma mensagem de erro.
3. Se o usuário for encontrado, calcula a diferença em minutos entre o horário atual e o último horário de atualização do consumo de água.
4. Retorna a diferença em minutos com um status 200.
5. Em caso de erro durante a execução, retorna um status 500 com uma mensagem de erro.

#### Exemplo de Uso

```javascript
// Exemplo de chamada ao método
app.get('/usuario/:Id/ultimo-consumo-agua', (req, res) => {
    arduinoController.getUltimoConsumoAgua(req, res);
});
```

## Exportação

O controlador é exportado como uma instância única, permitindo que seja utilizado em outras partes da aplicação sem a necessidade de criar novas instâncias.