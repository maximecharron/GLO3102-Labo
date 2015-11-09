/**
 * Created by macha762 on 2015-11-09.
 */
var express = require('express');
var parser = require('body-parser');
var cors = require('cors');
var tasks = require('./tasks');
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
};

var app = express();
app.use(parser.json());
app.use(cors(corsOptions));
app.get('/tasks', tasks.getAll);
app.post('/tasks/:id', tasks.create);
app.put('/tasks/:id', tasks.update);
app.delete('/tasks/:id', tasks.delete);

var port = 5000;
app.listen(port);
