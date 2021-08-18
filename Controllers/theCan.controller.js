'use strict';
const jwksClient = require('jwks-rsa');
const JsonWebToken = require('jsonwebtoken');
const Schema = require('../Data/model');

function checkJwt(token, callback) {
  JsonWebToken.verify(
    token,
    getKey,
    {},
    (err, user) => {
      if (err) {
        handleError(err);
        return callback(err);
      }
      handleError(err);
      callback(user);
    }
  );
}

function getKey(headers, callback) {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  client.getSigningKey(headers.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

async function getBooks(request, response) {
  try {
    const token = request.headers.authorization.split(' ')[1];
    checkJwt(token, getTheBooks);

    async function getTheBooks(user) {
      const email = user.email;
      await Schema.find({ email }, (error, theCan) => {
        if (error) {
          handleError(error);
        }
        if (!theCan.length > 0) {
          theCan[0] = { email, books: [] };
          const verifiedUser = new Schema(theCan[0]);
          verifiedUser.save();
        }
        response.send(theCan[0].books);
      });
    }
  } catch (error) {
    handleError(error);
  }
}

async function addBook(request, response) {
  try {
    const token = request.headers.authorization.split(' ')[1];
    console.log(token);
    checkJwt(token, addTheBook);
    async function addTheBook(user) {
      const email = user.email;
      const { title, description, status } = request.query;
      await Schema.find({ email }, (error, user) => {
        if (error) {
          handleError(error);
        }
        user[0].books.push({
          title: title,
          description: description,
          status: status,
        });
        user[0].save();
        response.send(user[0].books);
      });
    }
  } catch (error) {
    handleError(error);
  }
}

async function deleteBook(request, response) {
  try {
    const token = request.headers.authorization.split(' ')[1];
    checkJwt(token, deleteTheBook);
    async function deleteTheBook(user) {
      const id = request.params.id;
      const email = user.email;
      console.log(id)
      await Schema.findOne({ email }, (error, theCan) => {
        if (error)  {
          handleError(error);
        }
        theCan.books.splice(id, 1)
        theCan.save();
        response.send(theCan.books);
      });
    }
  } catch (error) {handleError(error)}
}

function handleError(error) {
  console.clear();
  console.log(error);
}

module.exports = { getBooks, addBook, deleteBook };
