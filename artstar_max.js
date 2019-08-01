const path = require('path');
const Max = require('max-api');

// This will be printed directly to the Max console

// Use the 'addHandler' function to register a function for a particular message
Max.addHandler("utc", () => {
	Max.outlet('utc', Date.now())
	Max.outlet('path', __dirname);

});

// Use the 'outlet' function to send messages out of node.script's outlet
Max.addHandler("echo", (msg) => {
	Max.outlet(msg);
});
