import gab.opencv.*;
import processing.video.*;
import java.awt.*;
import oscP5.*;  
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;
int varName;

Capture portrait_1;
OpenCV opencv;

void setup() {
  // might be able to reduce the frameRate in order to optimize for multiple cameras and on RPi. 
  frameRate(10);
  oscP5 = new OscP5(this, 12000);   //listening
  myRemoteLocation = new NetAddress("127.0.0.1", 57120);  //  this sends to max patch
  
    // The method plug take 3 arguments. Wait for the <keyword>
  oscP5.plug(this, "varName", "keyword");
  size(320, 240);
  portrait_1 = new Capture(this, 320/2, 240/2);
  opencv = new OpenCV(this, 320/2, 240/2);
  opencv.loadCascade(OpenCV.CASCADE_FRONTALFACE);  

  portrait_1.start();
}

void draw() {
  scale(2);
  opencv.loadImage(portrait_1);

  
  /*image(portrait_1, 0, 0 );

   noFill();
  stroke(0, 255, 0);
  strokeWeight(3);
  */
  Rectangle[] faces = opencv.detect();
  //println("number of faces", faces.length);
  // only send msg when face(s) detected
  if (faces.length > 0){ 
    OscMessage newMessage = new OscMessage("portrait_1");  
    newMessage.add(faces.length); 
    oscP5.send(newMessage, myRemoteLocation);
  }

/*
  for (int i = 0; i < faces.length; i++) {
    //println(faces[i].x + "," + faces[i].y);
    rect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
  }
  */
  
}

void captureEvent(Capture c) {
  c.read();
}
