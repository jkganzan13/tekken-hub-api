const express = require("express");
const moves = require('./moves');

const routes = express.Router();

/** API Routes */
routes.get('/moves', moves.get);

module.exports = routes;
