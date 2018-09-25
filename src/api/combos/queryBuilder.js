const query = require('../common/query');
const {
  COMBOS_TABLE,
  RATINGS_TABLE,
} = require('../common/constants');

const buildGetCombosQuery = (queryParams, userId) => {
  const select = query.raw(`
    c.combo_id as id,
    c.submitted_by,
    c.combo,
    c.damage,
    c.name,
    c.created_at,
    count(r.rated_by) as total_ratings,
    IF (SUM(r.rated_by = '${userId}'), TRUE, FALSE) as is_rated_by_user
  `);

  const q = query(`${COMBOS_TABLE} as c`)
              .select(select)
              .leftJoin(`${RATINGS_TABLE} as r`, `c.combo_id`, `r.combo_id`)
              .groupBy(`c.combo_id`);

  if (queryParams) {
    if(queryParams.combo) q.where('c.combo', 'like', `%${queryParams.combo}%`);
    if(queryParams.damage) q.where('c.damage', queryParams.damage);
    if(queryParams.name) q.whereIn('c.name', queryParams.name.split(','));
  }

  return q.orderBy('created_at', 'desc');
};

const buildPostCombosQuery = combo => query(COMBOS_TABLE).insert(combo);

const buildPutCombosQuery = (id, toUpdate) =>
  query(COMBOS_TABLE)
    .where('combo_id', id)
    .update(toUpdate);

const buildDeleteQuery = (id, userId) =>
  query(COMBOS_TABLE)
    .where('combo_id', id)
    .andWhere('submitted_by', userId)
    .del();

module.exports = {
  buildDeleteQuery,
  buildGetCombosQuery,
  buildPostCombosQuery,
  buildPutCombosQuery,
};
