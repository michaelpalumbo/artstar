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



var name;
var interval;
var numIntervals;
var counter = 0;
var interviews = __dirname + '/interviews'
var record

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
if(args.hasParameter("numIntervals")) {
  numIntervals = args.getParameter("numIntervals")
  console.log('name set to ' + name)
} else{
  numIntervals = 10;

  console.log('\nnumber of snapshots/intervals set to default of 10') 
}

recordingFile = interviews + '/' + name + '/' + Date.now() + '.wav'
// exec('sox -d ' + interviews + '/' + name + '/')




record = spawn('sox', ['-d', recordingFile]);
console.log('started recording ' + recordingFile)


setTimeout(function () {
  console.log('ended recording ' + recordingFile)
  kill(record.pid);
  recordingFile = interviews + '/' + name + '/' + Date.now() + '.wav'
  record = spawn('sox', ['-d', recordingFile]);
  console.log('started recording ' + recordingFile)
}, interval)