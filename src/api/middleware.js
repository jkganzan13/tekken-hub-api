const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const decodeToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  req.user = token ? jwt.decode(token) : {};
  next();
};

// Middleware
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(decodeToken);
};
