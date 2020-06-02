'use strict';

const express = require('express');
const router = express.Router();


const productMD = require('../lib/models/products/productsCollection');

//============Routs==========\\
router.get('/products', getProducts);
router.get('/products/:id', getProductID);
router.post('/products', postProduct);
router.put('/products/:id', putProduct);
router.delete('/products/:id', deleteProduct);


//============Functions=========\\
function getProducts(req, res, next){
  productMD.read()
    .then(data =>{
      res.status(200).send(data);
    })
    .catch(next);
}

function getProductID(req, res, next){
  productMD.read(req.params.id)
    .then(data =>{
      res.status(200).send(data);
    })
    .catch(next);
}


function postProduct(req, res ,next) {
  productMD.create(req.body)
    .then(data =>{
      res.status(201).send(data); 
    })
    .catch(next);
    
}
  
function putProduct(req, res ,next) {
  productMD.update(req.params.id,req.body)
    .then(data =>{
      res.status(201).send(data); 
    })
    .catch(next);
}


  
function deleteProduct(req, res, next) {
  productMD.delete(req.params.id)
    .then(data =>{
      res.status(200).send(data);
    })
    .catch(next);
}



module.exports = router;