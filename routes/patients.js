/**
 * The patients.js file is a route module that
 * contains the routes for the patients in the 
 * database. The patients in the database can
 * be edited and removed. Other patient entities
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
var patientRouter = express.Router();

/* SECTION: GET INFORMATION FROM SERVER (GET) */ 

// Creat a route to render the patients page.
patientRouter.get("/patients", function(req, res) {

    // Render the patients page.
    res.render("patients");
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ------------ CRUD Operations for Patient ------------
// Create a post request for when the user wants to 
// create a new patient.
patientRouter.post("/new_patient", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// update a given patient.
patientRouter.post("/update_patient", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// remove a given patient.
patientRouter.post("/remove_patient", function(req, res){

    // ADD MORE...
});

// Export the module for use in the main app.js file.
module.exports = patientRouter;
