const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
let index = 1;
let articles = [
  {name: 'Prepare Redux Lecture', id: 0, words:0}
];
app.use(express.static('public'));
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/build'
}));

app.get('/articles', (req, res) =>{
  res.json(articles);
});

app.delete('/articles/:id', (req, res) => {
  articles = articles.filter((article) => article.id != req.params.id)
  res.sendStatus(200);
});

app.get('/articles/:id', (req, res) => {
  const article = articles.find(articleFinder(req.params.id));
  if(article){
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.post('/articles', (req, res) => {
  if(req.body){
    req.body.id = ++index;
    articles.push(req.body);
    res.json(req.body);
  } else{
    res.sendStatus(400);
  }
})

app.put('/articles/:id', (req, res) =>{
  const found = articles.find(articleFinder(req.params.id));
  if(found){
    found.completed = true;
    res.json(found);
  } else {
    res.sendStatus(404);
  }
})

function articleFinder(id){
  return function(article){
    return article.id.toString() == id.toString();
  }
}
app.listen(3000);