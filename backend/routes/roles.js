const express = require('express');
const router = express.Router();
const roles =  require('../services/roles');
let Session = require("supertokens-node/recipe/session");

router.post('/set-role', Session.verifySession(), async function(req, res, next) {
  try {
  let userId = req.session.getUserId();
  let role = req.body.role;
  const rows = await roles.getRole(userId);
  if(rows===""){
    await roles.setRole(userId, role);
    if(role==='cat'){
      await roles.addCat(userId, req.body.catname, req.body.catrace, req.body.catgender, req.body.img);
    }else if(role==='owner'){
      await roles.addOwner(userId, req.body.ownername, req.body.occupation, req.body.img, req.body.room);
    }
    await req.session.updateJWTPayload({
        role
    });
  }
    res.json({message: "everythings fine"})
    } catch (err) {
      console.error(`Error while setting role`, err.message);
      next(err);
    }
  });

  router.get('/get-role', Session.verifySession(), async function(req, res, next) {
    try{
      let userId = req.session.getUserId();
      const role = await roles.getRole(userId);
      if(role!==""){
        await req.session.updateJWTPayload({
          role
      });
      }
      res.json({role: role})
  }
  catch (err) {
    console.error(`Error while getting role`, err.message);
      next(err);
  }
})

module.exports = router;