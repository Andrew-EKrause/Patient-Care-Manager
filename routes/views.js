/**
 * The views.js file is a route module that
 * contains the route to the views.ejs page
 * of the website. The views page that this
 * routing file helps to display can be 
 * thought of as the menu page for the PCM
 * application. 
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// Add the packages that are required.
var express = require('express');
var viewRouter = express.Router();

/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Creat a route to render the treatments page.
viewRouter.get("/views", function(req, res) {

    // Render the views page.
    res.render("views");
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// Create a post request for when the user wants to
// access the views page of the website.
viewRouter.post("/view", function(req, res){

    // Go to the about page.
    res.redirect("/view");
});

// Export the module for use in the main app.js file.
module.exports = viewRouter;
