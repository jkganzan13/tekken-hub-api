const serverless = require('serverless-http');
const express = require('express');
const dynamoose = require('dynamoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const combos = require('./combos');
const ratings = require('./ratings');

// TODO: replace user IDs with decoded jwt

// Dynamoose config
dynamoose.AWS.config.update({
  region: 'us-west-2',
});

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
combos(app);
ratings(app);

module.exports.handler = serverless(app);
