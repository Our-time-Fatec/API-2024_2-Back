#include <WiFi.h>
#include <HTTPClient.h>
#include <string>
#include <stdlib.h>

const char* ssid = "lcosta";       // Nome da rede WiFi
const char* password = "nogk7397";  // Senha da rede WiFi
const char* userId = "672d457435de1023d72992a2"; // userId

const char* serverName = "http://192.168.30.243:3010/arduino/agua/672d457435de1023d72992a2";  // Endpoint para busca ultimo consumo de agua

const int buzzerPin = 18;
const int led = 5; 
int diferencaMinutos;

void setup() {
  Serial.begin(115200);
  pinMode(led, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  
  // Conectar ao WiFi
  WiFi.begin(ssid, password);
  Serial.println("Conectando à WiFi...");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando...");
  }
  
  Serial.println("Conectado à WiFi!");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) { // Verifica se está conectado
    HTTPClient http;
    
    http.begin(serverName);
    int httpResponseCode = http.GET();
    Serial.println(httpResponseCode);
    if (httpResponseCode > 0) {
      String payload = http.getString();  // Lê a resposta do servidor
      const char* charPayload = payload.c_str();
      Serial.println("Resposta do servidor:");
      Serial.println(charPayload);
      diferencaMinutos = atoi(charPayload);

      Serial.print("Diferença em minutos: ");
      Serial.println(diferencaMinutos);

      if (diferencaMinutos >= 10) {  // Alerta o usuario se a diferença for de 10 minutos ou mais
        Serial.print("Alerta o usuario");
        digitalWrite(led, HIGH);
        digitalWrite(buzzerPin, HIGH);
        delay(10000); 
        digitalWrite(buzzerPin, LOW);
        digitalWrite(led, LOW);
      }

    } else {
      Serial.print("Erro na requisição: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();  // Fecha a conexão
  } else {
    Serial.println("Erro: Não conectado à WiFi");
  }
  
  delay(100000); // Delay para rodar novamente por 10 segundos
}