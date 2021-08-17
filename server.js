'use strict';
// Can-of-Books-Backend
// Today's Lecture Notes & Auth0 offical documentation for react and Express
/////////////////////////////////////////////////////////////////////////////////////
require('dotenv').config();
const express = require('express');
const CORS = require('cors');

const { getBooksController } = require('./controllers/dataControllers');
const { checkJwtController,
  configs,
} = require('./controllers/checkJwtController');

const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(CORS());

app.use(express.json());

//Routes 
app.get('/checkJwt', checkJwtController);
app.get('/Books/:email', getBooksController );


const PORT = configs.PORT;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
