var net = require('net');
var sockets = [];
var server = net.createServer(function(socket){
sockets.push(socket);
});
server.on('connection', handleConnection);
server.listen(5000,'10.151.3.106', function() {
  console.log('Server hearing from %j', server.address());
});
function handleConnection(conn) {  
  var remoteAddr = conn.remoteAddress + ':' + conn.remotePort;
  console.log('Connection established newly from %s', remoteAddr);
  conn.setEncoding('utf8');
  conn.on('data', onConnData);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);
  function onConnData(data) {
    console.log('Data received from %s: %j', remoteAddr, data);
    if (data == "exit")
    {
      conn.write(data);
    }
  }
  function onConnClose() {
    console.log('Connection %s terminated', remoteAddr);
  }
  function onConnError(error) {
  console.log('Error %s connection: %s', remoteAddr, error.message);
  }
}
