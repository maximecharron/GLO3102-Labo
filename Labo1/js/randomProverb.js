/**
 * Created by macha762 on 2015-09-03.
 */

var loadXMLDoc = function () {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                document.getElementsByClassName("randomProverb").forEach(function (elem) {
                    elem.innerHTML = xmlhttp.responseText;
                })
            }
        }

        xmlhttp.open("GET", "https://api.github.com/zen", true);
        xmlhttp.send();
    }
};

window.onload = loadXMLDoc();