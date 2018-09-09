const functions = require('firebase-functions');
const cors = require("cors");
const express = require("express");
const moves = require('./routes/moves').fetchFrameData;

const app = express();
const routes = express.Router();

// Main Routes
routes.get('/moves', moves)

app.use(cors());
// Firebase rewrite: https://myapp.firebaseapp.com/api/{routes}
app.use('/api', routes);

exports.api = functions.https.onRequest(app);
