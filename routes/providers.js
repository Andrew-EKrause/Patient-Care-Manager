/**
 * The providers.js file is a route module that
 * contains the routes for the providers in the 
 * database. The providers in the database can
 * be edited and removed. Other provider entities
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
var providerRouter = express.Router();

// Include the database route in order to 
// work with the data in the providers table.
const database = require('./database.js');

/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Creat a route to render the providers page.
providerRouter.get("/providers", function(req, res) {

    // Render the providers page.
    res.render("providers");
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ------------ CRUD Operations for Provider ------------
// Create a post request for when the user wants to 
// create a new provider.
providerRouter.post("/new_provider", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// update a given provider.
providerRouter.post("/update_provider", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// remove a given provider.
providerRouter.post("/remove_provider", function(req, res){

    // ADD MORE...
});

// Export the module for use in the main app.js file.
module.exports = providerRouter;
