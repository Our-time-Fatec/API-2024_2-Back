const int buzzerPin = 9; // Pino do buzzer
const int led = 13; // Pino da led

const int f = 349;
const int fS = 740; 
const int gS = 415;
const int g = 392;
const int a = 440; 
const int aS = 466; 
const int cH = 523; 
const int eH = 659; 
const int b = 493; 
const int dH = 587;


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
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    
    if (command == "alarme") {
      beep(f, 250);
      beep(gS, 500);
      beep(f, 350);
      beep(a, 125);
      beep(cH, 500);
      beep(a, 375);
      beep(cH, 125);
      beep(eH, 650);
      digitalWrite(led, HIGH);
      delay(100); 
      digitalWrite(led, LOW);
      delay(100);
    }
  }
}