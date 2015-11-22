$(function () {
    ProfileCollection = Backbone.Collection.extend({
        model: ProfileModel,
        parse: function (response) {
            return response;
        }
    });
});