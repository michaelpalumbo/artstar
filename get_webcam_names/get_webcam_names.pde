// HD Pro Webcam C920
Capture video;
 
 
 
import processing.video.*;
 
void setup() {
  size(640, 480);
 
  String[] cameras = Capture.list();
 
 
 
  if (cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    println("Available cameras:");
    for (int i = 0; i < cameras.length; i++) {
      println(cameras[i]);
    }
 
    // The camera can be initialized directly using an 
    // element from the array returned by list():
 video = new Capture(this, width, height, 24);
    video.start();  
 
  }      
}
 
void draw() {
  if (video.available() == true) {
    video.read();
  }
  image(video, 0, 0);
  // The following does the same, and is faster when just drawing the image
  // without any additional resizing, transformations, or tint.
  //set(0, 0, cam);
}
