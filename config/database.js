'use strict';

const mongoose = require('mongoose');
const config = require('./env');

mongoose
    .connect(config.db, { useNewUrlParser: true })
    .then(connection => console.log('Successfully connected to MongoDB!'))
    .catch(error => console.error('MongoDB connection error:', error));

if (config.env === 'development') {
    mongoose.set('debug', true);
}

module.exports = mongoose;