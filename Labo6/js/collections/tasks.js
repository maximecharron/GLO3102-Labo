$(function() {
    TaskCollection = Backbone.Collection.extend({
        model: TaskModel,
        parse: function(response) {
            return response.tasks;
        }
    });
});