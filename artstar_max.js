const path = require('path');
const dateTime = require('date-time');
const chokidar = require('chokidar');
const fs = require('fs-extra')
const cpFile = require('cp-file');
const printJS = require('print-js')
const python = require('python')
const exec = require('exec')
const max = require('max-api');

const speechRecognition = __dirname + '/speech.py'
const {c, cpp, node, python, java} = require('compile-run');
const ensureDir = require('ensure-dir')

// participant counter (for uniqueness)
let counter = 1
// unique ID
let id;


// interviewee name
let subject;
//let subject;
max.addHandler('newSubject', (name) =>{
	subject = name
	counter++
	id = counter + '_'
	newPath = __dirname + '/interviews/' + id + name
	// a dir for each participant
	ensureDir(__dirname + '/interviews/' + id + name).then(() => {
	})
	max.post('creating portraits within directory ' + __dirname + '/interviews/' + id + name)
	max.outlet('path', newPath);

	
	
})

// capture portrait and audio file
max.addHandler('capture', (name) =>{
	id = counter + '_'
	timestamp = Date.now()
	max.outlet('timestamp', timestamp)
	max.outlet('capture', id + name + '/' + timestamp)
})

// run speech2text on 
max.addHandler('chosen', (filename)=>{
	// filename = filename.toString()
	let target = filename.split(".png")[0]
	targetID = target.lastIndexOf('/')
	let srcLoc = __dirname + '/interviews/' + subject

	exec('lpr ' + filename)
	/* this isn't working :(
	exec('python speech.py ' + targetID, {cwd: srcLoc}, (stdout,stderr,err )=>{
		max.post(stdout,stderr,err)
	})

	python.runFile(speechRecognition,{
	executionPath: 'python',
	stdin: filename
	},(err,result)=>console.log(err ? err : result));

	*/
})



// make sure an interviews folder exists. eventually use this to create




