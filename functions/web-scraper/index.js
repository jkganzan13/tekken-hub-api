const rp = require('request-promise');
const cheerio = require('cheerio');

/**
 * TODO
 * - Scrape all characters *CHECK URL*
 * - Save to json
 * - Upload to firebase storage
 * - On build, download json to data/characters.json
 * - (optional) Cron job for webscraper every 24hrs
 */

const characters = [
  'akuma',
  'alisa',
  'asuka',
  'bob',
  'devil-jin',
  'dragunov',
  'eddy',
  'eliza',
  'feng',
  'gigas',
  'heihachi',
  'hwoarang',
  'jack-7',
  'jin',
  'josie',
  'katarina',
  'kazumi',
  'kazuya',
  'king',
  'kuma',
  'lars',
  'law',
  'lee',
  'leo',
  'lili',
  'lucky-chloe',
  'master-raven',
  'miguel',
  'nina',
  'noctis',
  'paul',
  'shaheen',
  'steve',
  'ling',
  'yoshimitsu',
];

const getOptions = name => ({
  uri: `http://rbnorway.org/${name}-t7-frames/`,
  transform: body => cheerio.load(body),
});

const scrapeByName = name =>
  rp(getOptions(name))
    .then($ => {
      const table = $('table').first();
      const tbody = table.find('tbody');
      const rows = tbody.children('tr:not(:first-child)');
      const moves = rows.map((i, el) => {
        const td = $(el).children('td');
        return {
          notation: td.eq(0).text(),
          hit_level: td.eq(1).text(),
          damage: td.eq(2).text(),
          speed: td.eq(3).text(),
          on_block: td.eq(4).text(),
          on_hit: td.eq(5).text(),
          on_ch: td.eq(6).text(),
          notes: td.eq(7).text(),
        };
      });
      return moves;
    });

const webscraper = () => {
  const promises = characters.map(scrapeByName);
  return Promise.all(promises)
    .catch(e => console.log(e))
};

module.exports = webscraper;