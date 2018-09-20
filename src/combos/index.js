const {
  buildGetCombosQuery,
  buildPostCombosQuery,
  buildPutCombosQuery,
} = require('./util');

module.exports.get = async (req, res) => {
  const q = await buildGetCombosQuery(req.query);
  res.json(q);
};

module.exports.post = async (req, res) => {
  const response = await buildPostCombosQuery(req.body);
  res.json(response);
};

module.exports.put = async (req, res) => {
  const response = await buildPutCombosQuery(req.params.id, req.body);
  res.json(response);
};