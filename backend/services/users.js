const db = require('./db');
const helper = require('../helper');

async function getMyPoints(id, type) { 
  const rows = await db.query(
    'SELECT points FROM $1 WHERE id = $2', 
    [type, id]
  );
  const data = helper.emptyOrRows(rows);
  return data
}

async function getMyInfo(id, type) {
  let rows=null
  if(type==='owner'){
  rows = await db.query(
    'SELECT nickname, points, level, occupation, max_amount_of_cats, img, room FROM owner WHERE id = $1', 
    [id]
  );
  }
  else if(type==='cat'){
    rows = await db.query(
      'SELECT nickname, gender, race, points, level, mother_id, father_id, img FROM cat WHERE id = $1', 
      [id]
    );
  }
  return rows
}

module.exports = {
  getMyInfo,
  getMyPoints
}