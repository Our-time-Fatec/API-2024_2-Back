#include <HTTPClient.h>

const char* serverName = "https://localhost:3010/usuario/agua";

const int buzzerPin = 9;
const int led = 13; 

const int f = 349;
const int gS = 415;
const int a = 440; 
const int cH = 523; 
const int eH = 659;

void beep(int frequency, int duration) {
  tone(buzzerPin, frequency); 
  delay(duration); 
  noTone(buzzerPin);     
}

void setup() {
  pinMode(led, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  makeGetRequest();

  delay(7200000); 
}

void makeGetRequest() {
  HTTPClient http;
  http.begin(serverName);

  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    String payload = http.getString();
    Serial.println(httpResponseCode);
    Serial.println(payload);
  } else {
    Serial.print("Error on HTTP request: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
