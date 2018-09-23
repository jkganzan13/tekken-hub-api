const {
  buildDeleteQuery,
  buildGetCombosQuery,
  buildPostCombosQuery,
  buildPutCombosQuery,
} = require('./queryBuilder');

const get = async (req, res) => {
  const userId = 'user1';
  const q = await buildGetCombosQuery(req.query, userId);
  res.json(q);
};

const post = async (req, res) => {
  const response = await buildPostCombosQuery(req.body);
  res.json(response);
};

const put = async (req, res) => {
  const response = await buildPutCombosQuery(req.params.id, req.body);
  res.json(response);
};

const del = async (req, res) => {
  const userId = 'user1';
  const response = await buildDeleteQuery(req.params.id, userId);
  res.json(response);
};

module.exports = (app) => {
  app.get('/combos', get);
  app.post('/combos', post);
  app.delete('/combos/:id', del);
  app.put('/combos/:id', put);
};
