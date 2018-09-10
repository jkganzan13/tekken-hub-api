const data = require('../../data/characters.json');

const fetchFrameData = (req, res) => res.json(data);

exports.get = fetchFrameData;
