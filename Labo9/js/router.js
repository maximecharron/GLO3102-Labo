/**
 * Created by Antoine on 11/21/2015.
 */
var LoginProfileRouter = Backbone.Router.extend({
    routes: {
        "profile": "profile",
        "login": "login"
    },
    "profile": function(){
        alert("profile")
    },
    "login" : function(){
        alert("login");
    },
    verifyIfLogged: function (successCallback, errorCallback, router) {
        console.log(this.collection.url);
        $.ajax({
            type: "GET",
            contentType: this.contentType,
            url: this.collection.url + "userprofile",
            success: function (data) {
                successCallback(router, data)
            }, error: function (XMLHttpRequest, status, errorThrown) {
                errorCallback(router);
            }
        });
    }

});