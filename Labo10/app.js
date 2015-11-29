/**
 * Created by Antoine on 11/28/2015.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var messages = [];
app.get('/', function(req, res){
    res.sendfile('index.html');
});
app.get('/style/app.css',function(req, res){
    res.sendfile('style/app.css');
});
app.get('/js/client.js', function(req, res){
    res.sendfile('js/client.js');
});
http.listen(3000, function(){
    console.log('listening on *:3000');
});
io.on('connection', function(socket){
    console.log('a user connected');
    socket.send(messages);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        messages.add(msg);
    });

});

io.emit('some event', { for: 'everyone' });

