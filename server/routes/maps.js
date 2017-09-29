"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser  = require("body-parser");


module.exports = (DataHelpers) => {

    //--------------------------SHOW ALL MAPS------------------------------------
    router.get("/", (req, res) => {
        DataHelpers.getAllMaps((error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            console.log(results);
            res.render("showmaplist.ejs",{
                results: results
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
        DataHelpers.addMap(req.body.map_name, req.body.description, 2,(err, results, mapid) =>{
            if(err){
                console.log(err);
                console.log("error adding map to database");
                res.status(503).send();
                return;
            }
            res.redirect("/maps/"+mapid);
        });
    })

    //--------------------------SHOW Specific Map------------------------------------

    // router.get("/:mapid/view", (req, res) => {

    //     DataHelpers.getMapObject(req.params.mapid, (error, results)=>{
    //         if(error){
    //             res.status(500).send()
    //             return;
    //         }
    //         res.send(results)
    //     });
    // });
    // //--------------------------SHOW Specific Map------------------------------------
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

    //--------------------------DELETE Specific Point------------------------------------
    router.delete("/points/:pointid", (req, res) => {
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
