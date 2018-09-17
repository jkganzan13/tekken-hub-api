const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  region: 'us-west-2',
});

module.exports = () => new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  submittedBy: {
    type: String,
    rangeKey: true,
  },
  combo: String,
  damage: Number,
  character: String,
  numRatings: Number,
  ratings: {
    type: 'list',
    list: [{
      userId: String,
      upvote: Boolean,
    }]
  },
}, {
  useDocumentTypes: true,
  useNativeBooleans: true,
});
