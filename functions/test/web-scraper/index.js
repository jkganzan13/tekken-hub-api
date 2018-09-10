const webscraper = require('../../web-scraper');

describe.skip('web-scraper', () => {
  it('should be successful', async () => {
    const response = await webscraper();
    console.log(response)
    expect(response).to.be.ok;
  });
});