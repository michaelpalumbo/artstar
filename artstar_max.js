const path = require('path');
const Max = require('max-api');
const { exec, execSync, spawn } = require('child_process')
const speechRecognition = __dirname + '/speech.py'
const {c, cpp, node, python, java} = require('compile-run');
const ensureDir = require('ensure-dir')
// make sure an interviews folder exists. eventually use this to create
// a dir for each participant
ensureDir(__dirname + '/interviews').then(() => {
})
	

const interviewsFolder = __dirname + '/interviews'


// This will be printed directly to the Max console

// Use the 'addHandler' function to register a function for a particular message
Max.addHandler("utc", () => {	
	Max.outlet('utc', Date.now())
	Max.outlet('path', __dirname);

});












 /*
// eventually figure out how to run the speech.py from this node script
Max.addHandler("speech", (filename) => {
	Max.post(filename)
	file = __dirname + '/interviews/' + filename
	// exec('python speech.py interviews/' + filename, (stdout,stderr,err)=>{
	// 	Max.post(stderr,err,stdout)
	// })
	python.runFile(speechRecognition,{
		executionPath: 'python',
		stdin: filename
},(err,result)=>console.log(err ? err : result));

});
*/