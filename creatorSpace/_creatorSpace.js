const path = require('path');
const dateTime = require('date-time');
const chokidar = require('chokidar');
const fs = require('fs-extra')
const cpFile = require('cp-file');
const ensureDir = require('ensure-dir')
const exec = require('child_process')
const max = require('max-api');
const open = require('open');
let {PythonShell} = require('python-shell')




// var lp = require("node-lp");
// var options = {};
 
// printer = lp(options);


const speechRecognition = __dirname + '/speech.py'
const {c, cpp, node, python, java} = require('compile-run');


// participant counter (for uniqueness)
let counter = 1
// unique ID
let id;


// interviewee name
let subject;
//let subject;
max.addHandler('newSubject', (name) =>{
	//subject = name
	counter++
	id = counter + '_' 
	// newPath = __dirname + '/interviews/' + id + name
	// // a dir for each participant
	// ensureDir(__dirname + '/interviews/' + id + name).then(() => {
	// })
	// max.post('creating portraits within directory ' + __dirname + '/interviews/' + id + name)
	//max.outlet('path', newPath);

	
	
})

// capture portrait and audio file
max.addHandler('capture', (name) =>{
	//id = counter + '_'
	timestamp = Date.now()
	max.outlet('timestamp', timestamp)
	max.outlet('capture', name + '_' + timestamp)
})

// TODO:
// copy the chosen .wave into the main folder. run speech.py on it.  
// run speech2text on 
max.addHandler('chosen', (filename)=>{
	// filename = filename.toString()
	max.post(filename)
	// f = filename.lastIndexOf('/');
	//max.post(f)
	// t = filename.substring(f + 1);

	var str = filename;
var n = str.lastIndexOf('/');
var result = str.substring(n + 1);

target = result.split(".png")[0]
speech2text(target)


//	cmd = ('lpr ./' + filename + '.png').toString()
	// let srcLoc = __dirname + '/interviews/' + subject
	// exec('python speech.py ./' + targetID + '.wave', (stdout,stderr,err)=>{
	// 	max.post(stderr,err,stdout)
	// })

	// python.runFile(speechRecognition,{
	// 	executionPath: '/usr/bin/env/python3',
	// 	stdin: targetID
	// 	},(err,result)=>max.post(err ? err : result));

	// const print = spawn('lp', ['lp', '-o', 'landscape', '-o', 'fit-to-page', '-o' ,'media=A4', filename]);

	// print.stdout.on('data', (data) => {
	// 	max.post(`stdout: ${data}`);
	// });
	
	// print.stderr.on('data', (data) => {
	// 	max.post(`stderr: ${data}`);
	// });
	
	// print.on('close', (code) => {
	// 	max.post(`child process exited with code ${code}`);
	// });

	// exec('open -a "Preview" ' + filename, ()=>{})
	
	//print.on('error	')

	//printer.queue('\"' + filename + '\"');

	/* this isn't working :(
	exec('python speech.py ' + targetID, {cwd: srcLoc}, (stdout,stderr,err )=>{
		max.post(stdout,stderr,err)
	})



	*/
})


function speech2text(fileID){
max.post('fileID', fileID)
	let options = {
		mode: 'text',
		pythonPath: '/Users/mp/miniconda3/bin/python',
		pythonOptions: ['-u'], // get print results in real-time
		scriptPath: __dirname,
		args: [fileID]
	};
	 
	PythonShell.run('speech.py', options, function (err, results) {
		if (err) max.post( err);
		// results is an array consisting of messages collected during execution
		max.post('results: %j', results);
	});


}


// make sure an interviews folder exists. eventually use this to create




