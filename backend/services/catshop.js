const db = require('./db');
const helper = require('../helper');

async function getItems(type) {
    const rows = await db.query(
      'SELECT name, description, pieces, price, img FROM shop WHERE type = $1', 
      [type]
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  async function getMyItems(id, type) {
    const rows = await db.query(
      'SELECT shop.name, description, pieces, price, img FROM shop INNER JOIN ownership ON shop.name=ownership.name WHERE user_id = $1 AND ownership.type=$2', 
      [id, type]
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

async function decPiecesGetPrice(name){
  const rows = await db.query(
    'UPDATE shop SET pieces=pieces-1 WHERE name=$1 AND pieces>0 RETURNING price', 
    [name]
  );
  const data = helper.emptyOrRows(rows);
  return data
}

async function incPieces(name){
  const rows = await db.query(
    'UPDATE shop SET pieces=pieces+1 WHERE name=$1 RETURNING *', 
    [name]
  );
  const data = helper.emptyOrRows(rows);
  return data
}

async function decCatPoints(cat_id, price){
  const rows = await db.query(
    'UPDATE cat SET points=points-$1 WHERE points-$1>-1 AND id=$2 RETURNING *', 
    [price, cat_id]
  );
  const data = helper.emptyOrRows(rows);
  return data
}

async function newOwnership(user_id, name, type){
  const rows = await db.query(
    'INSERT INTO ownership(user_id, name, type) VALUES ($1, $2, $3) RETURNING *', 
    [user_id, name, type]
  );
  const data = helper.emptyOrRows(rows);
  return data
}

async function buyItem(user_id, name, type){
  let price = await decPiecesGetPrice(name);
  if(price){
    let isPoints = await decCatPoints(user_id, price[0].price)
    if(isPoints){
      await newOwnership(user_id, name, type)
    }
    else{
      await incPieces(name);
     }
  }
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