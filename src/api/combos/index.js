const {
  buildDeleteQuery,
  buildGetCombosQuery,
  buildPostCombosQuery,
  buildPutCombosQuery,
} = require('./queryBuilder');

const get = async (req, res) => {
  const userId = req.user.sub;
  const q = await buildGetCombosQuery(req.query, userId);
  res.json(q);
};

const post = async (req, res) => {
  const newCombo = Object.assign({}, req.body, {
    submitted_by: req.user.sub
  });
  const response = await buildPostCombosQuery(newCombo);
  res.json(response);
};

const put = async (req, res) => {
  const response = await buildPutCombosQuery(req.params.id, req.body);
  res.json(response);
};

const del = async (req, res) => {
  const userId = req.user.sub;
  const response = await buildDeleteQuery(req.params.id, userId);
  // if response = 1, success
  // if 0, 404 Not Found
  res.json(response);
};

module.exports = (app) => {
  app.get('/combos', get);
  app.post('/combos', post);
  app.delete('/combos/:id', del);
  app.put('/combos/:id', put);
};
