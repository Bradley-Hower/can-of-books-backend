'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONN);

const Book = require('./Model/book');

async function seed(){
  const myBook = new Book({
    name: 'Fahrenheit 451'
  });

  await myBook.save()
    .then(() => console.log('Saved Fahrenheit 451 to database'))
    .catch(err => console.error(err));

  await Book.create({
    name: 'The Great Gatsby'
  });

  mongoose.disconnect();
}

seed();
