const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// Global test variables
global.expect = chai.expect;
