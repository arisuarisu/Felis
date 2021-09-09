const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getOwners() {
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      'SELECT id, nickname, max_amount_of_cats, img, room FROM owner', []
    );
    const data = helper.emptyOrRows(rows);
    //console.log(data)
    // if(rows.length === 0){
    //   return null;
    // }else{
    //   //console.log("vypisujem rolu")
    //   return points[0].price;
    // }
    return data
  }

  async function getFreePlacesCount(id_owner) {
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
    //  'SELECT (SELECT max_amount_of_cats from owner WHERE id = $1) - (SELECT COUNT(*) from stay_owner INNER JOIN stay on stay_owner.id_stay = stay.id WHERE end_date is null and id_owner = $2) AS free_places', [id_owner, id_owner]
    'SELECT max_amount_of_cats from owner WHERE id=$1', [id_owner]
    );
    const data = helper.emptyOrRows(rows);
    //console.log(data)
    // if(rows.length === 0){
    //   return null;
    // }else{
    //   //console.log("vypisujem rolu")
    //   return points[0].price;
    // }
    return {data}
  }

  async function getFreeOwners() {
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      'SELECT id, nickname, max_amount_of_cats FROM owner WHERE max_amount_of_cats > 0', []
    );
    const data = helper.emptyOrRows(rows);
    //console.log(data)
    // if(rows.length === 0){
    //   return null;
    // }else{
    //   //console.log("vypisujem rolu")
    //   return points[0].price;
    // }
    return data
  }

  // async function getMyCats() {
  //   //const offset = helper.getOffset(page, config.listPerPage);
  //   const rows = await db.query(
  //     'SELECT id, nickname, max_amount_of_cats FROM owner', []
  //   );
  //   const data = helper.emptyOrRows(rows);
  //   console.log(data)
  //   // if(rows.length === 0){
  //   //   return null;
  //   // }else{
  //   //   //console.log("vypisujem rolu")
  //   //   return points[0].price;
  //   // }
  //   return {data}
  // }

  // async function setOwnerstay(id_cat, id_owner) {
  //   //const offset = helper.getOffset(page, config.listPerPage);
  //   const rows = await db.query(
  //     'INSERT INTO owner_stay (id_cat, id_owner) VALUES ($1, $2)', [id_cat, id_owner]
  //   );
  //   const data = helper.emptyOrRows(rows);
  //   console.log(data)
  //   // if(rows.length === 0){
  //   //   return null;
  //   // }else{
  //   //   //console.log("vypisujem rolu")
  //   //   return points[0].price;
  //   // }
  //   return {data}
  // }

  module.exports = {
    getOwners,
    getFreePlacesCount,
    getFreeOwners
  }