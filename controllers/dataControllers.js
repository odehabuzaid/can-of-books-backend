'use strict';
let MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const Books = require('../data/Books');

const getConfig = require('../configs/allConfigs');
const configs = getConfig();

// const addTheBooks = async (email) => {
//       const myBooks = require('./sampleData/myBooks.json');
//       let books = new Books({ email: email, books: myBooks });
//       books
//         .save()
//         .catch((error) => console.log(error + ' error while saving to database'));
//     };
    
function addTheBooks(email) {
  const myBooks = require('../sampleData/myBooks.json');
  let books = new Books({ email: email, books: myBooks });
  mongoose.connect(
    configs.AtlasDataBaseConnection,
    configs.ConnectionParameters,
    (error, db) => {
      if (error) handleError(`${error} error while connecting to database`)
      books
        .save()
        .catch((error) =>
        handleError(error + ' error while saving to database')
        );
}
  );
}


function getBooksController(request, response) {
     
    }
    


function handleError(error) {
      console.clear();
      console.log(error);
    }

 

module.exports = { getBooksController, addTheBooks };
