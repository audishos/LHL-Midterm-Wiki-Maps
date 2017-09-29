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

    //--------------------------SHOW Specific Map------------------------------------

    router.get("/:mapid", (req, res) => {

        DataHelpers.getMapObject(req.params.mapid, (error, results)=>{
            if(error){
                res.status(500).send()
                return;
            }
            res.render("view.ejs",{
                template: results[0]
            })
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
    router.get("/points", (req, res) => {



    });

    //--------------------------LIST Points for Specific User------------------------------------
    router.post("/:mapid/points", (req, res) => {



    });

    //--------------------------EDIT Specific Point------------------------------------
    router.put("/points/:pointid", (req, res) => {



    });

    //--------------------------DELETE Specific Point------------------------------------
    router.delete("/points/:pointid", (req, res) => {



    });

    return router;
}
