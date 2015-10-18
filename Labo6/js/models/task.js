(function() {
    TaskModel = Backbone.Model.extend({
        defaults: {
            id: '',
            task: ''
        },
        parse: function(response) {
            this.id = response.id;
            this.task = response.task;
            return response;
        },
        validate: function (attrs) {
            if (!attrs.task || attrs.task === "") {
                return 'Please enter a valid task.';
            }
        }
    });
})();