'use strict';
// Can-of-Books-Backend
// Today's Lecture Notes & Auth0 offical documentation for react and Express
/////////////////////////////////////////////////////////////////////////////////////

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const JsonWebToken = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const Books = require('./data/Books');


const authConfig = {
  clientId: process.env.AUTH0_CLIENT_ID,
  audience: process.env.AUTH0_AUDIENCE,
  domain: process.env.AUTH0_DOMAIN,
};

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

function getKey(header, callback) {
  const client = jwksClient({
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  });

  client.getSigningKey(header.kid, function (err, key) {
    const signInKey = key.publicKey || key.rsaPublicKey;
    callback(null, signInKey);
  });
}
app.get('/checkJwt', (request, response) => {
  JsonWebToken.verify(
    request.headers.authorization.split(' ')[1],
    getKey,
    {},
    (error, user) => {
      if (error) {
        response.send(error);
      } else {
        addTheBooks(user.email);
        response.send(user);
      }
    }
  );
});



//////////////////////////////////////////////////////////

app.get('/books', (request, response) => {
  response.json(Books);
})
mongoose.connect(
  process.env.MONGO_DB_CONNECTION_STRING,
  {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
   (error) => {if (error) throw error});
  
const addTheBooks = async (email) => {
  const myBooks = require('./sampleData/myBooks.json');
   let books = new Books({ email:  email, books: myBooks,})
   books.save()
    .then((result) => {
      // console.log(result)   
    })
    .catch((error) => console.log(error + ' error while saving to database'));
  }
  
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
