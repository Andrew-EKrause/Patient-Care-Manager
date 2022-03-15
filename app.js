/**
 * The app.js file contains the core processes
 * that create the different features of the
 * Mayo Clinic Patient Care Management system
 * (PCM) web application. The file is, in
 * essence, the server code that connects to the
 * SQL database as well as handles different
 * requests to the web application. Given the
 * numerous lines of code in this file, sections
 * have been used to break apart the different
 * functionalities. To understand the code, read
 * the comments throughout the app.js file and
 * analyze the information section by section.
 * 
 * ----------------------------------------------------------------------------------
 * The sections present in the code are listed
 * below in order in all caps:
 *
 * 1. SECTION: DESCRIPTION...
 * ----------------------------------------------------------------------------------
 *
 * Project: Mayo Clinic Patient Care Manager 
 *          (PCM) Web Application
 * Author: Andrew Krause
 * Class: Introduction to Database 
 *        Management Systems (CS 364)
 * Date: 5/10/2022
 * 
 */

//jshint esversion:6

/* SECTION: INSTALLED PACKAGES AND INITIALIZATION */

// Require packages for the server that were installed.
const express = require("express");
const flash = require("connect-flash");
const ejs = require("ejs");
const _ = require("lodash");
var mysql = require("mysql");

// Require additional security packages for login information
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { appendFile } = require("fs");

// Create web app using express. Set view engine to EJS
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');


// ============================================================================================================


/* SECTION: INFORMATION FOR DATABASE VIA MYSQL */

// ...
// --> Connect to the SQL database here.
// ...


// ============================================================================================================


/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Default route, which is the home page.
app.get("/", function(req, res) {

    // Render the home page of the website.
    res.render("home");
});

// Route to render the home page when the user clicks
// the "PCM" icon.
app.get("/home", function(req, res) {

    // Render the home page of the website.
    res.render("home");
});

// Create a route to allow the user to download
// the project document from the web application.
app.get("/download_info", function(req, res){

    // Download the help manual (PDF) file stored for website.
    const file = `${__dirname}/public/files/krause-initial.pdf`;
    res.download(file);
});

// Creat a route to render the patients page.
app.get("/patients", function(req, res) {

    // Render the patients page.
    res.render("patients");
});

// Creat a route to render the treatments page.
app.get("/treatments", function(req, res) {

    // Render the treatments page.
    res.render("treatments");
});

// Creat a route to render the providers page.
app.get("/providers", function(req, res) {

    // Render the providers page.
    res.render("providers");
});

// Creat a route to render the departments page.
app.get("/departments", function(req, res) {

    // Render the departments page.
    res.render("departments");
});

// Creat a route to render the urgent page.
app.get("/urgent", function(req, res) {

    // Render the departments page.
    res.render("urgent");
});

// Create a route to render the about page.
app.get("/about", function(req, res){

    // Render the about page.
    res.render("about");
});


// ============================================================================================================


/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// Create a post request for when user clicks any "Back" button.
app.post("/back", function(req, res){

    // Go to the home page.
    res.redirect("/home");
});

// Create a post request for when the user clicks
// the link to download the project document.
app.post("/download_info", function(req, res){
    res.redirect("/download_info");
});

// ------------ CRUD Operations for Patient ------------
// Create a post request for when the user wants to 
// create a new patient.
app.post("/new_patient", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// update a given patient.
app.post("/update_patient", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// remove a given patient.
app.post("/remove_patient", function(req, res){

    // ADD MORE...
});

// ------------ CRUD Operations for Treatment ------------
// Create a post request for when the user wants to 
// create a new treatment.
app.post("/new_treatment", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// update a given treatment.
app.post("/update_treatment", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// remove a given treatment.
app.post("/remove_treatment", function(req, res){

    // ADD MORE...
});

// ------------ CRUD Operations for Provider ------------
// Create a post request for when the user wants to 
// create a new provider.
app.post("/new_provider", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// update a given provider.
app.post("/update_provider", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// remove a given provider.
app.post("/remove_provider", function(req, res){

    // ADD MORE...
});

// ------------ CRUD Operations for Department ------------
// Create a post request for when the user wants to 
// create a new department.
app.post("/new_department", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// update a given department.
app.post("/update_department", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// remove a given department.
app.post("/remove_department", function(req, res){

    // ADD MORE...
});

// --> MAY END UP NOT USING IT THIS WAY!!!
// // ------------ CRUD Operations for Urgent ------------
// // Create a post request for when the user wants to 
// // create a new urgent case.
// app.post("/new_urgent", function(req, res){

//     // ADD MORE...
// }); // --> MAYBE HAVE THIS...MAYBE NOT!!!

// // Create a post request for when the user wants to
// // update a given urgent case.
// app.post("/update_urgent", function(req, res){

//     // ADD MORE...
// });

// // Create a post request for when the user wants to
// // remove a given urgent case.
// app.post("/remove_urgent", function(req, res){

//     // ADD MORE...
// });

// Create a post request for when the user wants to
// access the about page of the website.
app.post("/about", function(req, res){

    // Go to the about page.
    res.redirect("/about");
});


// ============================================================================================================


/* SECTION: LISTEN FOR SERVER REQUESTS */

// Begin listening for server requests on port 3000.
app.listen(3000, function(){
    console.log("Server for Mayo Clinic Patient Care Manager (PCM) Web App started on port 3000.");
});