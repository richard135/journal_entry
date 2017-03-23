const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
let index = 1;
let todos = [
  {name: 'Prepare Redux Lecture', completed: false, id: 0}
];
app.use(express.static('public'));
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/build'
}));

app.get('/todos', (req, res) =>{
  res.json(todos);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter((todo) => todo.id != req.params.id)
  res.sendStatus(200);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find(todoFinder(req.params.id));
  if(todo){
    res.json(todo);
  } else {
    res.sendStatus(404);
  }
});

app.post('/todos', (req, res) => {
  if(req.body){
    req.body.id = ++index;
    todos.push(req.body);
    res.json(req.body);
  } else{
    res.sendStatus(400);
  }
})

app.put('/todos/:id', (req, res) =>{
  const found = todos.find(todoFinder(req.params.id));
  if(found){
    found.completed = true;
    res.json(found);
  } else {
    res.sendStatus(404);
  }
})

function todoFinder(id){
  return function(todo){
    return todo.id.toString() == id.toString();
  }
}
app.listen(3000);