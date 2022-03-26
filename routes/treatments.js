/**
 * The treatments.js file is a route module that
 * contains the routes for the treatments in the 
 * database. The treatments in the database can
 * be edited and removed. Other treatment entities
 * can also be added to the database.
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// Add the packages that are required.
var express = require('express');
var treatmentRouter = express.Router();

/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Creat a route to render the treatments page.
treatmentRouter.get("/treatments", function(req, res) {

    // Render the treatments page.
    res.render("treatments");
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ------------ CRUD Operations for Treatment ------------
// Create a post request for when the user wants to 
// create a new treatment.
treatmentRouter.post("/new_treatment", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// update a given treatment.
treatmentRouter.post("/update_treatment", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// remove a given treatment.
treatmentRouter.post("/remove_treatment", function(req, res){

    // ADD MORE...
});

// Export the module for use in the main app.js file.
module.exports = treatmentRouter;
