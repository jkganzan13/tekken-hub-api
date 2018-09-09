const functions = require('firebase-functions');
const cors = require("cors");
const express = require("express");
const moves = require('./api/moves').fetchFrameData;

const app = express();
const routes = express.Router();

// Routes
routes.get('/moves', moves)

app.use(cors({ origin: true }));
app.use('/api', routes);
exports.api = functions.https.onRequest(app);
