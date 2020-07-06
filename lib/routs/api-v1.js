'use strict';

const express = require('express');

const router = express.Router();


const getModel = require('../../middleware/checkRout');

router.param('model', getModel);
//////////////////////////////////////////////////////////////////////////////
// const productSchema = require('../../lib/models/products/proSchema');
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null,  path.resolve(__dirname,'./uploder/'));
//   },
//   filename: function(req, file, cb) {
//     cb(null,  file.originalname);
//   },
// });
// const upload = multer({storage:storage});
////////////////////////////////////////////////////////////////////////////////////
//============Routs==========\\
router.get('/api/v1/:model', getHandler);
router.get('/api/v1/:model/:id', getOneHandler);
router.post('/api/v1/:model', postHandler);
router.put('/api/v1/:model/:id', putHandler);
router.delete('/api/v1/:model/:id', deleteHandler);

// router.post('/test', upload.single('image') ,(req,res,next)=>{
//   console.log(req.file);
//   const record = new productSchema({name:req.body.name,category:req.body.category,img:req.file.path});
//   record.save()
//     .then(result =>{
//       console.log('rrrrrrrrrrrrrrrrr',result);
//       res.status(201).json({
//         message : 'created',
//         createdProduct : {
//           name:result.name,
//           category:result.category,
//           _id:result._id,
//           img:result.img,
//           request:{
//             type:'GET',
//             url:'https://api-testtt.herokuapp.com/test/' + result._id,
//           },
//         },
//       });
//       // res.sendFile(__dirname + '/public/index.html');
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     }); 
// });


//============Functions=========\\
function getHandler(req, res, next){
  req.model.read()
    .then(data =>{
      let output ={
        count : data.length ,
        result : data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}

function getOneHandler(req, res, next){
  req.model.read(req.params.id)
    .then(data =>{
      res.status(200).json(data);
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
      res.status(201).json(data); 
    })
    .catch(next);
}
  
function deleteHandler(req, res, next) {
  req.model.delete(req.params.id)
    .then(data =>{
      res.status(200).json(data);
    })
    .catch(next);
}



module.exports = router;