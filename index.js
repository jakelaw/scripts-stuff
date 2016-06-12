var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users_online = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  users_online++;	
  io.emit('chat message', "users online: " +users_online);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
	users_online--;
    io.emit('chat message', "users online: " +users_online);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});