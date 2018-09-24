const {
  buildDeleteQuery,
  buildGetQuery,
  buildPostQuery,
} = require('./queryBuilder');

const del = async (req, res) => {
  const userId = 'user1';
  const response = await buildDeleteQuery(req.params.id, userId);
  res.json(response);
};

const get = async (req, res) => {
  const response = await buildGetQuery();
  res.json(response);
};

const post = async (req, res) => {
  const payload = Object.assign({}, req.body, {
    rated_by: 'user1',
    rating: 1,
  });
  const response = await buildPostQuery(payload);
  res.json(response);
};

module.exports = (app) => {
  app.get('/ratings', get);
  app.delete('/ratings/:id', del);
  app.post('/ratings', post);
};
