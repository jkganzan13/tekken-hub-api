const functions = require('firebase-functions');
const cors = require("cors");
const express = require("express");
const routes = require('./routes');
const webscraper = require('./web-scraper');

const app = express();

app.use(cors());
// Firebase rewrite: https://myapp.firebaseapp.com/api/{routes}
app.use('/api', routes);

exports.api = functions.https.onRequest(app);
exports.webscraper = functions.https.onRequest((req, res) => webscraper().then(r => res.send(r)));
