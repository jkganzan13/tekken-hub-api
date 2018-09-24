const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const decodeToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  req.user = jwt.decode(token);
  next();
};

// Middleware
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(decodeToken);
};
