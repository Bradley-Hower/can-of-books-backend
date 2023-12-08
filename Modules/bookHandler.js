'use strict';

const Book = require('../Model/book');

const bookHandler = {};

bookHandler.getBooks = function(req, res, next){
  let queryObject = {email: req.user.email};

  Book.find(queryObject)
    .then(data => res.status(200).send(data))
    .catch(err => next(err));
};

bookHandler.postBook = function(req, res, next){
  Book.create({...req.body, email: req.user.email})
    .then(createdBook => res.status(201).send(createdBook))
    .catch(err => next(err));
};

bookHandler.updateBook = function(req, res, next){
  const {id} = req.params;
  const data = req.body;
  // new - returns update docs instead of old doc
  // overwrite - overwrites doc completely avoiding unwanted side-effects
  Book.findByIdAndUpdate(id, data, {new: true, overwrite: true})
    .then(updatedBook => res.status(202).send(updatedBook))
    .catch(err => next(err));
};

bookHandler.deleteBook = function(req, res, next){
  const {id} = req.params;

  Book.findByIdAndDelete(id)
    .then(deletedBook => res.status(202).send(deletedBook))
    .catch(err => next(err));
};


module.exports = bookHandler;
