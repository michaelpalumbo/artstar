
import processing.video.*;
Capture webcam;

int timer;

void setup() {
  size(500, 500);
   webcam = new Capture(this,640,480);  
 // String[] devices = Capture.list();
  //println(devices);
  webcam.start();
}




void draw() {
  if (webcam.available() == true) {
    webcam.read();
    image(webcam ,0,0);
  
  
  if (millis() - timer >= 2000) {
    //background(random(255));
    timer = millis();
    //PImage tower = loadImage("toBlack.jpg");
    //PImage newImage = createImage(100, 100, RGB);
    //newImage = tower.get();
    //newImage.save(timer + "outputImage.jpg");
    saveFrame("blurCheck.jpg");
    }
  }
}
