const express = require('express');
const bodyParser = require('body-parser');

var todo_list = []

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

// Todas tarefas
app.get('/todos', (req, res) => {
    res.json(todo_list);
});

// Salva nova tarefa
app.post('/todos', (req, res) => {
    todo_list.push(req.body.todo_text)
    res.json(true);
});

// Deleta tarefa
app.delete('/todos/:id', (req, res) => {
    todo_list.splice(req.params.id, 1)
    res.json(true);
});

// listen for requests
app.listen(888, () => {
    console.log("Rodando o server");
});