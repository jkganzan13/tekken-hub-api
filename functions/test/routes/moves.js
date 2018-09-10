const chai = require('chai');
const movelist = require('../../data/characters.json');
const api = require('../../').api;

describe('/moves', () => {
  describe ('GET', () => {
    it('should return movelist from data.json', (done) => {
      chai.request(api)
        .get('/api/moves')
        .end((err, res) => {
          if(err) done(err);
          expect(res.body).to.eql(movelist);
          done();
        });
    });
  });
});
