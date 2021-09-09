const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getRole(id) {
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT role FROM role WHERE user_id = $1', 
    [id]
  );
  //const data = helper.emptyOrRows(rows);
  //const meta = {page};
    //console.log(rows)
    //console.log("vypis role z db v getrole")
    //console.log(rows[0].role)
  //return {
   // data
  //}
  if(rows.length === 0){
    return "";
  }else{
    console.log("vypisujem rolu")
    return rows[0].role;
  }
}

async function setRole(id, role) {
    //const data = await getRole(id);
    //const rows = await getRole(id);
    //console.log(rows)
    //console.log("role in setrole")
    //if(rows===""){
      const result = await db.query(
        'INSERT INTO role(user_id, role) VALUES ($1, $2) RETURNING *',
        [id, role]
     );
      let message = 'Error in creating role';
        
      if (result.length) {
        message = 'Role created successfully';
      }
  
      return {message};
    //}
  }

  async function addCat(id, nickname, race, gender, img) {
      const result = await db.query(
        'INSERT INTO cat(id, nickname, race, gender, points, img) VALUES ($1, $2, $3, $4, 2000, $5) RETURNING *',
        [id, nickname, race, gender, img]
     );
      let message = 'Error in creating cat';
        
      if (result.length) {
        message = 'Cat created successfully';
      }
      return {message};
    //}
  }

  async function addOwner(id, nickname, occupation, img, room) {
      const result = await db.query(
        'INSERT INTO owner(id, nickname, max_amount_of_cats, points, occupation, img, room) VALUES ($1, $2, 2, 2000, $3, $4, $5) RETURNING *',
        [id, nickname, occupation, img, room]
     );
      let message = 'Error in creating owner';
        
      if (result.length) {
        message = 'Owner created successfully';
      }
      return {message};
    //}
  }

module.exports = {
  getRole,
  setRole,
  addCat,
  addOwner
}