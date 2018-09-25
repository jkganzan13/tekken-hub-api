const serverless = require('serverless-http');
const express = require('express');
const applyMiddleware = require('./middleware');
const combos = require('./combos');
const ratings = require('./ratings');

const app = express();

// Middleware
applyMiddleware(app);

// Routes
combos(app);
ratings(app);

module.exports = serverless(app);