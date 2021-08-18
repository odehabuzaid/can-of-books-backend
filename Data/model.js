const mongoose = require('mongoose');
const aBook = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});
const aUser = new mongoose.Schema({
  email: String,
  books: [aBook],
});
const Books = mongoose.model('books', aUser);

module.exports = Books;
