---
title: alarme
description: 'Módulo responsável por enviar comandos de alarme para um dispositivo Arduino via porta serial.'
---

# alarme.ts

O arquivo `alarme.ts` contém a implementação de um módulo que se comunica com um dispositivo Arduino através de uma porta serial. Este módulo é responsável por enviar um comando de alarme a cada duas horas.

## Dependências

O módulo utiliza a biblioteca `serialport` para a comunicação com o Arduino. Certifique-se de que esta biblioteca esteja instalada em seu projeto.

## Estrutura do Código

### Importação

```typescript
import { SerialPort } from 'serialport';
```

A biblioteca `serialport` é importada para permitir a comunicação com a porta serial do Arduino.

### Configuração da Porta Serial

```typescript
const port = new SerialPort({
  path: '', // Caminho do arduino
  baudRate: 9600,
});
```

- `path`: Deve ser definido como o caminho da porta serial onde o Arduino está conectado.
- `baudRate`: A taxa de transmissão de dados, configurada para 9600 bps, que é uma configuração comum para comunicação serial.

### Função alarme

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

A função `alarme` é responsável por enviar o comando 'alarme' para o Arduino. Se ocorrer um erro durante a escrita na porta serial, uma mensagem de erro será exibida no console. Caso contrário, uma confirmação de sucesso será exibida.

### Intervalo de Execução

```typescript
setInterval(alarme, 7200000);
```

A função `alarme` é chamada a cada 7200000 milissegundos (ou 2 horas), utilizando a função `setInterval`. Isso garante que o comando de alarme seja enviado periodicamente ao Arduino.

## Considerações Finais

Certifique-se de que o caminho da porta serial esteja corretamente configurado antes de executar o módulo. O envio de comandos para o Arduino pode ser utilizado em diversas aplicações, como sistemas de alarme, automação residencial, entre outros.