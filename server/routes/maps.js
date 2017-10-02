"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser  = require("body-parser");


module.exports = (DataHelpers) => {

    //--------------------------SHOW ALL MAPS------------------------------------
    router.get("/", (req, res) => {
      DataHelpers.getMaps((error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            // console.log(results);
            res.render("showmaplist.ejs",{
                results: results.rows
            })
      });

    });

    //--------------------------ADD A MAP------------------------------------
    router.get("/new", (req, res) =>{
        res.render("../views/create-map");
        return;
    })
    //hard coded user id
    router.post("/", (req, res) =>{
        DataHelpers.addMap(req.body.map_name, req.body.description, req.session.user_id, (err, mapId) =>{
            if(err){
                console.log(err);
                console.log("error adding map to database");
                res.status(503).send();
                return;
            } else {
              res.redirect(`/maps/${mapId}/edit`);
            }
        });
    })
    //----------------------------Get info on specifc map-------------------
    router.get("/:mapid", (req, res) => {
        DataHelpers.getMapObject(req.params.mapid)
        .then( result => {
          res.send(results)
        })
        .catch( error => {
          res.status(500).send()
          return;

        });
    });
    //--------------------------SHOW Specific Map------------------------------------
    router.get("/:mapid/view", (req, res) => {

      let templateVars = {};
      let favourited = false;

      if (req.session.user_id) {
        Promise.all([
          DataHelpers.getMapObject(req.params.mapid)
          .then( response => {
            templateVars.template = response[0];
          })
          .catch( error => {
            res.status(500).send()
            return;
          }),

          DataHelpers.getUserFavourites(req.session.user_id)
          .then( response => {
            templateVars.favourites = response;
          })
          .catch( error => {
            res.status(500).send(error);
          })

        ])
        .then( response => {
          if(templateVars.template) {
            res.render("view", templateVars);
          } else {
            res.render("redirected.ejs");
          }

        });
      }
      else {
        DataHelpers.getMapObject(req.params.mapid)
        .then( response => {
          templateVars.template = response[0];
          templateVars.favourites = null;
          if(templateVars.template) {
            res.render("view", templateVars);
          } else {
            res.render("redirected.ejs");
          }
        })
        .catch( error => {
          res.status(500).send()
          return;
        });
      }

    });
    //--------------------------EDIT Page for Specific Map--------------------------------
    router.get("/:mapid/edit", (req, res) =>{
        DataHelpers.getMapObject(req.params.mapid)
        .then(response => {
          let templateVars = { maps: response[0] }
          if(templateVars.maps) {
            res.render("edit-map.ejs",{
                templateVars: templateVars
            });
          } else {
            res.render("redirected.ejs");
          }
        })
        .catch( error => {
          res.status(500).send(error)
          return;
        });
    });

    //--------------------------LIST Points from Specific Map------------------------------------
    router.get("/:mapid/points", (req, res) => {
        DataHelpers.getPointsOnMap(req.params.mapid, (error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            res.send(results);
        });
    });

    //--------------------------ADD Point for Specific Map------------------------------------
    router.post("/:mapid/points", (req, res) => {
      console.log(req.body.point);
      DataHelpers.savePoint(req.body.point, (error)=>{
        if(error){
          res.status(500).send();
          return;
        }
        res.status(200).send();
        return;
      });
    });

    //--------------------------DELETE Point for map------------------------------------
    router.delete("/:mapid/points/:point", (req, res) => {
        DataHelpers.deletePoints(req.params.point, (error)=>{
            console.log(req.params.point)
            if(error){
                console.log("points don't exist or unauthorized")
                res.status(401).send();
                return;
            }
            res.status(200).send();
        })
    });

    // add the map via id in the route to the authed user's favourites
    router.post("/:mapid/favourites", (req, res) => {

      const userId = req.session.user_id;
      const mapId = req.params.mapid;

      if (userId > 0 && mapId > 0) {
        DataHelpers.addFavourite(userId, mapId)
        .then( (response) => {
          res.status(201).send();
        })
        .catch( (error) => {
          res.status(400).send(error);
        });
      } else if (mapId <= 0) {
        res.status(400).send(`mapId: ${mapId} must be > 0`);
      } else {
        res.status(401).send(`you must be logged in to do this!`);
      }

    });

    // delete the map via id in the route from the authed user's favourites
    router.delete("/:mapid/favourites", (req, res) => {

      const userId = req.session.user_id;
      const mapId = req.params.mapid;

      if (userId > 0 && mapId > 0) {
        DataHelpers.deleteFavourite(userId, mapId)
        .then( (response) => {
          res.status(200).send();
        })
        .catch( (error) => {
          res.status(400).send(error);
        });
      } else if (mapId <= 0) {
        res.status(400).send(`mapId: ${mapId} must be > 0`);
      } else {
        res.status(401).send(`you must be logged in to do this!`);
      }

    });

    return router;
}
