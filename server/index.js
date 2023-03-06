const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const port = 3000;
//this is just for testing autocomplete
const wordData = require('./testWords.js');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/&q=*', (req, res) => {
  console.log(process.env.API_URL, process.env)
  // axios.get(process.env.API_URL + req.url.slice(1))
  // .then(res => console.log(res));
})

//this is just for testing autocomplete
app.get('/ingredientdata', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(wordData));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//test data = = = = = = = = = = = = = = = = = = = = =

