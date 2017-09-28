"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

//--------------------------ROOT URL------------------------------------
  router.get("/", (req, res) => {
    // knex("users")
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

//--------------------------LOGIN Page------------------------------------
  router.post("/login", (req, res) => {



  });

  //--------------------------REGISTER Page------------------------------------
  router.post("/register", (req, res) => {



  });

  //--------------------------HARDCODED LOGIN------------------------------------
  router.get("/login/:id", (req, res) => {

    req.session.user_id = req.params.id;
    res.redirect("/");

  });

  router.get("/favourites", (req, res) => {

    DataHelpers.getUserFavourites(1)
    .then( (response) => {
      console.log(response);
      const templateVars = { favourites: response };
      res.render("favourites", templateVars);
    })
    .catch( (err) => {
      console.error(err);
    });

  });

  return router;
}
