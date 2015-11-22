(function() {
    ProfileModel = Backbone.Model.extend({
        defaults: {
            username: '',
            password: '',
            email: ''
        },
        parse: function(response) {
            this.email = response.email;
            this.username = response.username;
            this.password = response.password;
            return response;
        }

    });
})();