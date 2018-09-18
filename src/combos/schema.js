const dynamoose = require('dynamoose');
const uuidv4 = require('uuid').v4;

module.exports = () => new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuidv4,
  },
  submittedBy: {
    type: String,
    rangeKey: true,
  },
  combo: String,
  damage: Number,
  name: String,
  numRatings: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: 'list',
    list: [{
      userId: String,
      upvote: Boolean,
    }]
  },
  createdAt: Date,
}, {
  useDocumentTypes: true,
  useNativeBooleans: true,
  timestamps: true,
});
