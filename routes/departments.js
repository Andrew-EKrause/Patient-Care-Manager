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

// Include flash message and session packages.
const flash = require("connect-flash");
const session = require('express-session');

// Use the flash module to transmit messages
// to the user as well as the developers.
departmentRouter.use(flash());

// The code for SESSIONS is set up here.
// The SESSIONS need to be set up in order
// to use flash messages.
departmentRouter.use(session({
    secret: "Confidential information.",
    resave: false,
    saveUninitialized: false
}));

// Use the flash module to transmit messages
// to the user as well as the developers.
departmentRouter.use(flash());

// Include the database route in order to work
// with the data in the departments table.
const database = require('./database.js');

/* SECTION: GET INFORMATION FROM SERVER (GET) */ 

// Creat a route to render the departments page.
// In this route, all of the data in the Department
// table of the database is sent to be displayed 
// on the treatments page of the website.
departmentRouter.get("/departments", function(req, res, next) {

    // Create a query to SELECT all of the departments in
    // the Department table.
    var sql = `SELECT * FROM PCM.Department`;

    // Get all of the departments from the departments table.
    database.query(sql, function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Otherwise, send the data to the
            // departments.ejs page in order to 
            // display that data.
            res.render("departments", {
                title: "Department List", 
                departmentData: data,
                departmentChange: req.flash("departmentChange")
            });
        }
    });
});

// Creat a route to render the department data that
// the user wants to edit on a separate page. If
// the user chooses to change any of the data, 
// this route will redirect to an update route
// that will commit the changes to the databases.
departmentRouter.get("/department-edit/:departmentId", function(req, res) {

    // Create a constant for storing the post ID so that it
    // can be retrieved from the database.
    const requestedDepartmentId = req.params.departmentId;

    // Complete a query to obtain the department that the
    // user wishes to edit from the Department table.
    var sql = `SELECT * FROM PCM.Department 
                WHERE PCM.Department.DepartmentID = ?`;

    // Complete the query in the database and display the department
    // data that the user wants to edit on a page for that department.
    database.query(sql, [requestedDepartmentId], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Otherwise, send the data to the
            // department_edit.ejs page in order to 
            // allow the user to edit that data.
            res.render("department-edit", {title: "Department Edit", departmentEdit: data});
        }
    });
});

// Create a get request for when the user wants to 
// create a new department.
departmentRouter.get("/department-new", function(req, res) {

    // Render the "department_new" page to allow the user to 
    // create a new department entity and add it to the database.
    res.render("department-new");
});















/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ------------ CRUD Operations for Department ------------
// Create a post request for when the user wants to 
// create a new department. The department that is created 
// by the user is added to the department table of the
// database.
departmentRouter.post("/department-add", function(req, res) {

    // --> LEFT OFF RIGHT HERE!!!!
    
    // Declare a variable for the treatment identifier.
    // var TreatmentID = null; // --> DO NOT THINK WE NEED THIS!!!

    // Declare variables for the values that will be passed into the
    // SQL update statement below. A series of conditionals before that
    // SQL update statement determine whether the variables will contain
    // values entered into the input or the default values.
    var treatmentName = req.body.treatmentname.trim();
    var treatmentRequirements = req.body.treatmentrequirements.trim();
    var treatmentDescription = req.body.treatmentdescription.trim();
    var treatmentRiskIndex = req.body.treatmentriskindex; 
    var treatmentTools = req.body.treatmenttools.trim();

    // Include the SQL query that will add the treatment entity
    // to the treatment table.
    var sql = `INSERT INTO PCM.Treatment (TreatmentName, 
                                          TreatmentRequirements, 
                                          TreatmentDescription, 
                                          TreatmentRiskIndex, 
                                          TreatmentTools) VALUES (?, ?, ?, ?, ?);`;

    // Complete the query in the database and add the treatment
    // data entered by the user into the treatment table of the
    // database.
    database.query(sql, [treatmentName, 
                         treatmentRequirements, 
                         treatmentDescription, 
                         treatmentRiskIndex, 
                         treatmentTools], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {
            
            // Redirect the route back to the main treatments page
            // after adding the treatment to the database.
            // Add a flash message indicating that the treatment was
            // successfully added to the database.
            req.flash("treatmentChange", "Treatment created.");
            res.redirect("/treatments");
        }
    });
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
