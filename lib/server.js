'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


//========Middlewere============\\
const timestamp = require('../middleware/timestamp');
const logger = require('../middleware/logger');
const notFound = require('../middleware/404');
const serverError = require('../middleware/500');
app.use(timestamp);
app.use(logger);
const categoryRouter = require('../routes/categories');
const productRouter = require('../routes/product');

//========Global Middlewere============\\
//    express middleware 
app.use(express.json());
//    3rd party middleware
app.use(cors());
app.use(morgan('dev'));


//========Routs============\\
app.get('/',(req,res)=>{
  res.send('Working ... :p');
});

app.use('/api/v1',categoryRouter);
app.use(productRouter);

app.use('*', notFound); 
app.use(serverError); 



module.exports = {
  server : app, 
  start : (port) =>{
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
  },
};