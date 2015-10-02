/**
 * Created by Antoine on 2015-10-02.
 */






$(document).ready(function(){
    var url = 'http://localhost:5000';
    var connection = new AjaxConnection(url);

    $('.tasks-container').taskit(connection);
});