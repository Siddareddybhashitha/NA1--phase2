var net = require('net');
var server = net.createServer();
server.on('connection', handleConnection);
server.listen(5000,'10.151.3.106', function() {
  console.log('Server hearing from %j', server.address());
});
server.maxConnections = 1;
function handleConnection(connect) {  
  var Address = connect.remoteAddress + ':' + connect.remotePort;
  console.log('Connection established newly from %s', Address);
  connect.setEncoding('utf8');
  connect.on('data', onConnData);
  connect.once('close', onConnClose);
  connect.on('error', onConnError);
  function onConnData(data) {
    console.log('Data received from %s: %j', Address, data);
    if (data == "exit")
    {
      connect.write(data);
    }
  }
  function onConnClose() {
    console.log('Connection %s terminated', Address);
  }
  function onConnError(error) {
  console.log('Error %s connection: %s', Address, error.message);
  }
}

