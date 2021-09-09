const express = require('express');
const router = express.Router();
const catshop = require('../services/catshop');
let Session = require("supertokens-node/recipe/session");

/* GET catshop items */
router.get('/', Session.verifySession(), async function(req, res, next) {
  let role = req.session.getJWTPayload()["role"];
  if(role==="cat"){
    try {
      //console.log('ABRAKADABRA')
        res.json(await catshop.getItems(role));
        //console.log('BLABLA')
      } catch (err) {
        console.error(`Error while getting catshop items`, err.message);
        next(err);
      }
  }
});

router.get('/my', Session.verifySession(), async function(req, res, next) {
  let role = req.session.getJWTPayload()["role"];
  let id = req.session.getUserId();
  if(role==="cat"){
    try {
      //console.log('ABRAKADABRA')
        res.json(await catshop.getMyItems(id, 'c'));
        //console.log('BLABLA')
      } catch (err) {
        console.error(`Error while getting my catshop items`, err.message);
        next(err);
      }
  }
});

/* POST which item to buy*/
router.post('/buy', Session.verifySession(), async function(req, res, next) {
    let role = req.session.getJWTPayload()["role"];
    let id = req.session.getUserId();
    console.log("im buying")
  if(role==="cat"){
    try {
      res.json(await catshop.buyItem(id, req.body.name, 'c'));
    } catch (err) {
      console.error(`Error while buying catshop item`, err.message);
      next(err);
    }
}
  });

module.exports = router;