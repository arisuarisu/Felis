const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getItems(type) {
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      'SELECT name, description, pieces, price, img FROM shop WHERE type = $1', 
      [type]
    );
    const data = helper.emptyOrRows(rows);
    // if(rows.length === 0){
    //   return null;
    // }else{
    //   //console.log("vypisujem rolu")
    //   return points[0].price;
    // }
    return data
  }

  async function getMyItems(id, type) {
    //const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      'SELECT shop.name, description, pieces, price, img FROM shop INNER JOIN ownership ON shop.name=ownership.name WHERE user_id = $1 AND ownership.type=$2', 
      [id, type]
    );
    const data = helper.emptyOrRows(rows);
    // if(rows.length === 0){
    //   return null;
    // }else{
    //   //console.log("vypisujem rolu")
    //   return points[0].price;
    // }
    return data
  }

async function decPiecesGetPrice(name){
  console.log("dec pieces in shop")
  const rows = await db.query(
    'UPDATE shop SET pieces=pieces-1 WHERE name=$1 AND pieces>0 RETURNING price', 
    [name]
  );
  const data = helper.emptyOrRows(rows);
  return data
}

async function incPieces(name){
  console.log("inc item pieces")
  const rows = await db.query(
    'UPDATE shop SET pieces=pieces+1 WHERE name=$1 RETURNING *', 
    [name]
  );
  const data = helper.emptyOrRows(rows);
  return data
}

async function decCatPoints(cat_id, price){
  console.log("dec cat points")
  const rows = await db.query(
    'UPDATE cat SET points=points-$1 WHERE points-$1>-1 AND id=$2 RETURNING *', 
    [price, cat_id]
  );
  const data = helper.emptyOrRows(rows);
  return data
}

async function newOwnership(user_id, name, type){
  console.log("beg of inserting into db", user_id, name, type)
  const rows = await db.query(
    'INSERT INTO ownership(user_id, name, type) VALUES ($1, $2, $3) RETURNING *', 
    [user_id, name, type]
  );
  console.log("after inserting data", rows)
  const data = helper.emptyOrRows(rows);
  return data
}

async function buyItem(user_id, name, type){
  let price = await decPiecesGetPrice(name);
  if(price){
    console.log('im gonna dec cat points')//, price, price[0].price)
    let isPoints = await decCatPoints(user_id, price[0].price)
    if(isPoints){
      console.log("im gonna write ownership into db")
      await newOwnership(user_id, name, type)
    }
    else{
      await incPieces(name);
     }
  }
  // const data = helper.emptyOrRows(rows);
  // return data
}

module.exports = {
    getItems,
    getMyItems,
    decPiecesGetPrice,
    incPieces,
    decCatPoints,
    newOwnership,
    buyItem
}