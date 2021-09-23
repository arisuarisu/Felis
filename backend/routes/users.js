const express = require('express');
const router = express.Router();
const users = require('../services/users');
let Session = require("supertokens-node/recipe/session");

router.get('/me', Session.verifySession(), async function(req, res, next) {
  let role = req.session.getJWTPayload()["role"]
  let id = req.session.getUserId();
  try {
    res.json(await users.getMyInfo(id, role));
  } catch (err) {
    console.error(`Error while getting me `, err.message);
    next(err);
  }
});

module.exports = router;