'use strict';
const mongoose=require('mongoose');

const aBook = new mongoose.Schema({
      Book_Title: String,
      Book_DESC: String,
      Status: String,
    });
    
    const aUser = new mongoose.Schema({
      email:  String,
      books: [aBook]
    });

const Books = mongoose.model('books', aUser)
module.exports = Books;