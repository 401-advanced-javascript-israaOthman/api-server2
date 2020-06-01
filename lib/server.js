'use strict';

const express = require('express');
const app = express();


//========Middlewere============\\
const timestamp = require('../middleware/timestamp');
const logger = require('../middleware/logger');
const notFound = require('../middleware/404');
const serverError = require('../middleware/500');

//========Global Middlewere============\\
app.use(express.json());
app.use(timestamp);
app.use(logger);


//============database===========\\
let db = {
  'categories': [
    {
      'id': 1,
      'name': 'Comedy-Films',
      'display_name': 'Comedy',
      'description': 'The latest comedy movies',
    },
    {
      'id': 2,
      'name': 'Drama-Films',
      'display_name': 'Drama',
      'description': 'The latest Drama films',
    },
  ],
  'products': [
    {
      'id': 1,
      'category': 1,
      'name': 'bad boys for life',
      'display_name': 'Bad Boys For Life',
      'description': 'American action comedy film directed by Adil & Bilall and written by Chris Bremner, Peter Craig and Joe Carnahan',
    },
    {
      'id': 2,
      'category': 1,
      'name': 'Avengers EndGame',
      'display_name': 'Marvel',
      'description': 'The last Avengers movie',
      
    },
  ],
};

//============original Rout==========\\
app.get('/',(req,res)=>{
  res.status(200).send('working');
});

//============GET Routs==========\\
app.get('/categories', (req, res) => {
  res.status(200).send(db.categories);
});

app.get('/products', (req, res) => {
  res.status(200).send(db.products);
});

//============GET with id Routs==========\\
app.get('/categories/:id', (req, res) => {
  let id = req.params.id;
  let result ;
  db.categories.forEach(val =>{
    if(val.id == id){
      result = val;
    }
  });
  res.status(200).send(result);
});

app.get('/products/:id', (req, res) => {
  let id = req.params.id;
  let result ;
  db.products.forEach(val =>{
    if(val.id == id){
      result = val;
    }
  });
  res.status(200).send(result);
});

//============POST Routs==========\\
app.post('/categories', (req, res) => {
  let name = req.body.name;
  let display_name = req.body.display_name;
  let description  = req.body.description;
  let id = db.categories.length +1;
  let record =  {
    'id': id,
    'name': name,
    'display_name': display_name,
    'description': description,
  };
  db.categories.push(record);
  res.status(200).send(record);
});

app.post('/products', (req, res) => {
  let name = req.body.name;
  let category = req.body.category;
  let display_name = req.body.display_name;
  let description  = req.body.description;
  let id = db.products.length +1;
  let record =  {
    'id': id,
    'category':category,
    'name': name,
    'display_name': display_name,
    'description': description,
  };
  db.products.push(record);
  res.status(200).send(record);
});

//============PUT Routs==========\\

app.put('/categories/:id', (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let display_name = req.body.display_name;
  let description  = req.body.description;

  db.categories.forEach(val =>{
    if(val.id == id){
      val.name = name;
      val.display_name = display_name;
      val.description = description;
      res.status(200).send(val);
    }
    res.status(200).send('no such category');
  });
});

app.put('/products/:id', (req, res) => {
  let id = req.params.id;
  let category = req.body.category;
  let name = req.body.name;
  let display_name = req.body.display_name;
  let description  = req.body.description;
  
  db.products.forEach(val =>{
    if(val.id == id){
      val.name = name;
      val.category = category;
      val.display_name = display_name;
      val.description = description;
      res.status(200).send(val);
    }
    res.status(200).send('no such product');
  });
});

//============DELETE Routs==========\\

app.delete('/categories/:id', (req, res) => {
  let id = req.params.id;
  db.categories.forEach(val =>{
    if(val.id == id){
      db.categories.pop(val);
      res.status(200).send(db.categories);
    }
  });
});

app.delete('/products/:id', (req, res) => {
  let id = req.params.id;
  db.products.forEach(val =>{
    if(val.id == id){
      db.products.pop(val);
      res.status(200).send(db.products);
    }
  });
});





app.use('*', notFound); 
app.use(serverError); 



module.exports = {
  server : app, 
  start : (port) =>{
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
  },
};