"use strict";

const express = require('express');
const router  = express.Router();
{/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBILOdZLJBP1ajrPSIzG6VZajst3WCW77k&callback=initMap"
async defer></script> */}

module.exports = (DataHelpers) => {

    //--------------------------SHOW ALL MAPS------------------------------------
    router.get("/", (req, res) => {
        console.log("ayyyy")
        res.send(DataHelpers.getMaps());


    });

    //--------------------------ADD A MAP------------------------------------
    router.post("/maps", (req, res) => {



    });

    //--------------------------SHOW Specific Map------------------------------------
    router.get("/maps/:mapid", (req, res) => {

        DataHelpers.renderTitleDesc(1)
        .then( (res) => {
          console.log(res);
        })
        .catch( (err) => {
          console.error(err);
        });

        Datahelpers.renderMap(1)
        .then(results => console.log("Results are", results))
        .catch(err => console.log("Oops, there is an error"));


    });

    //--------------------------EDIT Specific Map------------------------------------
    router.put("/maps/:mapid", (req, res) => {



    });

    //--------------------------DELETE Specific Map------------------------------------
    router.delete("/maps/:mapid", (req, res) => {



    });

    //--------------------------LIST Points from Specific Map------------------------------------
    router.get("/maps/:mapid/points", (req, res) => {



    });

    //--------------------------LIST Points for Specific User------------------------------------
    router.get("/points", (req, res) => {



    });

    //--------------------------LIST Points for Specific User------------------------------------
    router.post("/maps/:mapid/points", (req, res) => {



    });

    //--------------------------EDIT Specific Point------------------------------------
    router.put("/points/:pointid", (req, res) => {



    });

    //--------------------------DELETE Specific Point------------------------------------
    router.delete("/points/:pointid", (req, res) => {



    });



  return router;
}
