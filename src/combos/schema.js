const dynamoose = require('dynamoose');

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
