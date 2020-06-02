'use strict';

const express = require('express');


const categoryMD = require('../lib/models/categories/categoriesCollection.js');
const router = express.Router();

//============Routs==========\\
router.get('/categories', getCategories);
router.get('/categories/:id', getCategorieID);
router.post('/categories', postCategorie);
router.put('/categories/:id', putCategorie);
router.delete('/categories/:id', deleteCategorie);


//============Functions=========\\
function getCategories(req, res, next){
  categoryMD.read()
    .then(data =>{
      res.status(200).send(data);
    })
    .catch(next);
}

function getCategorieID(req, res, next){
  categoryMD.read(req.params.id)
    .then(data =>{
      res.status(200).send(data);
    })
    .catch(next);
}


function postCategorie(req, res ,next) {
  // console.log('post body',req.body);
  categoryMD.create(req.body)
    .then(data =>{
      // console.log('data',data);
      res.status(201).json(data); 
    })
    .catch(next);
    
}
  
function putCategorie(req, res ,next) {
  categoryMD.update(req.params.id,req.body)
    .then(data =>{
      res.status(201).send(data); 
    })
    .catch(next);
}


  
function deleteCategorie(req, res, next) {
  categoryMD.delete(req.params.id)
    .then(data =>{
      res.status(200).send(data);
    })
    .catch(next);
}



module.exports = router;