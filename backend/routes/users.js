const express = require('express');
const router = express.Router();
const users = require('../services/users');
let Session = require("supertokens-node/recipe/session");

/* GET quotes listing. */
router.get('/me', Session.verifySession(), async function(req, res, next) {
  let role = req.session.getJWTPayload()["role"]
  let id = req.session.getUserId();
  try {
    res.json(await users.getMyInfo(id, role));
    console.log("after getting me")
  } catch (err) {
    console.error(`Error while getting me `, err.message);
    next(err);
  }
});

// router.get('/mycats', Session.verifySession(), async function(req, res, next) {
//   //let role = req.session.getJWTPayload()["role"]
//   let id = req.session.getUserId();
//   try {
//     res.json(await users.getMyCats(id));
//   } catch (err) {
//     console.error(`Error while getting my cats`, err.message);
//     next(err);
//   }
// });

// router.get('/points', Session.verifySession(), async function(req, res, next) {
//   let role = req.session.getJWTPayload()["role"]
//   let id = req.session.getUserId();
//   try {
//     res.json(await users.getMyPoints(id, role));
//   } catch (err) {
//     console.error(`Error while getting my points`, err.message);
//     next(err);
//   }
// });

// router.post('/new', Session.verifySession(), async function(req, res, next) {
//     try {
//       res.json(await users.create(req.body));
//     } catch (err) {
//       console.error(`Error while posting a new user`, err.message);
//       next(err);
//     }
//   });

module.exports = router;