$(function () {
  TaskView = Backbone.View.extend({
    template: _.template($('#tasks-template').html()),
    el: "#tasks-container",
    events: {
      "click #btn-add-task": "buttonAddHandler",
      "click .btn-save": "buttonSaveHandler",
      "click .btn-delete": "buttonDeleteHandler"
    },
    initialize: function () {

      _.bindAll(this, 'render');

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
    buttonAddHandler: function (event) {
      this.hideError();
      var isValid = this.collection.create({
        id: Math.floor((Math.random() * 100000000) + 1),
        task: $('#task-editor').val()
      }, {
        type: 'POST',
        validate: true
      });
      if (!isValid) {
        this.showError();
      }
    },
    buttonSaveHandler: function (event) {
      var taskId = $(event.target).data('id');
      var model = this.collection.get(taskId);

      model.save({
        task: $(event.target).parent().find('.task-content').val(),
        id: taskId
      }, { validate : true})
    },

    buttonDeleteHandler: function (event) {
      var taskId = $(event.target).data('id');
      var model = this.collection.get(taskId);
      model.destroy();
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