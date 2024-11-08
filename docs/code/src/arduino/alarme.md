---
title: alarme
description: 'Módulo responsável por enviar comandos de alarme para um dispositivo Arduino via porta serial.'
---

# alarme

Este módulo contém a implementação de um sistema de alarme que se comunica com um dispositivo Arduino através de uma porta serial. O alarme é acionado a cada 2 horas (7200000 milissegundos).

## Importações

```typescript
import { SerialPort } from 'serialport';
```

A biblioteca `serialport` é utilizada para estabelecer a comunicação com o Arduino.

## Configuração da Porta Serial

```typescript
const port = new SerialPort({
  path: '', // Caminho do arduino
  baudRate: 9600,
});
```

- `path`: Deve ser definido como o caminho da porta serial onde o Arduino está conectado.
- `baudRate`: A taxa de transmissão de dados, configurada para 9600 bps.

## Função alarme

```typescript
const alarme = () => {
    port.write('alarme', (err) => {
        if(err){
            return console.log('Erro ao escrever na Porta Serial', err.message)
        }
        console.log('Comando de alarme enviado com sucesso');
    });
}
```

A função `alarme` é responsável por enviar o comando 'alarme' para o Arduino. Em caso de erro, uma mensagem de erro é exibida no console.

## Intervalo de Execução

```typescript
setInterval(alarme, 7200000);
```

A função `alarme` é chamada a cada 2 horas (7200000 milissegundos) utilizando `setInterval`.

## Considerações Finais

Certifique-se de que o caminho da porta serial esteja corretamente configurado antes de executar o módulo. O alarme será enviado automaticamente a cada 2 horas, conforme a configuração.