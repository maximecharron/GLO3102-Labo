/**
 * Created by macha762 on 2015-11-09.
 */
var tasks = [];

exports.getAll = function (req, res) {
    res.json({ tasks: tasks });
};

exports.create = function (req, res) {
    if (req.body.task === undefined) {
        res.status(400).send({
            error: 'BODY_TASK_EMPTY',
            message: 'You must pass a task in the body'
        });
    }
    tasks.push(req.body);
    res.send(201);
};

exports.update= function (req, res) {
    if (req.body.task === undefined) {
        res.status(400).send({
            error: 'BODY_TASK_EMPTY',
            message: 'You must pass a task in the body'
        });
    }
    var updateIndex = -1;
    tasks.forEach(function(task) {
        if (task.id == req.params.id) {
            updateIndex = task.indexOf(task);
        }
    });
    if (updateIndex !== -1) {
        tasks.splice(updateIndex, 1);
        tasks.push(req.body);
        res.send(200);
    } else {
        res.status(404).send({
            error: 'TASK_NOT_FOUND',
            message: 'Given task was not found.'
        });
    }
};

exports.delete = function (req, res) {
    var deleteIndex = -1;

    tasks.forEach(function(task, index) {
        if (task.id == req.params.id) {
            deleteIndex = index;
        }
    });

    if (deleteIndex !== -1) {
        tasks.splice(deleteIndex, 1);
        res.send(200);
    } else {
        res.status(404).send({
            error: 'TASK_NOT_FOUND',
            message: 'Given task was not found.'
        });
    }
};