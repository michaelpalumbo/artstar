// //TODO make this user-specifiable
const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8082');
 
socket.addEventListener('open', () => {
  socket.send('Hello World!');
});
 
socket.addEventListener('message', event => {
  console.log(`Message from server: ${event.data}`);
});