const combo = {
  id: 'id123',
  submittedBy: 'user123',
  combo: 'd/f+2, 3,1,4, d/f+1,2 S! HS',
  damage: 60,
  character: 'Kazuya',
  numRatings: 1,
  ratings: [{
    userId: 'user999',
    upvote: true,
  }]
};

const makeEvent = event => Object.assign({}, {
  resource: '/combos',
  path: '/combos',
  httpMethod: 'GET',
  headers: {
    'content-type': 'application/json'
  },
  queryStringParameters: null,
  pathParameters: null,
  stageVariables: {
    stageName: 'dev'
  },
  requestContext: {
    path: '/combos',
    resourcePath: '/combos',
  },
  body: null
}, event);

describe('/combos/:userId', () => {
  let envs;
  before(() => {
    envs = {
      COMBOS_TABLE: 'Combos-dev'
    }
  });

  describe('GET', () => {
    it('should return something', (done) => {
      const event = makeEvent();
      executeLambda(event, envs)
        .then((res) => {
          const body = JSON.parse(res.body);
          console.log(body)
          expect(Array.isArray(body)).to.be.true;
          done();
        }).catch(done);
    });
  });

  describe('POST', () => {
    it('should return something', (done) => {
      const event = makeEvent({
        httpMethod: 'POST',
        body: JSON.stringify(combo),
      });
      executeLambda(event, envs)
        .then((res) => {
          const body = JSON.parse(res.body);
          expect(body).to.eql(combo);
          done();
        }).catch(done);
    });
  });

  describe('PUT', () => {
    it('should return something', (done) => {
      const c = Object.assign({}, combo, { ratings: [] })
      const event = makeEvent({
        httpMethod: 'PUT',
        body: JSON.stringify(c),
      });
      executeLambda(event, envs)
        .then((res) => {
          const body = JSON.parse(res.body);
          console.log(body)
          expect(body).to.eql(c);
          done();
        }).catch(done);
    });
  });
});
