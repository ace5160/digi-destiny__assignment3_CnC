
/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Read an Ultrasonic Proximity Sensor using the NewPing Library 
 * To install go to "Tools" -> "Manage Libraries" and search for "NewPing"
 * print the value to Serial and scale it using a timer
 * 
 * 
 */
#include <NewPing.h>   //include the library
#include <ArduinoJson.h>

int buttonPin1 = 7;

//nt
const int numReadings = 3;
int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total
int average = 0; 
//nt en

int triggerPin = 12;   //pin conneccted to the Trig pin on the sensor
int echoPin = 11;       //pin connected to the Echo pin on the sensor
int maxDistance = 100;  //set the max distance for the sensor to read (helps with errors)
int distanceVal;        //variable to hold the distance val

int sampleRate = 50;   //how fast to sample the value
long lastReading;       //used for the timer
int finval=0;

NewPing proximity1(triggerPin, echoPin, maxDistance);   //sets up the sensor object

void setup() 
{
  Serial.begin(9600);  //start the serial port
  pinMode(buttonPin1, INPUT_PULLUP);
  //nt
  for (int thisReading = 0; thisReading < numReadings; thisReading++) 
  {
    readings[thisReading] = 0;
  }
//nt en

}

void loop() 
{

int buttonVal = digitalRead(buttonPin1);
if ( buttonVal == 0){
  buttonVal = 1;
} else {
  buttonVal = 0;
}

  if(millis()-lastReading>=sampleRate) //this very simple statement is the timer,
  { 
 
  distanceVal = proximity1.ping_cm();  //get the distance value in centimeters  
  lastReading = millis();

  

if(distanceVal!=0)
{
  // subtract the last reading:
  total = total - readings[readIndex];
  
  // read from the sensor:
  readings[readIndex] = distanceVal;
  
  // add the reading to the total:
  total = total + readings[readIndex];
  
  // advance to the next position in the array:
  readIndex = readIndex + 1;

  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    readIndex = 0;
  }

  // calculate the average:
  average = total / numReadings;

  if(average<50)
  {
    finval=1;
  }
  else
  {
    finval=0;
  }

 DynamicJsonBuffer messageBuffer(200);
  JsonObject& p5Send = messageBuffer.createObject();

    p5Send["s1"]= finval;
     p5Send["s2"]= buttonVal;

     p5Send.printTo(Serial);
     Serial.println();

  
  //Serial.println(average);
  //Serial.println(finval);
  //delay(1);        // delay in between reads for stability
  //Serial.print("Distance Reading CM : ");  //print the value to the Serial monitor
  //Serial.println(distanceVal);
  //Serial.println();
}
    
  }
 

}
