const db = require('./db');
const helper = require('../helper');

async function getOwners() {
    const rows = await db.query(
      'SELECT id, nickname, max_amount_of_cats, img, room FROM owner', []
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  async function getFreePlacesCount(id_owner) {
    const rows = await db.query(
    'SELECT max_amount_of_cats from owner WHERE id=$1', [id_owner]
    );
    const data = helper.emptyOrRows(rows);
    return {data}
  }

  async function getFreeOwners() {
    const rows = await db.query(
      'SELECT id, nickname, max_amount_of_cats FROM owner WHERE max_amount_of_cats > 0', []
    );
    const data = helper.emptyOrRows(rows);
    return data
  }

  module.exports = {
    getOwners,
    getFreePlacesCount,
    getFreeOwners
  }