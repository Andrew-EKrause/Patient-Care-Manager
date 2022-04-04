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

//jshint esversion:6

/* SECTION: INSTALLED PACKAGES AND INITIALIZATION */

// Require packages for the server that were installed.
const express = require("express");
var path = require("path");
const flash = require("connect-flash");
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
var bodyParser = require('body-parser');
const { appendFile } = require("fs");
var createError = require('http-errors');

// Create web app using express. Set view engine to EJS
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

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
// --> WE NEED TO USE THE DATABASE ROUTE IN THE OTHER FILES
app.use('/', homeRoutes);
app.use('/', viewRoutes);
app.use('/', departmentRoutes);
app.use('/', patientRoutes);
app.use('/', providerRoutes);
app.use('/', treatmentRoutes);
app.use('/', statisticsRoutes);

/* SECTION: LISTEN FOR SERVER REQUESTS */

// Begin listening for server requests on port 3000.
app.listen(3000, function(){
    console.log("Server for Mayo Clinic Patient Care Manager (PCM) Web App started on port 3000.");
});
