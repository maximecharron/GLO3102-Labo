$(function () {
    ProfileView = Backbone.View.extend({
        template: _.template($('#profile-template').html()),
        el: "#labo9-container",
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
            console.log(this.collection.url);
            $.ajax({
                type: "GET",
                contentType: this.contentType,
                url: this.collection.url + "userprofile",
                success: function (data) {
                    successCallback(router, data)
                }, error: function (XMLHttpRequest, status, errorThrown) {
                    errorCallback(router, collection);
                }
            });
        },
        redirectToLogin: function (router) {
            console.log(router);
            router.navigate("login", {trigger: true, replace: true});
        },
        displayProfile: function (data) {
            this.collection.set(data);
        },
        redirectToProfile: function (router) {
            router.navigate("profile", {trigger: true, replace: true});
        },
        displayLogin: function (router, collection) {
            console.log(collection.url);
            var loginTemplate = _.template($('#login-template').html());
            $("#labo9-container").html(loginTemplate(new ProfileModel().toJSON()))
        },

    });

})
;