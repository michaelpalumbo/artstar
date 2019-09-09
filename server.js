#!/usr/bin/env node

// const png2base64 = require('imgconversion');

const WebSocket = require('ws');
const fs = require('fs')
 
const wss = new WebSocket.Server({ port: 8082 });
let artstarDB = new Object();
const artstarDB_version = Date.now();

// let leaderboard = ['2', '5', '3', '1', '4']
// leaderboard.push('2', '5', '3', '1', '4')

var express = require('express');
var app = express();
var path = require('path');
const clientPath = path.join(__dirname, 'web')

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(clientPath + '/index.html' );
});

app.use(express.static(clientPath))

app.listen(8081);


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
    msg = JSON.parse(message)
    //console.log(msg)
        switch(msg.cmd){

      case 'newLeaderboard':
        console.log('a leaderboard web client has connected')
          // something's wrong with how the client is parsing the learderboard array... 
          // ws.send(JSON.stringify(leaderboard))
      break;
      case 'newStar':
        // save the portrait locally
        portrait = msg.data.portrait
        artistNN = msg.data.artistNN
        quote = msg.data.quote
        filename = msg.data.fileID + '.png'
        // console.log(portrait)
       //png2base64.base64toimg(portrait, 'png')

      //  base64toimg:function(base64string,filename, format){
        let bitmap=Buffer.from(portrait,'base64');
        fs.writeFileSync('./artstarDatabase/' + filename,bitmap);
        console.log('wrote ' + filename + ' to file')
        artstarDB[artistNN] = {quote: quote, filename: filename, added: Date.now()}
        console.log(artstarDB)
        // fs.writeFile('./artstarDatabase/' + artstarDB_version + '.json', JSON.stringify(artstarDB))

        fs.writeFile('./artstarDatabase/' + artstarDB_version + '.json', JSON.stringify(artstarDB, null, 4), function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("artstar database updated at ./artstarDatabase/" + artstarDB_version + '.json');
          }
        });

        // return filename + '.' + format;
      // }/

      break;

      case 'regCreatorMachine':
          console.log('a creator machine named ' + msg.data + ' has connected')
      break;

      default: console.log('unhandled message', message)
    }

  });
 
  // ws.send('something');
});


