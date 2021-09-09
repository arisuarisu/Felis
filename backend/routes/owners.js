const express = require('express');
const router = express.Router();
const owners = require('../services/owners');
let Session = require("supertokens-node/recipe/session");

router.get('/', Session.verifySession(), async function(req, res, next) {
    //let role = req.session.getJWTPayload()["role"]
    //let id = req.session.getUserId();
    try {
      res.json(await owners.getOwners());
    } catch (err) {
      console.error(`Error while getting owners`, err.message);
      next(err);
    }
  });

  // router.post('/ownerstay', Session.verifySession(), async function(req, res, next) {
  //   //let role = req.session.getJWTPayload()["role"]
  //   let id = req.session.getUserId();
  //   try {
  //     res.json(await owners.setOwnerstay(id, req.body.id));
  //   } catch (err) {
  //     console.error(`Error while setting ownerstay`, err.message);
  //     next(err);
  //   }
  // });

  module.exports = router;