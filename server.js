'use strict';
// Can-of-Books-Backend
// Today's Lecture Notes & Auth0 offical documentation for react and Express
/////////////////////////////////////////////////////////////////////////////////////
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { checkJwtController} = require('./controllers/checkJwtController');
const getConfig = require('./configs/allConfigs');
const configs = getConfig();
const app = express();


const morgan = require('morgan');
const helmet = require('helmet');
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

//Routes 
app.get('/checkJwt', checkJwtController);
app.get('/Books/:email', (request, response) => {
  let MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(configs.AtlasDB, configs.ConnectionParameters, (error, db) => {
    if (error) handleError(error);
    let dbo = db.db('amman-301d28');
    let query = { email: request.params.email };
    dbo.collection('books')
        .find(query)
        .toArray((error, result) => {
            if (error) handleError(error);
            response.json(result[0]);
          });
      });
    }
);

function handleError(error) {
  console.clear();
  console.log(error);
}

const PORT = configs.PORT;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));