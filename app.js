// // call all the required packages
// const express = require('express')
// const bodyParser= require('body-parser')
// const multer = require('multer');
// const fs = require('fs');

// //CREATE EXPRESS APP
// const app = express();
 

// app.use(bodyParser.urlencoded({extended: true}))
 
 
// // SET STORAGE
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//     // cb(null,  file.originalname);
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
   
//   let upload = multer({ storage: storage })



// //ROUTES WILL GO HERE
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');  
// });


// app.post('/uploadphoto', upload.single('picture'), (req, res) => {
//  let img = fs.readFileSync(req.file.path);
//  let encode_image = img.toString('base64');
//  // Define a JSONobject for the image attributes for saving to database
  
//  let finalImg = {
//       contentType: req.file.mimetype,
//       image:  new Buffer(encode_image, 'base64')
//    };
// db.collection('quotes').insertOne(finalImg, (err, result) => {
//     console.log(result)
 
//     if (err) return console.log(err)
 
//     console.log('saved to database')
//     res.redirect('/') 
//   })
// })


// app.get('/photos', (req, res) => {
//     db.collection('quotes').find().toArray((err, result) => {
     
//           const imgArray= result.map(element => element._id);
//                 console.log(imgArray);
     
//        if (err) return console.log(err)
//        res.send(imgArray)
     
//       })
//     });

// // or "if we know the id ":
// app.get('/photo/:id', (req, res) => {
//     var filename = req.params.id;
     
//     db.collection('mycollection').findOne({'_id': ObjectId(filename) }, (err, result) => {
     
//         if (err) return console.log(err)
     
//        res.contentType('image/jpeg');
//        res.send(result.image.buffer)
       
        
//       })
//     })




// const MongoClient = require('mongodb').MongoClient
// const myurl = 'mongodb+srv://labTest:1234@cluster0-zjquu.mongodb.net/test';
 
// MongoClient.connect(myurl, (err, client) => {
//   if (err) return console.log(err)
//   db = client.db('test') 
//   app.listen(3000, () => {
//     console.log('listening on 3000')
//   })
// })

var express = require('express') 
var app = express() 
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose') 
  
var fs = require('fs'); 
var path = require('path'); 
require('dotenv/config'); 




app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 
  
// Set EJS as templating engine  
app.set("view engine", "ejs"); 






var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
  
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
var upload = multer({ storage: storage }); 






var imgModel = require('./model');  




// Retriving the image 
app.get('/', (req, res) => { 
    imgModel.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('app', { items: items }); 
        } 
    }); 
}); 





// Uploading the image 
app.post('/', upload.single('image'), (req, res, next) => { 
  
    var obj = { 
        name: req.body.name, 
        desc: req.body.desc, 
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
    } 
    imgModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // item.save(); 
            res.redirect('/'); 
        } 
    }); 
}); 














// Connecting to the database  
mongoose.connect('mongodb+srv://labTest:1234@cluster0-zjquu.mongodb.net/test', 
    { useNewUrlParser: true, useUnifiedTopology: true }, err => { 
        console.log('connected') 
    }); 
 


    app.listen('3000' || process.env.PORT, err => { 
        if (err) 
            throw err 
        console.log('Server started') 
    }) 