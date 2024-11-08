
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

As seguintes variáveis devem ser configuradas no início do código:

- `ssid`: Nome da rede WiFi.
- `password`: Senha da rede WiFi.
- `userId`: Identificador do usuário.
- `serverName`: URL do endpoint para buscar o último consumo de água.

## Pinagem

O código utiliza os seguintes pinos:
- `buzzerPin`: Pino conectado ao buzzer (definido como 18).
- `led`: Pino conectado ao LED (definido como 5).

## Funções

### `setup()`

- Inicializa a comunicação serial.
- Configura os pinos do LED e do buzzer como saída.
- Conecta à rede WiFi e aguarda até que a conexão seja estabelecida.

### `loop()`

- Verifica se o dispositivo está conectado à rede WiFi.
- Realiza uma requisição GET ao `serverName`.
- Lê a resposta do servidor e converte para um inteiro que representa a diferença em minutos.
- Se a diferença for maior ou igual a 10 minutos, ativa o LED e o buzzer por 10 segundos.
- Se não estiver conectado à rede WiFi, exibe uma mensagem de erro.

## Considerações

- O código possui um delay de 100 segundos entre as requisições para evitar sobrecarga no servidor.
- É importante garantir que o dispositivo esteja dentro do alcance da rede WiFi para funcionar corretamente.
