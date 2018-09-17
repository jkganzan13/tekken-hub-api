const serverless = require('serverless-http');
const express = require('express');
const dynamoose = require('dynamoose');
const bodyParser = require('body-parser');
const combos = require('./combos');

// Dynamoose config


const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.send('hello'));
app.get('/combos', combos.get); //query params
app.post('/combos', combos.post);
app.put('/combos', combos.put);

module.exports.handler = serverless(app);
