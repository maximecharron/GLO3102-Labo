/**
 * Created by Antoine on 11/21/2015.
 */
function AjaxConnection(url) {
    this.baseUrl = url;
    this.contentType = 'application/json;charset=UTF-8';


    this.verifyLogin = function ( successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            contentType: this.contentType,
            url: this.baseUrl + "/userprofile",
            success: function (returnedMessage) {
                successCallback(returnedMessage)
            }, error: function (XMLHttpRequest, status, errorThrown) {
                errorCallback(status, errorThrown);
            }
        });
    }
    this.authorize = function (data, successCallback, errorCallback) {
        $.ajax({
            type: "POST",
            contentType: this.contentType,
            url: this.baseUrl,
            data: JSON.stringify(data),
            success: function (returnedMessage) {
                successCallback();
            }, error: function (XMLHttpRequest, status, errorThrown) {
                errorCallback(status, errorThrown);
            }
        });
    }
}
