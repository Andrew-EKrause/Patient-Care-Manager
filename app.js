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

// Add packages for the database here.
var mysql = require('mysql'); // --> MAY NOT NEED!!!
// var connection  = require('./lib/db'); // --> I THINK THIS GOES TO A FOLDER CALLED lib THAT CONTAINS A FILE CALLED 'db'.

// var indexRouter = require('./routes/index'); // --> THIS GOES TO A FOLDER CALLED routes THAT CONTAINS A FILE CALLED 'index'.
// var usersRouter = require('./routes/users'); // --> THIS GOES TO A FOLDER CALLED routes THAT CONTAINS A FILE CALLED 'users'.

// Create web app using express. Set view engine to EJS
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Add modules for the web application here.
const databaseRoutes = require('./routes/database'); // --> THINK YOU ONLY NEED TO REQUIRE THIS IN THE FILES THAT INTERACT WITH THE DB!!!
const homeRoutes = require('./routes/home-about.js');
const viewRoutes = require('./routes/views.js');
const departmentRoutes = require('./routes/departments.js');
const patientRoutes = require('./routes/patients.js');
const providerRoutes = require('./routes/providers.js');
const treatmentRoutes = require('./routes/treatments.js');
const statisticsRoutes = require('./routes/statistics.js');

/* SECTION: OTHER PACKAGES AND SETUP */

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({ 
//     secret: '123456cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
// }))
 
// app.use(flash());
// app.use(expressValidator());

// app.use('/', indexRouter);
// app.use('/list', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
// next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
// // set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get('env') === 'development' ? err : {};
// // render the error page
// res.status(err.status || 500);
// res.render('error');
// });
// module.exports = app;

/* SECTION: INCLUDE ROUTE MODULES */ 

// Use the route modules via app.use() below.
// --> DO WE NEED TO USE THE DATABASE ROUTE HERE OR IN OTHER FILES???
app.use('/', homeRoutes); // --> MAYBE ADD /pcm LATER ON...
app.use('/', databaseRoutes);
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
