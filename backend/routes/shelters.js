const express = require('express');
const router = express.Router();
const shelters = require('../services/shelters');
let Session = require("supertokens-node/recipe/session");

router.get('/', Session.verifySession(), async function(req, res, next) {
    try {
      res.json(await shelters.getShelters());
    } catch (err) {
      console.error(`Error while getting shelters`, err.message);
      next(err);
    }
  });

  module.exports = router;