"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });
//--------------------------LOGIN Page------------------------------------
  router.get("/users/login", (req, res) => {



  });

  //--------------------------REGISTER Page------------------------------------
  router.get("/users/register", (req, res) => {


    
  });

  return router;
}
