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
// on the departments page of the website.
departmentRouter.get("/departments", function(req, res, next) {

    // Create a query to SELECT all of the departments in
    // the Department table.
    var selectDepartmentSQL = `SELECT * FROM Department`;

    // Create a query to SELECT all of the relationships between
    // departments and providers represented in the Part_Of table.
    var selectDepartmentProviderJoinSQL = `SELECT * FROM Part_Of`;

    // Create a query to SELECT all of the providers in
    // the Provider table.
    var selectProvidersSQL = `SELECT * FROM Provider`;

    // Execute the first query to get all of the departments from 
    // the department table of the database. Next, execute the
    // second query and get all of the items in the "Part_Of" table
    // of the database. Lastly, execute the third query and obtain
    // all of the providers in the database.
    database.query(selectDepartmentSQL, function(error, departmentData, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // Otherwise, execute the second query
        // and obtain all of the items in the
        // "Part_Of" table of the database.
        } else {

            // Execute the second query and obtain all of the
            // items in the "Part_Of" table of the database.
            database.query(selectDepartmentProviderJoinSQL, function(error, departmentProviderJoinData, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);
        
                // Otherwise, execute the third query
                // and obtain all of the items in the
                // Provider table of the database.
                } else {
        
                    // Execute the third query and obtain all of the
                    // providers in the Provider table of the database.
                    database.query(selectProvidersSQL, function(error, providerData, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);
                
                        // Otherwise, execute the third query
                        // and obtain all of the items in the
                        // Provider table of the database.
                        } else {
                
                            // Otherwise, send the data to the
                            // departments.ejs page in order to 
                            // display that data.
                            res.render("departments", {
                                title: "Department List", 
                                departmentData: departmentData,
                                departmentProviderJoinData: departmentProviderJoinData,
                                providerData: providerData,
                                departmentChange: req.flash("departmentChange")
                            });
                        }
                    });
                }
            });
        }
    });
});

// Creat a route to render the department data that
// the user wants to edit on a separate page. If
// the user chooses to change any of the data, 
// this route will redirect to an update route
// that will commit the changes to the database.
departmentRouter.get("/department-edit/:departmentId", function(req, res) {

    // Create a constant for storing the post ID so that it
    // can be retrieved from the database.
    const requestedDepartmentId = req.params.departmentId;

    // Complete a query to obtain the department that the
    // user wishes to edit from the Department table.
    var sql = `SELECT * FROM Department 
                WHERE Department.DepartmentID = ?`;

    // Complete the query in the database and display the department
    // data that the user wants to edit on a page for that department.
    database.query(sql, [requestedDepartmentId], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Otherwise, send the data to the
            // department-edit.ejs page in order to 
            // allow the user to edit that data.
            res.render("department-edit", {title: "Department Edit", departmentEdit: data});
        }
    });
});

// Create a get request for when the user wants to 
// create a new department.
departmentRouter.get("/department-new", function(req, res) {

    // Render the "department-new" page to allow the user to 
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
    
    // Declare a variable for the department identifier.
    // var DepartmentID = null; // --> DO NOT THINK WE NEED THIS!!!

    // Declare variables for the values that will be passed into the
    // SQL update statement below. A series of conditionals before that
    // SQL update statement determine whether the variables will contain
    // values entered into the input or the default values.
    var departmentName = req.body.departmentname.trim();
    var departmentLocation = req.body.departmentlocation.trim();
    var departmentDescription = req.body.departmentdescription.trim(); 

    // Include the SQL query that will add the department entity
    // to the department table.
    var sql = `INSERT INTO Department (DepartmentName, 
                                       DepartmentLocation, 
                                       DepartmentDescription) VALUES (?, ?, ?);`;

    // Complete the query in the database and add the department
    // data entered by the user into the department table of the
    // database.
    database.query(sql, [departmentName, 
                         departmentLocation, 
                         departmentDescription], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {
            
            // Redirect the route back to the main departments page
            // after adding the department to the database.
            // Add a flash message indicating that the department was
            // successfully added to the database.
            req.flash("departmentChange", "Department created.");
            res.redirect("/departments");
        }
    });
});

// Create a post request for when the user wants to
// update a given department.
departmentRouter.post("/department-update", function(req, res) {

    // Declare a variable for the department identifier.
    var updateDepartmentID = req.body.defaultdepartmentid;

    // Declare variables for the values that will be passed into the
    // SQL update statement below. A series of conditionals before that
    // SQL update statement determine whether the variables will contain
    // values entered into the input or the default values.
    var departmentName = req.body.departmentname.trim();
    var departmentLocation = req.body.departmentlocation.trim();
    var departmentDescription = req.body.departmentdescription.trim(); 

    // Include a series of conditionals to determine if any of
    // the default values need to be utilized in the process of
    // updating the department in the database.
    if(!departmentName) {
        departmentName = req.body.defaultdepartmentname.trim();
    }
    if(!departmentLocation) {
        departmentLocation = req.body.defaultdepartmentlocation.trim();
    }
    if(!departmentDescription) {
        departmentDescription = req.body.defaultdepartmentdescription.trim();
    }

    // Include the SQL query that will update the
    // department entity in the department table.
    var sql = `UPDATE Department 
                SET DepartmentName = ?, DepartmentLocation = ?, DepartmentDescription = ?
               WHERE DepartmentID = ?;`;

    // Complete the query in the database and display the department
    // data that the user wants to edit on a page for that department.
    database.query(sql, [departmentName, 
                         departmentLocation, 
                         departmentDescription,
                         updateDepartmentID], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {
            
            // Redirect the route back to the main departments page.
            // Add a flash message indicating that the department was
            // successfully updated in the database.
            req.flash("departmentChange", "Department updated.");
            res.redirect("/departments");
        }
    });
});

// Create a post request for when the user
// wants to remove a given department.
departmentRouter.post("/department-remove", function(req, res) {

    // Obtain the department identifier of the department that
    // the user wants to remove from the database, and 
    // store the department ID in a variable.
    var removeDepartment = req.body.departmentidentifier;

    // Include a SQL query that will remove the selected 
    // department entity from the "Part_Of" relationship
    // table in the database.
    var removeDepartmentJoin = `DELETE FROM Part_Of WHERE Part_DepartmentID = ?;`;

    // Include the SQL query that will remove the selected department
    // entity from the department table in the database.
    var removeDepartmentSQL = `DELETE FROM Department WHERE DepartmentID = ?;`;

    // Complete the first query in the database and remove the department
    // that the user selected from the "Part_Of" join relationship. Then
    // complete the second query in the database and remove the department
    // that the user selected from the "Department" table.
    database.query(removeDepartmentJoin, [removeDepartment], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // If there are no errors, then complete the second query.
        } else {

            // The second query removes the department entity that
            // the user selected from the "Department" table.
            database.query(removeDepartmentSQL, [removeDepartment], function(error, data, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);

                // Complete the final actions below.
                } else {

                    // Redirect the route back to the main departments page.
                    // Add a flash message indicating that the department was
                    // successfully removed from the database.
                    req.flash("departmentChange", "Department removed.");
                    res.redirect("/departments");
                }
            });
        }
    });
});

// Export the module for use in the main app.js file.
module.exports = departmentRouter;
