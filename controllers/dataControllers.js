'use strict';
let MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const Books = require('../data/Books');

const getConfig = require('../configs/allConfigs');
const configs = getConfig();

function addTheBooks(email) {
    const myBooks = require('../sampleData/myBooks.json');
    let books = new Books({ email: email, books: myBooks });
    mongoose.connect(
        configs.AtlasDataBaseConnection,
        configs.ConnectionParameters,
        (error) => {
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
    MongoClient.connect(configs.AtlasDB, configs.ConnectionParameters, (error, db) => {
        if (error) handleError(error);
        let dbo = db.db('amman-301d28');
        let query = { email: request.params.email };
        dbo
            .collection('books')
            .find(query)
            .toArray((error, result) => {
                if (error) handleError(error);
                response.json(result[0]);
            });
    });
}
function handleError(error) {
    console.clear();
    console.log(error);
}



module.exports = { getBooksController, addTheBooks };