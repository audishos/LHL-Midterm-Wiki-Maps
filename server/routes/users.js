"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

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
  router.post("/users/login", (req, res) => {



  });

  //--------------------------REGISTER Page------------------------------------
  router.post("/users/register", (req, res) => {



  });

  //--------------------------HARDCODED LOGIN------------------------------------
  router.get("/login/:id", (req, res) => {

    req.session.user_id = req.params.id;
    res.redirect("/");

  });

  return router;
}
