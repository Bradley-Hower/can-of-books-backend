'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONN);

const Book = require('./Model/book');

async function seed(){
  const myBook = new Book({
    title: 'Fahrenheit 451',
    description: 'Read and then burn.',
    status: 'Available'
  });

  await myBook.save()
    .then(() => console.log('Saved Fahrenheit 451 to database'))
    .catch(err => console.error(err));

  await Book.create({
    title: 'The Great Gatsby',
    description: 'A tale of the roaring 20\'s.',
    status: 'Available'
  });

  await Book.create({
    title: 'The Romans - From Village to Empire',
    description: 'A history of Rome from start to end.',
    status: 'Available'
  });

  mongoose.disconnect();
}

seed();
