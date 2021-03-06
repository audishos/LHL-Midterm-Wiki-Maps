"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (DataHelpers) => {

  //--------------------------HARDCODED LOGIN------------------------------------
  router.get("/login/:id", (req, res) => {

    req.session.user_id = req.params.id;
    res.redirect("/");

  });

  router.get("/logout", (req, res) => {

    req.session.user_id = null;
    res.redirect("/");

  })

  // display the user profile page for the current authed user
  router.get("/profile", (req, res) => {

    const userId = req.session.user_id;
    let templateVars = {};

    if (userId) {
      Promise.all([

        // get user details
        DataHelpers.getUser(userId)
        .then( (response) => {
          templateVars.user = response;
        })
        .catch( (error) => {
          res.status(400).send(error);
        }),

        // get user favourites
        DataHelpers.getUserFavourites(userId)
        .then( (response) => {
          templateVars.favourites = response;
        })
        .catch( (err) => {
          res.status(400).send(error);
        }),

        // get user contributions
        DataHelpers.getUserContributions(userId)
        .then( (response) => {
          templateVars.contributions = response;
        })
        .catch( (error) => {
          res.status(400).send(error);
        })
      ])
      .then( (response) => {
        // res.render("favourites", templateVars);
        res.render("profile", templateVars)
      })
    } else {
      res.status(401).send("you must be logged in to view your profile!");
    }

  });

  return router;
}
