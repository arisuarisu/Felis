const db = require('./db');
const helper = require('../helper');

async function getShelters() {
    const rows = await db.query(
        'SELECT id, name, max_amount_of_cats, img FROM shelter',[]
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  async function setShelterstay(id_cat, id_shelter) {
    const rows = await db.query(
      'INSERT INTO shelter_stay (id_cat, id_shelter) VALUES ($1, $2)', [id_cat, id_shelter]
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  module.exports = {
    getShelters,
    setShelterstay
}