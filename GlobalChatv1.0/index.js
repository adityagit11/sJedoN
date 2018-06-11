// We import express core module and store it in app variable.
// Next we imported http module and supply the express app variable to HTTP Server.
var app = require('express')();
var http = require('http').Server(app);

// We initialized a new instance of socket.io by passing the http object.
var io = require('socket.io')(http);


// We define a route handler '/' that gets called when we hit our website home.
app.get('/', function(req, res){
    res.sendFile(__dirname + '\\index.html');
});

// We listen on the connection event for incoming sockets, and logs it on console.
io.on('connection', function(socket){
    console.log('New User Connected!');

    // Everytime an user disconnect.
    socket.on('disconnect', function(){
        console.log('An User Disconnected!');
    });

    // Event: chat message
    socket.on('chat message', function(msg){
        console.log('Message: ',msg);
        io.emit('chat message', msg);
    })
});

// We make the http server listen on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});