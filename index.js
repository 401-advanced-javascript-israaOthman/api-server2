'use strict';

const mongoose = require('mongoose');
const server = require('./lib/server.js');
const dotenv = require('dotenv');

const MONGODB_URI = 'mongodb://localhost:27017/api';



const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(MONGODB_URI, mongooseOptions);

server.start();