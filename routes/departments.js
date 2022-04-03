/**
 * The department.js file is a route module 
 * that contains the routes for the departments
 * in the database. The departments in the database
 * can be edited and removed. Other department
 * entities can also be added to the database.
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// Add the packages that are required.
var express = require('express');
var departmentRouter = express.Router();

// Include the database route in order to work
// with the data in the departments table.
const database = require('./database.js');

/* SECTION: GET INFORMATION FROM SERVER (GET) */ 

// Creat a route to render the departments page.
departmentRouter.get("/departments", function(req, res) {

    // Render the departments page.
    res.render("departments");
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ------------ CRUD Operations for Department ------------
// Create a post request for when the user wants to 
// create a new department.
departmentRouter.post("/new_department", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// update a given department.
departmentRouter.post("/update_department", function(req, res){

    // ADD MORE...
});

// Create a post request for when the user wants to
// remove a given department.
departmentRouter.post("/remove_department", function(req, res){

    // ADD MORE...
});

// Export the module for use in the main app.js file.
module.exports = departmentRouter;
