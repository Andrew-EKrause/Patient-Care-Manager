/**
 * The home-about.js file is a route module 
 * that contains the routes for the home page 
 * and the about page of the Patient Care 
 * Manager (PCM) application.
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// Add the packages that are required.
var express = require('express');
var homeRouter = express.Router();

/* SECTION: GET INFORMATION FROM SERVER (GET) */ 

// Default route, which is the home page.
homeRouter.get("/", function(req, res) {

    // Render the home page of the website.
    res.render("home");
});

// Route to render the home page when the user clicks
// the "PCM" icon.
homeRouter.get("/home", function(req, res) {

    // Render the home page of the website.
    res.render("home");
});

// Create a route to render the about page.
homeRouter.get("/about", function(req, res) {

    // Render the about page.
    //res.send("About this page.");
    res.render("about");
});

// Create a route to allow the user to download
// the project document from the web application.
homeRouter.get("/download_info", function(req, res){

    // Download the help manual (PDF) file stored for website.
    const file = `${__dirname}/public/files/krause-initial.pdf`;
    res.download(file);
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// Create a post request for when user clicks any "Back" button.
homeRouter.post("/back", function(req, res){

    // Go to the home page.
    res.redirect("/home");
});

// Create a post request for when the user wants to
// access the about page of the website.
homeRouter.post("/about", function(req, res){

    // Go to the about page.
    res.redirect("/about");
});

// Create a post request for when the user clicks
// the link to download the project document.
homeRouter.post("/download_info", function(req, res){
    res.redirect("/download_info");
});

// Export the module for use in the main app.js file.
module.exports = homeRouter;
