// //TODO make this user-specifiable
const WebSocket = require('ws');
const os = require('os')

const socket = new WebSocket('ws://192.168.0.102:8082');
 
socket.addEventListener('open', () => {
  socket.send(JSON.stringify({
    cmd:'newFaceTracker',
    id: os.hostname,
  }));
});
 
socket.addEventListener('message', event => {
  console.log(`Message from server: ${event.data}`);
});
let score = 0

let spoof = setInterval(() => {
  socket.send(JSON.stringify({
    cmd:'faceTrackerUpdate',
    id: os.hostname(),
    data: score++
  }));

  socket.send(JSON.stringify({
    cmd:'faceTrackerUpdate',
    id: 'dave',
    data: score++
  }));
  // evenOdd++
}, 50);