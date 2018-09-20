const serverless = require('serverless-http');
const express = require('express');
const dynamoose = require('dynamoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const combos = require('./combos');

// Dynamoose config
dynamoose.AWS.config.update({
  region: 'us-west-2',
});

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('hello'));
app.get('/combos', combos.get);
app.post('/combos', combos.post);
app.put('/combos/:id', combos.put);

module.exports.handler = serverless(app);
