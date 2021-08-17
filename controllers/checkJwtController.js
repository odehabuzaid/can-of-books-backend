'use strict';
const JsonWebToken = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const getConfig = require('../configs/allConfigs');
const configs = getConfig();

function checkJwtController(request, response) {
    let auth = request.headers.authorization.split(' ')[1];
    JsonWebToken.verify(auth, getKey, {}, (error, user) => {
        if (error) {
            response.send(error);
        } else {
            response.send(user);
            addTheBooks(user.email);
        }
    });
}

function getKey (header, callback){
    const client = jwksClient({
        jwksUri: `https://${configs.authinticationDomain}/.well-known/jwks.json`,
    });
    client.getSigningKey(header.kid, function (err, key) {
        const signInKey = key.publicKey || key.rsaPublicKey;
        callback(null, signInKey);
    });
}

const Books = require('../data/Books');
function addTheBooks(email) {
    const mongoose=require('mongoose');
    const myBooks = require('../sampleData/myBooks.json');
    let thebooks = new Books({ email: email, books: myBooks });
    mongoose.connect(
        configs.AtlasDataBaseConnection,
        configs.ConnectionParameters,
        (error) => {
            if (error) handleError(`${error} error while connecting to database`)
            thebooks
                .save()
                .catch((error) =>
                    handleError(error + ' error while saving to database')
                );
        }
    );
  }


module.exports = {checkJwtController};
