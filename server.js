#!/usr/bin/env node

// const png2base64 = require('imgconversion');
// const osc = require('osc')
const WebSocket = require('ws');
const fs = require('fs')
const wss = new WebSocket.Server({ port: 8082 });
let artstarDB = new Object();
const artstarDB_version = Date.now();
const max = require('max-api');
var ssh = require('ssh2').Client;
var cron = require('node-cron');


// let leaderboard = ['2', '5', '3', '1', '4']
// leaderboard.push('2', '5', '3', '1', '4')
let faceTrackers = JSON.parse(fs.readFileSync('./faceTrackers.json'))
let trackerLookup = JSON.parse(fs.readFileSync('./trackerLookup.json'))


max.post(faceTrackers)
max.post(trackerLookup)
var express = require('express');
var app = express();
var path = require('path');
const lodash = require('lodash')
const clientPath = path.join(__dirname, 'web')

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(clientPath + '/index.html' );
});

app.use(express.static(clientPath))

app.listen(8081);


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    max.post('received: %s', message);
    msg = JSON.parse(message)
    //max.post(msg)
        switch(msg.cmd){

      case 'newLeaderboard':
        max.post('a leaderboard web client has connected')
          // something's wrong with how the client is parsing the learderboard array... 
          // ws.send(JSON.stringify(leaderboard))
      break;
      case 'newStar':
        // save the portrait locally
        portrait = msg.data.portrait
        artistNN = msg.data.artistNN
        quote = msg.data.quote
        filename = msg.data.fileID + '.png'
        // max.post(portrait)
       //png2base64.base64toimg(portrait, 'png')

      //  base64toimg:function(base64string,filename, format){
        let bitmap=Buffer.from(portrait,'base64');
        fs.writeFileSync('./artstarDatabase/' + filename,bitmap);
        max.post('wrote ' + filename + ' to file')
        artstarDB[artistNN] = {quote: quote, filename: filename, added: Date.now()}
        max.post(artstarDB)
        // fs.writeFile('./artstarDatabase/' + artstarDB_version + '.json', JSON.stringify(artstarDB))

        fs.writeFile('./artstarDatabase/' + artstarDB_version + '.json', JSON.stringify(artstarDB, null, 4), function(err) {
          if(err) {
            max.post(err);
          } else {
            max.post("artstar database updated at ./artstarDatabase/" + artstarDB_version + '.json');
          }
        });

        // return filename + '.' + format;
      // }/

      break;

      case 'regCreatorMachine':
          max.post('a creator machine named ' + msg.data + ' has connected')
      break;

      case 'portrait':
        max.post(msg.data)
      break;

      case 'newFaceTracker':
        max.post('a faceTracker client has connected', msg.id)
        faceTrackers[msg.id] = {}
        updateStability();
          // something's wrong with how the client is parsing the learderboard array... 
          // ws.send(JSON.stringify(leaderboard))
      break;


      // NOTE: I couldn't figure out how to implement client-side websockets nor JSON string encoding in the python version of the facetracking code, so now the facetrackers will send via open sound control.  
      // case 'faceTrackerUpdate':
      //   max.post(msg.id, msg.data)

      //   leaderBoard(msg.id, msg.data)
      //     //max.post('a faceTracker client has connected')
      //       // something's wrong with how the client is parsing the learderboard array... 
      //       // ws.send(JSON.stringify(leaderboard))
      //   break;

      default: max.post('unhandled message', message)
    }

  });
 
  // ws.send('something');
});

// TODO: need to set 



// our leaderboard!
let leaderboard = []
// receive a portrait score update
function leaderBoard(portrait, score) {
  // prepare an entry
  let entry = {"portraitTracker": portrait, "score": score}
  // if leaderboard has no entries, add one
  if (score === 'remove'){
    // here we update an entry by first removing it...
    leaderboard = leaderboard.filter(function (el) {
      return el.portraitTracker != portrait
    })
  }
  else if (leaderboard.length === 0){
    leaderboard.push(entry)
    // Max.post('\n', leaderboard);
  } else {
    // here we update an entry by first removing it...
    leaderboard = leaderboard.filter(function (el) {
      return el.portraitTracker != portrait
    });
    // ...and then replace it with updated value
    leaderboard.push(entry)
  }
// sort the leaderboard by top score
leaderboard = lodash.orderBy(leaderboard, ['score'],['desc']); 
//max.post(leaderboard)

wss.clients.forEach(function each(client) {
  if (client.readyState === WebSocket.OPEN) {
    let lb = JSON.stringify({
      cmd: 'leaderBoardUpdate',
      data:  leaderboard
    })
    client.send(lb);
  }
});

// post the updated leaderboard to the Max Console
// Max.post('sorted', leaderboard)

// Max.outlet('leaderboard', leaderboard) // ['alpha', 'beta'] 

// after all is updated, make sure the stability monitoring is updated
updateStability();
};

max.addHandler('frameStatus', (frameStatus) =>{
  let f = frameStatus.split('_')[0]
  let status = frameStatus.split('_')[1]
  let serial = trackerLookup[f]

  if(serial === undefined){
    // this machine hasn't been added to the faceTrackers.json yet
  } else {

    //max.post(f, status, serial)
    faceTrackers[serial].wall_status = status
    if (status === 'OFF') {
      leaderBoard(f, 'remove')
      faceTrackers[serial].score = 0
    }
    updateStability();

  }

})

max.addHandler('faceTrackerUpdate', (msg)=>{
  
  let src = msg.split('_')[0]
  let point = parseInt(msg.split('_')[1])

  if(point === 0){
    // ignore
  } else {
    // let tracker = src.replace('/', '').toString()
    // max.post(tracker)
    max.post('incoming', src, point)
    //max.post('frame', src, faceTrackers[src])
    
    let frame = faceTrackers[src].frame
    if (faceTrackers[src].wall_status === "OFF"){
      // if set to FF, it means that a portrait is currently being replaced in this frame
      // max.post('face detected in frame ' + frame + '' )
    } else {
      let oldScore = faceTrackers[src].score
      //max.post(oldScore)
      let newScore = oldScore + point
      faceTrackers[src].score = newScore
      updateStability();
      //max.post(faceTrackers)
        
      // max.post()
    
        // max.post(scoreUpdate)
        leaderBoard(frame, newScore)
          //max.post('a faceTracker client has connected')
            // something's wrong with how the client is parsing the learderboard array... 
            // ws.send(JSON.stringify(leaderboard))
    }
    
  }

  

   
})

// /// ///////////

// Facetracker STABILITY Section:

// the jit.cellblocks in the presentation view contain status and diagnostics of all connected machines. keep these cellblocks up to date:
function updateStability(){


  max.outlet('networkStatus', faceTrackers)

  fs.writeFileSync('./faceTrackers.json', JSON.stringify(faceTrackers, null, 4))
}

// check if RPis still running tracker.service
cron.schedule('*/30 * * * * *', () => {
  checkTrackerService()

});


max.addHandler('trackerReg', (msg)=>{
  serial = msg.split('_')[0]
  hostname = msg.split('_')[1]
  ip = msg.split('_')[2].split(' ')[0]
  max.post(serial, ip)
  faceTrackers[serial].ip = ip

  updateStability();

})

max.addHandler('cpuTemp', (msg)=>{
  temp = msg.split('_')[1].split('=')[1].split('>')[0]
  thisSerial = msg.split('_')[0]
  max.post(temp)

  max.post(thisSerial, temp)
  faceTrackers[thisSerial].cpuTemp = temp
  
  updateStability();
})
max.addHandler('rebootPi', (frame) =>{

  ip = faceTrackers[trackerLookup[frame]].ip
  var conn = new ssh();
  conn.on('ready', function() {
    max.post('Client :: ready');
    conn.shell(function(err, stream) {
      if (err) throw err;
      stream.on('close', function() {
        max.post('Stream :: close');
        conn.end();
      }).on('data', function(data) {
        max.post('OUTPUT: ' + data);
      });
      stream.end('sudo reboot\n');
    });
  }).connect({
    host: ip,
    // port: 22,
    username: 'pi',
    password: 'raspberry'
  });
  updateStability();
})

max.addHandler('shutDownPi', (frame) =>{

  ip = faceTrackers[trackerLookup[frame]].ip
  var conn = new ssh();
  conn.on('ready', function() {
    max.post('Client :: ready');
    conn.shell(function(err, stream) {
      if (err) throw err;
      stream.on('close', function() {
        max.post('Stream :: close');
        conn.end(); 
      }).on('data', function(data) {
        max.post('OUTPUT: ' + data);
      });
      stream.end('sudo shutdown -h now\n');
    });
  }).connect({
    host: ip,
    // port: 22,
    username: 'pi',
    password: 'raspberry'
  });
  updateStability();
})

var type = require('type-of')


max.addHandler('CLI', (frame, msg) =>{

  ip = faceTrackers[trackerLookup[frame]].ip
  var conn = new ssh();
  conn.on('ready', function() {
    max.post('Client :: ready');
    conn.shell(function(err, stream) {
      if (err) throw err;
      stream.on('close', function() {
        max.post('Stream :: close');
        conn.end();
      }).on('data', function(data) {
        max.post(data);
      });
      stream.end('sudo ' + msg + '\n');
    });
  }).connect({
    host: ip,
    // port: 22,
    username: 'pi',
    password: 'raspberry'
  });
  updateStability();
})






const { spawn } = require('child_process')

function updateNetworkStatus(index, pingUp){
  let netStatus = faceTrackers[trackerLookup[index]].network
  //max.post(netStatus)
  if(netStatus !== pingUp){
    faceTrackers[trackerLookup[index]].network = pingUp
    max.post('Tracker ' + index + ' network status changed to ' + faceTrackers[trackerLookup[index]].network)

  }
  updateStability();
}

// Duplicate this section for each tracker!
const tracker_1 = spawn('ping', ['-i', '5', '192.168.0.113']);

tracker_1.stdout.on('data', (data) => {
  d = data.toString('utf8').split(' ')
  pingUp = !(d.includes('timeout'))
  updateNetworkStatus(1, pingUp)
  updateStability();
});

tracker_1.stderr.on('data', (data) => {
  max.post(`tracker_1 ping error ${data}`);
});



// systemctl show -p ActiveState tracker.service
var StringDecoder = require('string_decoder').StringDecoder;

max.addHandler('activeStatus', (ip, serialNumba) =>{

  // // ip = faceTrackers[serialNumba].ip
  // // var decoder = new StringDecoder('utf8');

  // var conn = new ssh();
  // conn.on('ready', function() {
  //   //max.post('Client :: ready');
  //   conn.shell(function(err, stream) {
  //     if (err) throw err;
  //     stream.on('close', function() {
  //       //max.post('Stream :: close');
  //       conn.end();
  //     }).on('data', function(data) {
  //       // let tracker_pyStatus;
  //       // max.post(data, type(data));
  //       data = data.toString('utf8')
  //       if(data === 'inactive' || data === 'active'){
  //         max.post(data)
  //         faceTrackers[serialNumba].trackerService = data
  //       }

  //     });
  //     stream.end("sudo systemctl is-active tracker.service\n");
  //     // | cut -d'=' -f2
  //   });
  // }).connect({
  //   host: ip,
  //   // port: 22,
  //   username: 'pi',
  //   password: 'raspberry'
  // });
  // updateStability();
})


function checkTrackerService(){

  Object.keys(faceTrackers).forEach(function(key) {
    // var val = o[key];
    // logic();
    ip = faceTrackers[key].ip
    //max.post(key)
    // max.post(ip)
    var conn = new ssh();
    conn.on('ready', function() {
      //max.post('Client :: ready');
      conn.shell(function(err, stream) {
        if (err) throw err;
        stream.on('close', function() {
          //max.post('Stream :: close');
          conn.end();
        }).on('data', function(data) {
          // let tracker_pyStatus;
          // max.post(data, type(data));
          data = data.toString('utf8')
          // max.post(data)
          if(data.includes('inactive') || data.includes('active')){
            //max.post(data)
            faceTrackers[key].trackerService = data
          }
  
        });
        stream.end("sudo systemctl is-active tracker.service\n");
        // | cut -d'=' -f2
      });
    }).connect({
      host: ip,
      // port: 22,
      username: 'pi',
      password: 'raspberry'
    });
  });
  updateStability();

}