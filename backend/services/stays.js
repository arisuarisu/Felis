const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMyActiveStay(id_cat) {
  const current_stay = await db.query(
    'SELECT id, type FROM stay WHERE id_cat=$1 and end_date IS NULL', [id_cat]
  );
  let data = null
  let fulldata = null
  //console.log("before undefined", current_stay)
  if(current_stay.length > 0){
    if(current_stay[0].type==='o'){
  data = await db.query(
    'SELECT * FROM stay_owner INNER JOIN owner ON id_owner=id WHERE id_stay=$1', [current_stay[0].id]
  );

  //const typeobj = {type: current_stay[0].type};
  // fulldata = {
  //   ...data,
  //   ...typeobj
  // }
  fulldata = {id: data[0].id, nickname: data[0].nickname, type: current_stay[0].type, max_amount_of_cats: data[0].max_amount_of_cats, avatar: data[0].img, img: data[0].room }//Object.assign({}, data[0], typeobj)
  //console.log(data, "TU VYTLACAM ACTIVE STAY IN IF")
  }else{
    data = await db.query(
      'SELECT * FROM stay_shelter INNER JOIN shelter ON id_shelter=id WHERE id_stay=$1', [current_stay[0].id]
    );
    //const typeobj = {type: current_stay[0].type};
  fulldata = {id: data[0].id, name: data[0].name, type: current_stay[0].type, max_amount_of_cats: data[0].max_amount_of_cats, img: data[0].img }//Object.assign({}, data[0], typeobj)
  }
  //console.log(data, "TU VYTLACAM ACTIVE STAY after undefined")
  //console.log("current stay if empty", current_stay[0].count, typeof(current_stay[0].count))
    return fulldata //{id: data[0].id, nickname: , type: current_stay[0].type, max_amount_of_cats: data[0].max_amount_of_cats }
}
return undefined
  }

async function isWithoutStay(id_cat) {
  const current_stay = await db.query(
    'SELECT COUNT(start_date) FROM stay WHERE id_cat=$1 and end_date IS NULL', [id_cat]
  );
  //console.log("current stay if empty", current_stay[0].count, typeof(current_stay[0].count))
    if(current_stay[0].count==='0'){ //OR UNDEFINED!!!
      return true;
    }
    else{
      return false;
    }
  }

  async function decPlaceFreeCount(id_place, type) {
    console.log('DEC IN')
    let rows=null
    if(type==='o'){
    rows = await db.query(
      'UPDATE owner SET max_amount_of_cats=max_amount_of_cats - 1 WHERE id=$1 and max_amount_of_cats>0 returning max_amount_of_cats', [id_place]
    );
    console.log('updating deccount')
    }else{ //YMENIT NA SHELTER
      rows = await db.query(
        'UPDATE shelter SET max_amount_of_cats=max_amount_of_cats - 1 WHERE id=$1 and max_amount_of_cats>0 returning max_amount_of_cats', [id_place]
      );
    }
    console.log("IM PRINTING")
    console.log(rows[0].max_amount_of_cats)
    if(rows===undefined){
      return false;
    }
    else{
      return true;
    }
  }

  async function incPlaceFreeCount(id_place, type) {
    let rows=null;
    console.log("type is", type)
    if(type==='o'){
    rows = await db.query(
      'UPDATE owner SET max_amount_of_cats=max_amount_of_cats + 1 WHERE id=$1', [id_place]
    );
    }else{ //prerobit na shelter
      rows = await db.query(
        'UPDATE shelter SET max_amount_of_cats=max_amount_of_cats + 1 WHERE id=$1', [id_place]
      );
    }
    console.log('END OF INCREASING COUNT')
  }

  async function setStartStay(id_cat, id_place, type) {
    if(await decPlaceFreeCount(id_place, type)){
    const id_stay = await db.query(
      'INSERT INTO stay (id_cat, type, end_date) VALUES ($1, $2, NULL) RETURNING id', [id_cat, type]
    );
    //console.log(id_stay[0].id, typeof(id_stay[0].id), "alsijdasd writing id stay")
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
  } //POSLAT SPRAVU ZE SA TO NEPODARILO
  }

  async function setEndStay(id_cat, id_place, type) {
    // let active = await getMyActiveStay(id_cat);
    // console.log(active, "printing active in setstay")

    await db.query(
      'UPDATE stay SET end_date = CURRENT_TIMESTAMP WHERE id_cat=$1 AND end_date IS NULL RETURNING id, type', [id_cat]
    );
    // const id = await db.query(
    //   'UPDATE stay SET end_date = CURRENT_TIMESTAMP WHERE id_cat=$1 AND end_date IS NULL RETURNING id, type', [id_cat]
    // ); 
    //return type;
    //if(type && id){
      //console.log(type, id , "vypisujem type")
      await incPlaceFreeCount(id_place, type);
    //}
   
  }

  async function setStay(id_cat, id_place, type) {
    //const offset = helper.getOffset(page, config.listPerPage);
    if(await isWithoutStay(id_cat)){
      //console.log("setting start stay in setstay")
      await setStartStay(id_cat, id_place, type);
      //console.log("end of setstay")
    }
    else{
      let active = await getMyActiveStay(id_cat);
      await setEndStay(id_cat, active.id, active.type);
      await setStartStay(id_cat, id_place, type);
    }
  }

  async function cancelStay(id_cat, id_place, type){
    if(!await isWithoutStay(id_cat)){
    //let active = await getMyActiveStay(id_cat);
    await setEndStay(id_cat, id_place, type);
    // if(type){
    //   console.log(type, "vypisujem type")
    //   //await incPlaceFreeCount(type[0].id_place, type[0].type);
    // }
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