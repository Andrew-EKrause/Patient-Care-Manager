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
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// --> MAYBE INCLUDE THE DATABASE ROUTE HERE AND LOAD THE DATA IF IT DOES NOT 
// --> ALREADY EXIST IN THE DATABASE! OTHERWISE, COMPLETE THIS ACTION IN THE
// --> "home-about.js" ROUTE!!!

//jshint esversion:6

/* SECTION: INSTALLED PACKAGES AND INITIALIZATION */

// Require packages for the server that were installed.
const express = require("express");
var path = require("path");
const ejs = require("ejs");
const _ = require("lodash");

// Require additional security packages for login information
const session = require('express-session');
const passport = require("passport");
var path = require('path');

// Require packages for error checks and sessions.
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // --> WHAT IS THIS???
var expressValidator = require('express-validator');

// Utilize the body parser package.
var bodyParser = require('body-parser');


// Use the file and error packages.
const { appendFile } = require("fs");
var createError = require('http-errors');

// Create web app using express. Set view engine to EJS.
// Utilize the body parser packages to parse data.
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add modules for the web application here.
const homeRoutes = require('./routes/home-about.js');
const viewRoutes = require('./routes/views.js');
const departmentRoutes = require('./routes/departments.js');
const patientRoutes = require('./routes/patients.js');
const providerRoutes = require('./routes/providers.js');
const treatmentRoutes = require('./routes/treatments.js');
const statisticsRoutes = require('./routes/statistics.js');

/* SECTION: INCLUDE ROUTE MODULES */ 

// Use the route modules via app.use() below.
// We use the database route in the other files.
app.use('/', homeRoutes);
app.use('/', viewRoutes);
app.use('/', departmentRoutes);
app.use('/', patientRoutes);
app.use('/', providerRoutes);
app.use('/', treatmentRoutes);
app.use('/', statisticsRoutes);

/* SECTION: LISTEN FOR SERVER REQUESTS */

// Create a variable for listening on a port
// for Heroku or on the localhost port 3000.
const port = process.env.PORT || 3000;

// Begin listening for server requests on port 3000.
app.listen(port, function() {
    console.log("Server for Mayo Clinic Patient Care Manager (PCM) Web App started on port 3000.");
});
