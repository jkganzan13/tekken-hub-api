const functions = require('firebase-functions');
const cors = require("cors");
const express = require("express");
const routes = require('./routes');

const app = express();

app.use(cors());
// Firebase rewrite: https://myapp.firebaseapp.com/api/{routes}
app.use('/api', routes);

exports.api = functions.https.onRequest(app);
