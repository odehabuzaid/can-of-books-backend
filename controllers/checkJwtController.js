'use strict';
const JsonWebToken = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const getConfig = require('../configs/allConfigs');
const configs = getConfig();

const {addTheBooks} = require('./dataControllers')

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
    };

module.exports = {checkJwtController,configs};
