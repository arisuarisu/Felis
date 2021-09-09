const express = require('express');
const router = express.Router();
const cats = require('../services/cats');
let Session = require("supertokens-node/recipe/session");

router.get('/', Session.verifySession(), async function(req, res, next) {
  try {
      console.log(req.body.name, "vypisujem server string")
    res.json(await cats.getCats());
  } catch (err) {
    console.error(`Error while getting cats`, err.message);
    next(err);
  }
});

router.post('/search', Session.verifySession(), async function(req, res, next) {
  let id = req.session.getUserId();
  try {
      //console.log(req.body.name, "vypisujem server string")
    res.json(await cats.getCatsByName(req.body.name, id));
  } catch (err) {
    console.error(`Error while getting cats by name`, err.message);
    next(err);
  }
});

router.get('/mycatfriends', Session.verifySession(), async function(req, res, next) {
    let id = req.session.getUserId();
    try {
      res.json(await cats.getMyCatfriends(id));
    } catch (err) {
      console.error(`Error while getting my catfriends`, err.message);
      next(err);
    }
  });

router.get('/myrequested', Session.verifySession(), async function(req, res, next) {
    let id = req.session.getUserId();
    try {
      res.json(await cats.getMyRequestedCatfriends(id));
    } catch (err) {
      console.error(`Error while getting requested catfriends`, err.message);
      next(err);
    }
  });

  router.post('/request', Session.verifySession(), async function(req, res, next) {
    let id = req.session.getUserId();
    try {
      res.json(await cats.requestCatfriendship(id, req.body.id));
    } catch (err) {
      console.error(`Error while requesting friendship`, err.message);
      next(err);
    }
  });

  router.post('/approve', Session.verifySession(), async function(req, res, next) {
    let id = req.session.getUserId();
    try {
      res.json(await cats.approveCatfriendship(id, req.body.id));
    } catch (err) {
      console.error(`Error while approving friendship`, err.message);
      next(err);
    }
  });

  router.post('/cancel', Session.verifySession(), async function(req, res, next) {
    let id = req.session.getUserId();
    try {
      res.json(await cats.cancelCatfriendship(id, req.body.id));
    } catch (err) {
      console.error(`Error while cancelling friendship`, err.message);
      next(err);
    }
  });

  module.exports = router;