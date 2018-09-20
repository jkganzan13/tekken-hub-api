const moment = require('moment');
const query = require('../common/sqlService');

const TABLE_NAME = 'combos';

const buildGetCombosQuery = (queryParams) => {
  const q = query(TABLE_NAME).select();
  if (queryParams) {
    if(queryParams.combo) q.where('combo', 'like', `%${queryParams.combo}%`);
    if(queryParams.damage) q.where('damage', queryParams.damage);
    if(queryParams.name) q.whereIn('name', queryParams.name.split(','));
  }
  return q.orderBy('created_at', 'desc');
};

const getSqlDateTime = (date = Date.now()) =>
  moment(date).format('YYYY-MM-DD HH:mm:ss');

const buildPostCombosQuery = combo => {
  const toInsert = Object.assign({}, combo, {
    created_at: getSqlDateTime()
  });
  return query(TABLE_NAME).insert(toInsert);
};

const buildPutCombosQuery = (id, toUpdate) =>
  query(TABLE_NAME)
    .where('combo_id', id)
    .update(toUpdate);

module.exports = {
  buildGetCombosQuery,
  buildPostCombosQuery,
  buildPutCombosQuery,
  getSqlDateTime,
};
