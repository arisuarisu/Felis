const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getShelters() {
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        'SELECT id, name, max_amount_of_cats, img FROM shelter',[]
    );
    const data = helper.emptyOrRows(rows);
    // if(rows.length === 0){
    //   return null;
    // }else{
    //   //console.log("vypisujem rolu")
    //   return points[0].price;
    // }
    console.log(data, " shelters services")
    return data
  }

  async function setShelterstay(id_cat, id_shelter) {
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      'INSERT INTO shelter_stay (id_cat, id_shelter) VALUES ($1, $2)', [id_cat, id_shelter]
    );
    const data = helper.emptyOrRows(rows);
    console.log(data)
    // if(rows.length === 0){
    //   return null;
    // }else{
    //   //console.log("vypisujem rolu")
    //   return points[0].price;
    // }
    return {data}
  }

  module.exports = {
    getShelters,
    setShelterstay
}