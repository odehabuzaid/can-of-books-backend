'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const getConfig = require('./configs/allConfigs');
const configs = getConfig();

const morgan = require('morgan');
const helmet = require('helmet');

const { getBooks, addBook } = require('./Controllers/theCan.controller');
const { checkJwt } = require('./Controllers/checkJwt.controller');

app.use(morgan('dev'));
app.use(helmet());

app.use(cors());
app.use(express.json());

mongoose.connect(configs.AtlasDataBaseConnection, configs.ConnectionParameters);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
  console.log('Mongoose is Connected!');
});

app.get('/checkJwt', checkJwt);
app.get('/books', getBooks);
app.post('/addabook', addBook);

const PORT = configs.PORT 
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// https://nodejs.org/api/process.html
// 'uncaughtException' to stay on service
// You Stay Alive ..
process.on('uncaughtException', (err) =>
  console.log('Caught exception: ', err)
);
