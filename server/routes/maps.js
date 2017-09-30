"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser  = require("body-parser");


module.exports = (DataHelpers) => {

    //--------------------------SHOW ALL MAPS------------------------------------
    router.get("/", (req, res) => {
        console.log("ayyyy");
        DataHelpers.getMaps((results)=>{
            res.send(results);
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
        DataHelpers.getMapObject(req.params.mapid, (error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            res.send(results)
        });
    });
    //--------------------------SHOW Specific Map------------------------------------
    router.get("/:mapid/view", (req, res) => {
        DataHelpers.getMapObject(req.params.mapid, (error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            console.log(results);
            res.render("view.ejs",{
                template: results[0]
            })
        });
    });
    //--------------------------EDIT Page for Specific Map--------------------------------
    router.get("/:mapid/edit", (req, res) =>{
        DataHelpers.getMapObject(req.params.mapid, (error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            if(results){
                let templateVars = {maps:results[0]}
                res.render("edit-map.ejs",{
                    templateVars: templateVars
                })
            }
        });
    });
    //--------------------------EDIT Specific Map------------------------------------
    router.put("/:mapid", (req, res) => {
    });

    //--------------------------DELETE Specific Map------------------------------------
    router.delete("/:mapid", (req, res) => {
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

    //--------------------------LIST Points for Specific User------------------------------------
    //questionable
    router.get("/points", (req, res) => {
    });

    //--------------------------LIST Points for Specific Map------------------------------------
    router.post("/:mapid/points", (req, res) => {
    });

    //--------------------------EDIT Specific Point------------------------------------
    router.put("/points/:pointid", (req, res) => {
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
