import gab.opencv.*;
import processing.video.*;
import java.awt.*;
import oscP5.*;  
import netP5.*;
// note, need to run the leaderboard.maxpat in order to receive from this sketch!!

OscP5 oscP5;
NetAddress myRemoteLocation;
int varName;





Capture portrait_AB;
OpenCV opencv;

void setup() {
  // might be able to reduce the frameRate in order to optimize for multiple cameras and on RPi. 
  frameRate(15);
  oscP5 = new OscP5(this, 12000);   //listening
  myRemoteLocation = new NetAddress("localhost", 57120);  //  this sends to max patch
  
    // The method plug take 3 arguments. Wait for the <keyword>
  oscP5.plug(this, "varName", "keyword");
  size(480, 270);
  
  //fake = new Capture(this,640,480); 
        OscMessage newMessage = new OscMessage("/system");  
      newMessage.add("started"); 
      oscP5.send(newMessage, myRemoteLocation);
  String Webcam1 = "HD Pro Webcam C920";
 //String Webcam1 = "FaceTime HD Camera";
  portrait_AB = new Capture(this, 480/2, 270/2, Webcam1);
  //portrait_CD = new Capture(this, 480/2, 270/2, Webcam1);
  opencv = new OpenCV(this, 480/2, 270/2);
  opencv.loadCascade(OpenCV.CASCADE_FRONTALFACE);  

  portrait_AB.start();

}

void draw() {
  scale(2);
  opencv.loadImage(portrait_AB);

  
  image(portrait_AB, 0, 0 );

   noFill();
  stroke(0, 255, 0);
  strokeWeight(3);
  
  Rectangle[] faces = opencv.detect();
  println("number of faces", faces.length);
  // only send msg when face(s) detected
  //if (faces.length > 0){ 
    //OscMessage newMessage = new OscMessage("portrait_1");  
    //newMessage.add(faces.length); 
    //oscP5.send(newMessage, myRemoteLocation);
  //}

  //int A = 0;
 // int B = 0;
 
 // this code oreports when a face is detected in either the left or right
 // side of the camera's view. It does not yet report how many faces are detected in either
 // side. (total faces is known, but not per side, and I don't yet know how to calculate that)
 // so, for now, each portrait will only report if it is being looked at (and for how long)
  for (int i = 0; i < faces.length; i++) {
   // println("face " + i + " " + faces[i].x + "," + faces[i].y);
    rect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
    println("what is " + faces[i].width, faces[i].height);
    // 60
    if(faces[i].x < 120){
      OscMessage newMessage = new OscMessage("/portrait_A");  
      newMessage.add("attention!"); 
      oscP5.send(newMessage, myRemoteLocation);
     // println("portrait A has " + faces.length + " faces");
    } else {
      OscMessage newMessage = new OscMessage("/portrait_B");  
      newMessage.add("attention!"); 
      oscP5.send(newMessage, myRemoteLocation);
     // println("portrait B has " + faces.length + " faces");

    }

  }
  
  
}

void captureEvent(Capture c) {
  c.read();
}
