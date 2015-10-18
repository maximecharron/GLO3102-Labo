$(function () {
  TaskView = Backbone.View.extend({
    template: _.template($('#tasks-template').html()),
    el: "#tasks-container",
    events: {
      "click #btn-add-task": "add",
      "click .btn-save": "update",
      "click .btn-delete": "delete"
    },
    initialize: function () {
        //Must bindAll. If not, it doesn't work.
      _.bindAll(this, 'render');

      //necessary for the next step.
      var self = this;

      this.collection.bind('sync add remove', function () {
        self.render();
      });
    },
    render: function () {
      this.$el.html(this.template({
        tasks: this.collection.toJSON()
      }));
    },
    add: function (event) {
      this.hideError();
      var isValid = this.collection.create({
        task: $('#task-editor').val(),
        id: Math.floor((Math.random() * 100000000) + 1) // On s'assure d'avoir le moins de chance possible d'avoir le même id)
      }, {
        type: 'POST', //API expect POST and not PUT
        validate: true //Always validate that the task is valid.
      });
      if (!isValid) {
        this.showError(); //User must know that there is a problem.
      }
    },
    update: function (event) {
      var taskId = $(event.target).data('id');
      var model = this.collection.get(taskId);
      //We must give id again to avoid the bug in the app.py. Only workaround we found.
      model.save({
        task: $(event.target).parent().find('.task-content').val(),
        id: taskId
      }, { validate : true})
    },

    delete: function (event) {
      var taskId = $(event.target).data('id');
      var model = this.collection.get(taskId);
      model.destroy(); // use destroy. it's the delete of backbone.
      this.collection.remove(taskId);
    },
    showError: function () {
      $('#error-handler').slideDown('fast');
    },
    hideError: function () {
      $('#error-handler').slideUp('fast');
    }
  });
});