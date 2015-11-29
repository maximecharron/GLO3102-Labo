/**
 * Created by Antoine on 11/28/2015.
 */
var socket = io();
$('form').submit(function(){
    socket.emit('chat message', $('#message').val());
    $('#message').val('');
    return false;
});
socket.on('chat message', function(newMessage){
    $('#messages').append($("<li>").text(newMessage));
});