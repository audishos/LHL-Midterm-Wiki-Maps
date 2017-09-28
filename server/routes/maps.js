"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

    //--------------------------SHOW ALL MAPS------------------------------------
    router.get("/maps", (req, res) => {



    });

    //--------------------------ADD A MAP------------------------------------
    router.post("/maps", (req, res) => {


        
    });

    //--------------------------SHOW Specific Map------------------------------------
    router.get("/maps/:mapid", (req, res) => {
        
        
            
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
