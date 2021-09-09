const express = require('express');
const router = express.Router();
const shelters = require('../services/shelters');
let Session = require("supertokens-node/recipe/session");

router.get('/', Session.verifySession(), async function(req, res, next) {
    //let role = req.session.getJWTPayload()["role"]
    //let id = req.session.getUserId();
    try {
      res.json(await shelters.getShelters());
    } catch (err) {
      console.error(`Error while getting shelters`, err.message);
      next(err);
    }
  });

  // router.post('/shelterstay', Session.verifySession(), async function(req, res, next) {
  //   //let role = req.session.getJWTPayload()["role"]
  //   let id = req.session.getUserId();
  //   try {
  //     res.json(await shelters.setShelterstay(id, req.body.id));
  //   } catch (err) {
  //     console.error(`Error while setting shelterstay`, err.message);
  //     next(err);
  //   }
  // });

  module.exports = router;