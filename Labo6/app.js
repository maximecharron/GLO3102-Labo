$(function () {
  var tasks = new TaskCollection({});
  tasks.url = 'http://localhost:5000/tasks';

  var view = new TaskView({
    collection: tasks
  });
  tasks.verifyIfLogged();
  view.verifyIfLogged();
});