/**
 * The database.js file is a route module 
 * that contains code needed to connect to
 * the SQL database containing the structure
 * and information for the Patient Care Manager
 * project. This file is the setup portion of
 * the project where the existing database is
 * connected to the frontend through the use
 * of SQL, node/npm packages, and APIs.
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// Add the packages that are required.
//const { application } = require('express');
const bodyParser = require('body-parser');
const { application } = require('express');
var express = require('express');
var databaseRouter = express.Router();

// Add packages for the database here.
const mysql = require("mysql");

// Establish connection parameters for your database.
// --> CAN ALSO CREATE A CONNCECTION POOL IF NEED BE
// --> TO LIMIT THE NUMBER OF REQUESTS MADE PER SECOND.
// --> LOOK UP HOW TO DO THIS IF YOU NEED TO!!!
const connection = mysql.createConnection({

    // Database properties.
    // --> KEEP IN MIND THAT THINGS WILL CHANGE WHEN 
    // --> YOU PUBLISH THE SITE TO HEROKU!!!
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'PCM',
    waitForConnection: true,
    insecureAuth: true
});

// Connect with the Patient Care Manager (PCM) database.
connection.connect(function(error) {

    // If there is an error, log the error.
    if(error) {
        console.log(error.message);
    }

    // Otherwise, indicate a successfull
    // connection.
    console.log("Connection to PCM DB successfull!");
});

// Query the database that exists in your phpmyadmin service.
databaseRouter.get("/test-route", function(req, res) {

    // Create a connection query.
    connection.query("SELECT * FROM PCM", function(error, rows, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log("Error in query.");
            console.log(error);

        // Otherwise, show that the query was sucessfull.
        } else {
            console.log("Success!");
        }
    });
});


// Close the connection in this function.
// connection.end(function(req, res) {
//     // The connection is closed.
// });

// --> HOW YOU WOULD QUERY SOMETHING FROM THE DATABASE.
// databaseRouter.get("/", function(req, res) {
//     connection.query("SELECT * FROM Patient", function(error, rows, fields) {
//         if(error) {
//             console.log("Error in the query.");
//         } else {
//             console.log("POOP");
//         }
//     });
// });

// var connection = mysql.createConnection({
//     host: 'localhost', // Replace with your host name
//     user: 'root',      // Replace with your database username
//     password: '',      // Replace with your database password
//     database: 'PCM.db' // // Replace with your database Name
// }); 
 
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });
// module.exports = connection;

// databaseRouter.listen(1337, function(){
//     console.log("POOP.");
// });

// Export the module for use in the main app.js file.
module.exports = databaseRouter;
