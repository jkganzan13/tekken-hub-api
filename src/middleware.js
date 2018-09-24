const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.JWKS_URI
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256']
});

const authErrorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).json({
      status: err.status,
      message: err.message
    });
  }
};

// Middleware
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(jwtCheck);
  app.use(authErrorHandler);
};
