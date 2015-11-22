$(function () {
    var contentType = "application/json";
    var preserveToken = function (data) {
        Cookies.set('token', data.token);
    };
    var getToken = function () {
        return Cookies.get("token");
    }
    ProfileView = Backbone.View.extend({
        template: _.template($('#profile-template').html()),
        el: "#labo9-container",
        events: {
            "click .btn-login": "login"
            //"click .btn-save": "update",
            //"click .btn-delete": "delete"
        },
        initialize: function (options) {
            //Must bindAll. If not, it doesn't work.
            _.bindAll(this, 'render');

            //necessary for the next step.
            var self = this;
            this.collection.bind('sync add remove', function () {
                self.render();
            });
            var router = options.router;
            var collection = options.collection;
            router.on('route:login', function () {
                self.verifyIfLogged(self.displayProfile, self.displayLogin, router, collection);

            }).on('route:profile', function () {
                self.verifyIfLogged(self.displayProfile, self.redirectToLogin, router, collection);
            });

        },
        render: function () {
            this.$el.html(this.template({
                profile: this.collection.toJSON()
            }));
        },
        showError: function () {
            $('#error-handler').slideDown('fast');
        },
        hideError: function () {
            $('#error-handler').slideUp('fast');
        },
        verifyIfLogged: function (successCallback, errorCallback, router, collection) {
            var token = getToken();
            $.ajax({
                type: "GET",
                contentType: contentType,
                headers: {
                    token: token
                },
                url: this.collection.url + "userprofile",
                success: function (data) {
                    window.location.href = "index.html#/profile";
                    successCallback(router, collection, data)
                }, error: function (XMLHttpRequest, status, errorThrown) {
                    errorCallback(router, collection);
                }
            });
        },
        redirectToLogin: function (router) {
            console.log(router);
            router.navigate("login", {trigger: true, replace: true});
        },
        displayProfile: function (router, collection, data) {
            var profileTemplate = _.template($('#profile-template').html());
            console.log(profileTemplate);
            $("#labo9-container").html(profileTemplate({profile: data}));
        },
        redirectToProfile: function (router) {

            router.navigate("profile", {trigger: true, replace: true});
        },
        displayLogin: function (router, collection) {
            var loginTemplate = _.template($('#login-template').html());
            $("#labo9-container").html(loginTemplate(new ProfileModel().toJSON()))
        },
        login: function () {
            $('.error-handler').slideUp('fast');
            var username = $(".username").val();
            var password = btoa($(".password").val());
            var profile = {
                username: username,
                password: password
            }
            $.ajax({
                type: "POST",
                contentType: contentType,
                url: this.collection.url + "authorize",
                data: JSON.stringify(profile),
                success: function (data) {
                    preserveToken(data);
                    window.location.href = "index.html#/profile";
                }, error: function (XMLHttpRequest, status, errorThrown) {
                    $('.error-handler').slideDown('fast');
                }
            });
        },


    });

})
;