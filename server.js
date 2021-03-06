const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require("pg");
const settings = require("./settings"); // settings.json
const knexSettings = require("./knexfile.js");
const connection = knexSettings.development;
const knex = require('knex')(
  connection);



app.use(bodyParser.json());
let index = 1;
let articles = [
  {name: '', id: 0, rating:0, words:0, sentiment_score:0}
];
app.use(express.static('public'));
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/build'
}));

app.get('/articles', (req, res) =>{
  knex.select().table('articles').orderBy('sentiment_score', 'desc')
  .then(article => {
    res.json(article);
  })
  .catch(err => {
    console.error('Knex error on insert:', err);
  })
});

app.post('/articles', (req, res) => {
  if(!req.body.name){
    req.body.words = 0;
  }
  if(req.body){
    req.body['sentiment_score'] = req.body.rating * req.body.words
    articles.push(req.body);
    knex('articles').insert(req.body)
    .then(article => {
      res.json(req.body);
    })
    .catch(err => {
      console.error('Knex error on insert:', err);
    });
  } else{
    res.sendStatus(400);
  }
})


app.listen(3000);