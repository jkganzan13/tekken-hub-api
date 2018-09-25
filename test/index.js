const chai = require('chai');
const lambdaLocal = require('lambda-local');

 // Global test variables
global.expect = chai.expect;

global.executeLambda = (event, environment, lambdaHandler) =>
  lambdaLocal.execute({
    event,
    lambdaPath: 'src/index',
    lambdaHandler,
    profileName: 'default',
    environment,
    timeoutMs: 30000
  });