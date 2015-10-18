$(function () {
  var taskCollection = new TaskCollection({});
  taskCollection.url = 'http://localhost:5000/tasks';

  var taskView = new TaskView({
    collection: taskCollection
  });
  taskCollection.fetch();
});