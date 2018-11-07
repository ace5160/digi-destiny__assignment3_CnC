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

//nt
const int numReadings = 3;
int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total
int average = 0; 
//nt en

int triggerPin = 12;   //pin conneccted to the Trig pin on the sensor
int echoPin = 11;       //pin connected to the Echo pin on the sensor
int maxDistance = 200;  //set the max distance for the sensor to read (helps with errors)
int distanceVal;        //variable to hold the distance val

int sampleRate = 100;   //how fast to sample the value
long lastReading;       //used for the timer

NewPing proximity1(triggerPin, echoPin, maxDistance);   //sets up the sensor object

void setup() 
{
  Serial.begin(9600);  //start the serial port

  //nt
  for (int thisReading = 0; thisReading < numReadings; thisReading++) 
  {
    readings[thisReading] = 0;
  }
//nt en

}

void loop() 
{

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
  // send it to the computer as ASCII digits
  Serial.println(average);
  //delay(1);        // delay in between reads for stability
  //Serial.print("Distance Reading CM : ");  //print the value to the Serial monitor
  //Serial.println(distanceVal);
  //Serial.println();
}
    
  }
 

}
