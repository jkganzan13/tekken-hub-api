const data = require('./data.json');

const fetchFrameData = (req, res) => res.json(data);

exports.fetchFrameData = fetchFrameData;
