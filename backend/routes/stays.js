const express = require('express');
const router = express.Router();
const stays = require('../services/stays');
let Session = require("supertokens-node/recipe/session");

router.get('/active', Session.verifySession(), async function(req, res, next) {
  let id = req.session.getUserId();
  try {
    res.json(await stays.getMyActiveStay(id));
  } catch (err) {
    console.error(`Error while getting active stay`, err.message);
    next(err);
  }
});

router.post('/setstay', Session.verifySession(), async function(req, res, next) {
    let id = req.session.getUserId();
    try {
      res.json(await stays.setStay(id, req.body.id, req.body.type));

    } catch (err) {
      console.error(`Error while setting stay`, err.message);
      next(err);
    }
  });

  router.post('/cancelstay', Session.verifySession(), async function(req, res, next) {
    let id = req.session.getUserId();
    try {
      res.json(await stays.cancelStay(id, req.body.id, req.body.type));
    } catch (err) {
      console.error(`Error while cancelling stay`, err.message);
      next(err);
    }
  });

  module.exports = router;