const dynamoose = require('dynamoose');
const getSchema = require('./schema');

const schema = getSchema();
const getModel = () => dynamoose.model(process.env.COMBOS_TABLE, schema);

module.exports.get = async (req, res) => {
  const Combo = getModel();
  const response = await Combo.scan().all().exec();
  res.json(response);
};

module.exports.post = async (req, res) => {
  const Combo = getModel();
  const combo = new Combo(req.body);
  const response = await combo.save();
  res.json(response);
};

module.exports.put = async (req, res) => {
  const Combo = getModel();
  const combo = new Combo(req.body);
  const response = await combo.put();
  res.json(response);
};