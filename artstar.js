// const express = require('express'); 
const fs = require("fs");
const { exec, execSync, spawn } = require('child_process')
// const WebSocket = require('ws');
// const http = require('http');
// const url = require('url');
// const ip = require('ip');
// const ps = require('ps-node')
// const path = require("path");
// const find = require('find-process');
// const ReconnectingWebSocket = require('reconnecting-websocket');
// const os = require('os')
// const isIp = require('is-ip')
// const hostname = require('hostname')
// const moment = require('moment')
// const bytesToX = require('bytes-to-x')

const ensureDir = require('ensure-dir')

const args = require("really-simple-args")();
const kill  = require('tree-kill');
var every = require('schedule').every;
var NodeWebcam = require( "node-webcam" );




var name;
var interval;
var numIntervals;
var counter = 0;
var interviews = __dirname + '/interviews'
var record
var snapshot

// throw error in startup if not all flags have been set by user
function missingArg(arg){
  console.log('\n missing command line argument ' + arg)
  process.exit()
}
/////////////////// SETUP ////////////////
// get the performer's name
if(args.hasParameter("name")) {
  name = args.getParameter("name")
  console.log('name set to ' + name)
  // if a folder doesn't yet exist for the performer's name, add it (in the future, we'll need something more unique than a name. this is where an email address is probably better)
  ensureDir(interviews + '/' + name).then(() => {
  })
} else{
  missingArg('-name performerName (no spaces!)')  
}
 
// get the length of interval between snapshots
if(args.hasParameter("interval")) {
  interval = args.getParameter("interval")*1000
  console.log('snapshot interval set to ' + interval + ' seconds')
} else{
  interval = 30000

  console.log('\nsnapshot interval set to default of 30 seconds')  
}

// get the number of intervals/snapshots
if(args.hasParameter("snapshots")) {
  numIntervals = args.getParameter("snapshots")
  console.log('name set to ' + numIntervals)
} else{
  numIntervals = 10;

  console.log('\nnumber of snapshots/intervals set to default of 10') 
}


//////////////// WEBCAM /////////////

//Default options
 
var opts = {
 
  //Picture related

  width: 1280,

  height: 720,

  quality: 100,


  //Delay in seconds to take shot
  //if the platform supports miliseconds
  //use a float (0.1)
  //Currently only on windows

  delay: 0,


  //Save shots in memory

  saveShots: true,


  // [jpeg, png] support varies
  // Webcam.OutputTypes

  output: "jpeg",


  //Which camera to use
  //Use Webcam.list() for results
  //false for default device

  device: false,


  // [location, buffer, base64]
  // Webcam.CallbackReturnTypes

  callbackReturn: "location",


  //Logging

  verbose: false

};

var Webcam = NodeWebcam.create( opts );
 
 
Webcam.list( function( list ) {
  console.log(list)
})

/////////////// Sound recorder ///////////////////////

recordingFile = interviews + '/' + name + '/' + Date.now() + '.mp3'
snapshot = interviews + '/' + name + '/' + Date.now() + '.jpeg'
// exec('sox -d ' + interviews + '/' + name + '/')




record = spawn('sox', ['-d', recordingFile]);
console.log('started recording ' + recordingFile)
//Will automatically append location output type
 
Webcam.capture( snapshot, function( err, data ) {
  console.log('captured snapshot ' + snapshot)
} );
 
 



setTimeout(function run() {
  console.log('ended recording ' + recordingFile)
  kill(record.pid);
  fileName = Date.now()
  recordingFile = interviews + '/' + name + '/' + fileName + '.mp3'
  record = spawn('sox', ['-d', recordingFile]);
  console.log('started recording ' + recordingFile)
  snapshot = interviews + '/' + name + '/' + fileName + '.jpeg'

  Webcam.capture( snapshot, function( err, data ) {
    console.log('captured snapshot ' + snapshot)
  } );
  counter++
  if(counter >= numIntervals){
    kill(record.pid);
    console.log('artstar interview completed. order the coffee table book')
    process.exit();
  }
  setTimeout(run, interval);
}, interval)



//Available in nodejs
 
 
 
