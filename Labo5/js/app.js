/**
 * Created by Antoine on 2015-10-02.
 */
$.fn.taskEditor = function (connection) {
    var connection = connection;

    var tasksContainer = this;
    var newTaskEditor = tasksContainer.find('#task-editor');

    getAllTask();

    //function createNewTask(taskContent) {
    //    return { task : taskContent };
    //}

    function getAllTask() {
        connection.getAll(updatedCreatedTasks);
    }

    function updatedCreatedTasks(createdTasks) {
        newTaskEditor.val('');
        //$('#tasks-list')

        for (var i = 0; i < createdTasks.length; i++) {
            var createdTask = createdTasks[i];

            var div = $("<div/>", {"class": "task", "id": "task" + createdTask.id});

            div.append($("<textarea/>", {class: "task-content"}).val(createdTask.task));
            div.append($("<button />", {class: "btn-update"}).text("Save"));
            div.append($("<button />", {class: "btn-delete"}).text("Delete"));

            $("#tasks-list").append(div);
        }

        // bind the update button
        tasksContainer.find(".btn-update").click(function(){
            var parentElement = $(this).parent();

            var taskContent = parentElement.find(".task-content").val();

            connection.update({task:taskContent}, '/' + parentElement.attr('id').replace("task", ""));
        });

        //bind the delete button
        tasksContainer.find(".btn-delete").click(function(){
            //fetch the parent for getting the
            var parentElement = $(this).parent();

            connection.delete('/'+ parentElement.attr('id').replace("task", ""));
        });

    }

    // define the function for adding a task
    function addTask(){
        var newTaskContent = newTaskEditor.val();

        connection.add({task:newTaskContent}, updatedCreatedTasks);
    }


}


$(document).ready(function () {
    var url = 'http://localhost:5000/tasks';
    var connection = new AjaxConnection(url);

    $('.tasks-container').taskEditor(connection);
});