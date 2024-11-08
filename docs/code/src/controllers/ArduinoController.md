---
title: ArduinoController
description: 'Controlador responsável por gerenciar as interações relacionadas ao Arduino, incluindo a obtenção do último consumo de água do usuário.'
---

# ArduinoController

O `ArduinoController` é uma classe que gerencia as interações entre a aplicação e o dispositivo Arduino, especificamente no que diz respeito ao monitoramento do consumo de água dos usuários.

## Métodos

### getUltimoConsumoAgua

```typescript
public async getUltimoConsumoAgua(req: Request, res: Response): Promise<void>
```

Este método é responsável por recuperar o último horário de consumo de água de um usuário específico.

#### Parâmetros

- `req`: O objeto de requisição que contém os parâmetros da solicitação, incluindo o `Id` do usuário.
- `res`: O objeto de resposta que será utilizado para enviar a resposta ao cliente.

#### Funcionamento

1. O método extrai o `Id` do usuário a partir dos parâmetros da requisição.
2. Ele tenta encontrar o usuário correspondente no banco de dados utilizando o modelo `Usuario`.
3. Se o usuário não for encontrado, uma resposta com status 404 e uma mensagem de erro é enviada.
4. Se o usuário for encontrado, o método calcula a diferença em minutos entre o último horário de atualização do consumo de água e o horário atual.
5. A diferença em minutos é retornada ao cliente com um status 200.
6. Em caso de erro durante a execução, uma resposta com status 500 e uma mensagem de erro é enviada.

#### Exemplo de Uso

```javascript
// Exemplo de chamada para o método
app.get('/usuario/:Id/ultimo-consumo-agua', (req, res) => {
    arduinoController.getUltimoConsumoAgua(req, res);
});
```

## Exportação

O controlador é exportado como uma instância única, permitindo que seja utilizado em outras partes da aplicação.