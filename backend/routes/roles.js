const express = require('express');
const router = express.Router();
const roles =  require('../services/roles');
let Session = require("supertokens-node/recipe/session");


router.post('/set-role', Session.verifySession(), async function(req, res, next) {
  try {
  let userId = req.session.getUserId();

  let role = req.body.role; // TODO: fetch based on user
  console.log(role);
  //console.log("blabla")
  const rows = await roles.getRole(userId);
    console.log(rows)
    console.log("role in setrole")
  if(rows===""){
    //console.log("im gonna set role")
    await roles.setRole(userId, role);
    if(role==='cat'){
      console.log("saving cat")
      await roles.addCat(userId, req.body.catname, req.body.catrace, req.body.catgender, req.body.img);
      console.log(userId, req.body.catname, req.body.catrace, req.body.catgender);
      //let name=
    }else if(role==='owner'){
      console.log("saving owner")
      await roles.addOwner(userId, req.body.ownername, req.body.occupation, req.body.img, req.body.room);
      console.log(userId, req.body.ownername)
    }
  // Note that this will override any existing JWT payload
  // that you may have provided earlier.
    //console.log("updating jwt role")
    await req.session.updateJWTPayload({
        role
    });
  }
    console.log(await req.session.getJWTPayload()["role"]);
    console.log("rola v API")
    res.json({message: "everythings fine"})
  //try {
    //res.json(await owners.create(req.body));
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
      console.log(role)
      }
      res.json({role: role})
  }
  catch (err) {
    console.error(`Error while getting role`, err.message);
      next(err);
  }
})

module.exports = router;