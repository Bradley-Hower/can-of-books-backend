'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookHandler = require('./Modules/bookHandler');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// Establish connection with Atlas MongoDB
mongoose.connect(process.env.MONGODB_CONN);

// Assign the conncetion to a variable for ease of use
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error'));
db.once('open', () => console.log('Database is connected'));

app.get(('/', (req, res, next) => res.status(200).send('Default route working')));

app.get('/books', bookHandler.getBooks);
app.post('/books', bookHandler.postBook);
app.put('/books/:id', bookHandler.updateBook);
app.delete('/books/:id', bookHandler.deleteBook);

app.get(('*', (req, res, next) => res.status(404).send('Resource not found')));

app.listen(PORT, () => console.log(`Listing on port ${PORT}`));
