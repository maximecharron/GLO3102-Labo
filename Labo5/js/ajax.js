/**
 * Created by Antoine on 2015-10-02.
 */
function AjaxConnection(url) {
    this.baseUrl = url;
    this.contentType = 'application/json;charset=UTF-8';

    this.getAll = function ( successCallback) {
        $.ajax({
            type: "GET",
            contentType: this.contentType,
            url: this.baseUrl,
            success: function (returnedMessage) {
                successCallback()
            }, error: function (XMLHttpRequest, status, errorThrown) {
                console.log(status);
            }
        });
    }
    this.add = function (data, successCallback) {
        $.ajax({
            type: "POST",
            contentType: this.contentType,
            url: this.baseUrl,
            data: JSON.stringify(data),
            success: function (returnedMessage) {
                successCallback()
            }, error: function (XMLHttpRequest, status, errorThrown) {
                console.log(status);
            }
        });
    }

    this.delete = function (url, successCallback) {
        $.ajax({
            type: "DELETE",
            contentType: this.contentType,
            url: this.baseUrl + url,
            success: function (returnedMessage) {
                successCallback()
            }, error: function (XMLHttpRequest, status, errorThrown) {
                console.log(status);
            }
        });
    }



    this.update = function (data, url,  successCallback) {
        $.ajax({
            type: "PUT",
            contentType: this.contentType,
            url: this.baseUrl + url,
            data: JSON.stringify(data),
            success: function (returnedMessage) {
                successCallback()
            }, error: function (XMLHttpRequest, status, errorThrown) {
                console.log(status);
            }
        });
    }
}
