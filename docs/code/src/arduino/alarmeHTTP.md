
---
title: alarmeHTTP.ino
description: 'Código para um dispositivo Arduino que se conecta a uma rede WiFi e faz requisições HTTP para monitorar o consumo de água.'
---

# alarmeHTTP.ino

Este arquivo contém o código para um dispositivo Arduino que se conecta a uma rede WiFi e realiza requisições HTTP para um servidor, a fim de monitorar o consumo de água. O dispositivo emite um alerta sonoro e visual se a diferença de consumo for igual ou superior a 10 minutos.

## Dependências

O código utiliza as seguintes bibliotecas:
- `WiFi.h`: Para conectar o Arduino à rede WiFi.
- `HTTPClient.h`: Para realizar requisições HTTP.

## Configurações

### Variáveis de Configuração

- `ssid`: Nome da rede WiFi.
- `password`: Senha da rede WiFi.
- `userId`: Identificador do usuário.
- `serverName`: URL do endpoint para buscar o último consumo de água.

### Pinos

- `buzzerPin`: Pino conectado ao buzzer (18).
- `led`: Pino conectado ao LED (5).

## Funções

### `setup()`

- Inicializa a comunicação serial.
- Configura os pinos do LED e do buzzer como saída.
- Conecta à rede WiFi e aguarda até que a conexão seja estabelecida.

### `loop()`

- Verifica se o dispositivo está conectado à rede WiFi.
- Realiza uma requisição GET ao `serverName`.
- Lê a resposta do servidor e converte para um inteiro (`diferencaMinutos`).
- Se `diferencaMinutos` for maior ou igual a 10, ativa o LED e o buzzer por 10 segundos.
- Se não estiver conectado à WiFi, exibe uma mensagem de erro.

## Considerações

- O código inclui um delay de 100 segundos entre as requisições para evitar sobrecarga no servidor.
- Certifique-se de que o endpoint do servidor esteja acessível e configurado corretamente para responder às requisições.
