'use strict';
// Can-of-Books-Backend
// Today's Lecture Notes & Auth0 offical documentation for react and Express
/////////////////////////////////////////////////////////////////////////////////////
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getBooksController } = require('./controllers/dataControllers');
const { checkJwtController,
  configs,
} = require('./controllers/checkJwtController');

const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(express.json());

//Routes 
app.get('/checkJwt', checkJwtController);
let MongoClient = require('mongodb').MongoClient;
app.get('/Books/:email', (request, response) => {
  MongoClient.connect(configs.AtlasDB, configs.ConnectionParameters, (error, db) => {
    if (error) throw error;
    let dbo = db.db('amman-301d28');
    let query = { email: request.params.email };
    dbo
      .collection('books')
      .find(query)
      .toArray((error, result) => {
        if (error) throw error;
        response.json(result[0]);
        db.close();
      });
  });
});

const PORT = configs.PORT;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
