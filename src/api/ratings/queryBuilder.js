const query = require('../common/query');
const {
  COMBOS_TABLE,
  RATINGS_TABLE,
} = require('../common/constants');

const buildDeleteQuery = (id, userId) =>
  query(RATINGS_TABLE)
    .where('combo_id', id)
    .andWhere('rated_by', userId)
    .del();

const buildGetQuery = () => query(RATINGS_TABLE).select();

const buildPostQuery = rating => query(RATINGS_TABLE).insert(rating);

module.exports = {
  buildDeleteQuery,
  buildGetQuery,
  buildPostQuery,
};