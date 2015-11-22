$.fn.login = function (connection) {
    var connection = connection;

    var loginContainer = this;
    var newLoginPage = tasksContainer.find('`');
    var verifyIfUserLogged = function(){
        connection.verifyLogin({task: newTaskContent}, getAllTask, actionOnError);
    }

    function getAllTask() {
        connection.getAll(updatedCreatedTasks, actionOnError);
    }


    function actionOnError(errorStatus, errorMessage) {
        tasksContainer.find("#error-message").val(errorStatus + " " + errorMessage);
    }

    function updatedCreatedTasks(createdTasks) {
        newTaskEditor.val('');

        $("#tasks-list").html(''); // for reseting the list of tasks

        numberOfTaskAdded = createdTasks.tasks.length;
        for (var i = 0; i < numberOfTaskAdded; i++) {
            var createdTask = createdTasks.tasks[i];

            var div = $("<div/>", {"class": "task", "id": "task" + createdTask.id});

            div.append($("<textarea/>", {class: "task-content"}).val(createdTask.task));
            div.append($("<button />", {class: "btn-update"}).text("Save"));
            div.append($("<button />", {class: "btn-delete"}).text("Delete"));

            $("#tasks-list").append(div);
        }

        // bind the update button
        tasksContainer.find(".btn-update").click(function () {
            var parentElement = $(this).parent();

            var taskContent = parentElement.find(".task-content").val();

            connection.update({task: taskContent},
                '/' + parentElement.attr('id').replace("task", ""), getAllTask, actionOnError);
        });

        //bind the delete button
        tasksContainer.find(".btn-delete").click(function () {
            //fetch the parent for getting the
            var parentElement = $(this).parent();

            connection.delete('/' + parentElement.attr('id').replace("task", ""), getAllTask, actionOnError);
        });

    }

    tasksContainer.find("#btn-add-task").click(function () {
        addTask();
    })
    // define the function for adding a task
    function addTask() {
        var newTaskContent = newTaskEditor.val();

        connection.add({task: newTaskContent}, getAllTask, actionOnError);

    }

}

$(document).ready(function () {
    var url = 'http://localhost:5000/';
    var connection = new AjaxConnection(url);

    $('.labo9-container').login(connection);
});