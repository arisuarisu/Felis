const express = require('express');
const router = express.Router();
const owners = require('../services/owners');
let Session = require("supertokens-node/recipe/session");

router.get('/', Session.verifySession(), async function(req, res, next) {
    try {
      res.json(await owners.getOwners());
    } catch (err) {
      console.error(`Error while getting owners`, err.message);
      next(err);
    }
  });

  module.exports = router;