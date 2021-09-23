const db = require('./db');
const helper = require('../helper');

async function getCats() {
    const rows = await db.query(
      'SELECT id, nickname, race, gender, img FROM cat ORDER BY nickname', []
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  async function getCatsByName(name, id) {
    const rows = await db.query(
      'SELECT id, nickname, race, gender, img FROM cat WHERE nickname ~ $1 AND id NOT IN ($2) AND id NOT IN(SELECT id_cat2 FROM catfriends WHERE id_cat1=$2) AND id NOT IN(SELECT id_cat1 FROM catfriends WHERE id_cat2=$2) ORDER BY nickname', [name, id]
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  async function requestCatfriendship(id, catfriend_id) {
    let rows = null
    if(/0{35}\d{1}/.test(catfriend_id)){
      rows = await db.query(
        'INSERT INTO catfriends (id_cat1, id_cat2, state) VALUES ($1, $2, $3)', [id, catfriend_id, 'a']
      );
    }else{
      rows = await db.query(
        'INSERT INTO catfriends (id_cat1, id_cat2, state) VALUES ($1, $2, $3)', [id, catfriend_id, 'p']
    );
    }
    const data = helper.emptyOrRows(rows);
    return data
  }

  async function approveCatfriendship(id, catfriend_id) {
    const rows = await db.query(
      'UPDATE catfriends SET state=$1 WHERE id_cat2=$2 AND id_cat1=$3 RETURNING *', ['a', id, catfriend_id]
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  async function cancelCatfriendship(id, catfriend_id) {
    const rows = await db.query(
      'DELETE FROM catfriends WHERE (id_cat1=$1 AND id_cat2=$2) OR (id_cat2=$1 AND id_cat1=$2)', [id, catfriend_id]
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  async function getMyCatfriends(id) {
    const rows = await db.query(
      'SELECT id, nickname, race, gender, img FROM cat WHERE id IN(SELECT id_cat2 FROM catfriends WHERE id_cat1=$1 AND state=$2) OR id IN(SELECT id_cat1 FROM catfriends WHERE id_cat2=$1 AND state=$2) ORDER BY nickname', [id, 'a']
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  async function getMyRequestedCatfriends(id) {
    const rows = await db.query(
      'SELECT id, nickname, race, gender, img FROM cat WHERE id IN (SELECT id_cat1 FROM catfriends WHERE id_cat2=$1 AND state=$2) ORDER BY nickname', [id, 'p']
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  module.exports = {
    getCats,
    getCatsByName,
    requestCatfriendship,
    approveCatfriendship,
    cancelCatfriendship,
    getMyCatfriends,
    getMyRequestedCatfriends
  }