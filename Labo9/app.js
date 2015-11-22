$(function () {
    var router = new LoginProfileRouter();
    Backbone.history.start();
    var profile = new ProfileCollection({});

    profile.url = 'http://localhost:5000/';
    var profileView = new ProfileView({
        collection: profile,
        router:router
    });
});