const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// async function getMultiple(page = 1) {
//   const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     'SELECT nickname, email, points FROM owner OFFSET $1 LIMIT $2', 
//     [offset, config.listPerPage]
//   );
//   const data = helper.emptyOrRows(rows);
//   const meta = {page};

//   return {
//     data,
//     meta
//   }
// }

// async function getMyCats(page = 1, owner_id) {
//   //const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     'SELECT nickname FROM cat LEFT JOIN owner_stay ON cat.id = owner_stay.id_cat WHERE id_owner = $1', 
//     [owner_id, offset, config.listPerPage]
//   );
//   const data = helper.emptyOrRows(rows);

//   return {data}
// }

async function getMyPoints(id, type) { //DOPLNIT VSADE FOTKY
  const rows = await db.query(
    'SELECT points FROM $1 WHERE id = $2', 
    [type, id]
  );
  const data = helper.emptyOrRows(rows);

  return {data}
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
  //const data = helper.emptyOrRows(rows);

  return rows
}

// async function create(id, user, type) {
//   if (type==="owner"){
//     const result = await db.query(
//       'INSERT INTO owner(id, nickname, max_amount_of_cats, points) VALUES ($1, $2, $3, 2, 1000) RETURNING *',
//       [id, user.nickname, 2, 2000]
//     );
//   }else if(type==="cat"){
//     const result = await db.query(
//       'INSERT INTO cat(id, nickname, points) VALUES ($1, $2, $3, 2, 1000) RETURNING *',
//       [id, user.nickname, 2000]
//     );
//   }
//     let message = 'Error in creating owner';
  
//     if (result.length) {
//       message = 'Owner created successfully';
//     }
  
//     return {message};
//   }

module.exports = {
  //getMyCats,
  
  getMyInfo,
  getMyPoints
}