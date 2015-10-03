/**
 * Created by Antoine on 2015-10-02.
 */
function AjaxConnection(url) {
    this.baseUrl = url;
    this.contentType = 'application/json;charset=UTF-8';


    this.getAll = function ( successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            contentType: this.contentType,
            url: this.baseUrl,
            success: function (returnedMessage) {
                successCallback(returnedMessage)
            }, error: function (XMLHttpRequest, status, errorThrown) {
                errorCallback(status, errorThrown);
            }
        });
    }
    this.add = function (url, data, successCallback, errorCallback) {
        $.ajax({
            type: "POST",
            contentType: this.contentType,
            url: this.baseUrl + url,
            data: JSON.stringify(data),
            success: function (returnedMessage) {
                successCallback();
            }, error: function (XMLHttpRequest, status, errorThrown) {
                errorCallback(status, errorThrown);
            }
        });
    }

    this.delete = function (url, successCallback, errorCallback) {
        $.ajax({
            type: "DELETE",
            contentType: this.contentType,
            url: this.baseUrl + url,
            success: function (returnedMessage) {
                successCallback()
            }, error: function (XMLHttpRequest, status, errorThrown) {
                errorCallback(status, errorThrown);
            }
        });
    }



    this.update = function (data, url,  successCallback, errorCallback) {
        $.ajax({
            type: "PUT",
            contentType: this.contentType,
            url: this.baseUrl + url,
            data: JSON.stringify(data),
            success: function (returnedMessage) {
                successCallback()
            }, error: function (XMLHttpRequest, status, errorThrown) {
                errorCallback(status, errorThrown);
            }
        });
    }
}
