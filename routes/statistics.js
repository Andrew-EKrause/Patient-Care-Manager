/**
 * The statistics.js file is a route module that
 * contains the routes for the statistics in the 
 * database. The statistics in the database are
 * not able to be edited or removed given that 
 * the data is obtained through complex SQL queries.
 * The purpose of this route module/JavaScript
 * file is to simply organize the data through
 * SQL queries and send it to the statistics.ejs
 * file to be displayed on the website. 
 * 
 * NOTE: There is also other data displayed 
 * here that is obtained through the use of
 * complex queries (at least three) made on
 * the database.
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// NOTES: 
// ============================================================================
// AFTER YOU FINISH YOUR THREE COMPLEX QUERIES, GO BACK TO THE patients.js PAGE
// (AND MAYBE TO THE OTHER MAIN ENTITIES YOU CREATED) AND TRY TO DISPLAY THE
// TREATMENTS THAT EACH PATIENT IS RECEIVING. 

// THIS DATA WILL BE OBTAINED VIA A JOIN
// BETWEEN THE PATIENT AND TREATMENT TABLES. YOU WILL NEVER DISPLAY ANY OF
// THE TABLES THAT REPRESENT A RELATIONSHIP BETWEEN TWO OTHER TABLES IN 
// YOUR DATABASE. YOU WILL SIMPLY DISPLAY THE RESULT(S) OF THE QUERY THAT
// COMPLETES THE JOIN ON THE INTERFACE OF THE PATIENT PAGE. 

// IF CHANGES ARE
// MADE TO THE TREATMENTS LISTED FOR EACH PATIENT VIA THE "UPDATE" FEATURE,
// THEN APPLY THOSE CHANGES TO THE TABLE (NOT THE PATIENT TABLE) THAT 
// REPRESENTS THE RELATIONSHIP BETWEEN THE PATIENT TABLE AND THE TREATMENT
// TABLE.
// ============================================================================

// Add the packages that are required.
var express = require('express');
var statisticsRouter = express.Router();

// Include the database route in order to 
// work with the data in the statistics table.
const database = require('./database.js');

/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Creat a route to render the urgent page.
statisticsRouter.get("/statistics", function(req, res) {

    // Render the departments page.
    // --> WILL LIKELY CREATE A QUERY AND SEND DATA OVER
    // --> TO THE urgent.ejs FILE TO BE DISPLAYED.
    res.render("statistics");
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ...

// MAY ALSO INCLUDE INFORMATION REGARDING THE USE OF THE
// THREE COMPLEX QUERIES THAT YOU NEED TO IMPLEMENT FOR
// THIS PROJECT.

// Export the module for use in the main app.js file.
module.exports = statisticsRouter;
