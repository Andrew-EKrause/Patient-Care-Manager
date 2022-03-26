/**
 * The urgent.js file is a route module that
 * contains the routes for the urgent cases in the 
 * database. The urgent cases in the database are
 * not able to be edited or removed given that 
 * the data is obtained through SQL queries.
 * The purpose of this route module/JavaScript
 * file is to simply organize the data through
 * SQL queries and send it to the urgent.ejs
 * file to be displayed on the website.
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// Add the packages that are required.
var express = require('express');
var urgentRouter = express.Router();

/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Creat a route to render the urgent page.
urgentRouter.get("/urgent", function(req, res) {

    // Render the departments page.
    // --> WILL LIKELY CREATE A QUERY AND SEND DATA OVER
    // --> TO THE urgent.ejs FILE TO BE DISPLAYED.
    res.render("urgent");
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// --> MAY END UP NOT USING IT THIS WAY!!!
// // ------------ CRUD Operations for Urgent ------------
// // Create a post request for when the user wants to 
// // create a new urgent case.
// urgentRouter.post("/new_urgent", function(req, res){

//     // ADD MORE...
// }); // --> MAYBE HAVE THIS...MAYBE NOT!!!

// // Create a post request for when the user wants to
// // update a given urgent case.
// urgentRouter.post("/update_urgent", function(req, res){

//     // ADD MORE...
// });

// // Create a post request for when the user wants to
// // remove a given urgent case.
// urgentRouter.post("/remove_urgent", function(req, res){

//     // ADD MORE...
// });

// Export the module for use in the main app.js file.
module.exports = urgentRouter;
