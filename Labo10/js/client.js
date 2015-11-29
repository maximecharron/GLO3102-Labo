/**
 * Created by Antoine on 11/28/2015.
 */
var socket = io();
var person = "";
while(person.length == 0){
    var person = prompt("Please enter your name");
}
$('form').submit(function(){
    socket.emit('chat message', person +" - " +$('#message').val());
    $('#message').val('');
    return false;
});
socket.on('chat message', function(newMessage){
    $('#messages').append($("<li>").text(newMessage));
});