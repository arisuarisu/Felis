const db = require('./db');
const helper = require('../helper');

async function getMyActiveStay(id_cat) {
  const current_stay = await db.query(
    'SELECT id, type FROM stay WHERE id_cat=$1 and end_date IS NULL', [id_cat]
  );
  let data = null
  let fulldata = null
  if(current_stay.length > 0){
    if(current_stay[0].type==='o'){
  data = await db.query(
    'SELECT * FROM stay_owner INNER JOIN owner ON id_owner=id WHERE id_stay=$1', [current_stay[0].id]
  );
  fulldata = {id: data[0].id, nickname: data[0].nickname, type: current_stay[0].type, max_amount_of_cats: data[0].max_amount_of_cats, avatar: data[0].img, img: data[0].room }
  }else{
    data = await db.query(
      'SELECT * FROM stay_shelter INNER JOIN shelter ON id_shelter=id WHERE id_stay=$1', [current_stay[0].id]
    );
  fulldata = {id: data[0].id, name: data[0].name, type: current_stay[0].type, max_amount_of_cats: data[0].max_amount_of_cats, img: data[0].img }
  }
    return fulldata
}
return undefined
  }

async function isWithoutStay(id_cat) {
  const current_stay = await db.query(
    'SELECT COUNT(start_date) FROM stay WHERE id_cat=$1 and end_date IS NULL', [id_cat]
  );
    if(current_stay[0].count==='0'){
      return true;
    }
    else{
      return false;
    }
  }

  async function decPlaceFreeCount(id_place, type) {
    let rows=null
    if(type==='o'){
    rows = await db.query(
      'UPDATE owner SET max_amount_of_cats=max_amount_of_cats - 1 WHERE id=$1 and max_amount_of_cats>0 returning max_amount_of_cats', [id_place]
    );
    }else{ 
      rows = await db.query(
        'UPDATE shelter SET max_amount_of_cats=max_amount_of_cats - 1 WHERE id=$1 and max_amount_of_cats>0 returning max_amount_of_cats', [id_place]
      );
    }
    if(rows===undefined){
      return false;
    }
    else{
      return true;
    }
  }

  async function incPlaceFreeCount(id_place, type) {
    let rows=null;
    if(type==='o'){
    rows = await db.query(
      'UPDATE owner SET max_amount_of_cats=max_amount_of_cats + 1 WHERE id=$1', [id_place]
    );
    }else{
      rows = await db.query(
        'UPDATE shelter SET max_amount_of_cats=max_amount_of_cats + 1 WHERE id=$1', [id_place]
      );
    }
  }

  async function setStartStay(id_cat, id_place, type) {
    if(await decPlaceFreeCount(id_place, type)){
    const id_stay = await db.query(
      'INSERT INTO stay (id_cat, type, end_date) VALUES ($1, $2, NULL) RETURNING id', [id_cat, type]
    );
    if(type==='o' && id_stay[0].id != null){
    const rows = await db.query(
      'INSERT INTO stay_owner (id_stay, id_owner) VALUES ($1, $2) RETURNING *', [parseInt(id_stay[0].id), id_place]
    );
    }
    else if(type==='s' && id_stay[0].id != null){
      const rows = await db.query(
        'INSERT INTO stay_shelter (id_stay, id_shelter) VALUES ($1, $2) RETURNING *', [parseInt(id_stay[0].id), id_place]
      );
    }
  }
  }

  async function setEndStay(id_cat, id_place, type) {
    await db.query(
      'UPDATE stay SET end_date = CURRENT_TIMESTAMP WHERE id_cat=$1 AND end_date IS NULL RETURNING id, type', [id_cat]
    );
      await incPlaceFreeCount(id_place, type);
   
  }

  async function setStay(id_cat, id_place, type) {
    if(await isWithoutStay(id_cat)){
      await setStartStay(id_cat, id_place, type);
    }
    else{
      let active = await getMyActiveStay(id_cat);
      await setEndStay(id_cat, active.id, active.type);
      await setStartStay(id_cat, id_place, type);
    }
  }

  async function cancelStay(id_cat, id_place, type){
    if(!await isWithoutStay(id_cat)){
    await setEndStay(id_cat, id_place, type);
    } 
    
  }

  module.exports = {
    isWithoutStay,
    decPlaceFreeCount,
    incPlaceFreeCount,
    getMyActiveStay,
    setStartStay,
    setEndStay,
    setStay,
    cancelStay
  }