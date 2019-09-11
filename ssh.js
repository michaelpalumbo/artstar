var reboot = require('ssh2').Client;
 
var conn = new reboot();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.shell(function(err, stream) {
    if (err) throw err;
    stream.on('close', function() {
      console.log('Stream :: close');
      conn.end();
    }).on('data', function(data) {
      console.log('OUTPUT: ' + data);
    });
    stream.end('sudo reboot\n');
  });
}).connect({
  host: '192.168.0.113',
  // port: 22,
  username: 'pi',
  password: 'raspberry'
});