'use strict';

const express = require('express');

const router = express.Router();


const getModel = require('../../middleware/checkRout');

router.param('model', getModel);

//============Routs==========\\
router.get('/api/v1/:model', getHandler);
router.get('/api/v1/:model/:id', getOneHandler);
router.post('/api/v1/:model', postHandler);
router.put('/api/v1/:model/:id', putHandler);
router.delete('/api/v1/:model/:id', deleteHandler);


//============Functions=========\\
function getHandler(req, res, next){
  req.model.read()
    .then(data =>{
      let output ={
        count : data.length ,
        result : data,
      };
      res.status(200).send(output);
    })
    .catch(next);
}

function getOneHandler(req, res, next){
  req.model.read(req.params.id)
    .then(data =>{
      res.status(200).send(data);
    })
    .catch(next);
}


function postHandler(req, res ,next) {
  req.model.create(req.body)
    .then(data =>{
      res.status(201).json(data); 
    })
    .catch(next);
    
}
  
function putHandler(req, res ,next) {
  req.model.update(req.params.id,req.body)
    .then(data =>{
      res.status(201).send(data); 
    })
    .catch(next);
}
  
function deleteHandler(req, res, next) {
  req.model.delete(req.params.id)
    .then(data =>{
      res.status(200).send(data);
    })
    .catch(next);
}



module.exports = router;