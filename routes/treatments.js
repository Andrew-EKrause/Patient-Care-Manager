/**
 * The treatments.js file is a route module that
 * contains the routes for the treatments in the 
 * database. The treatments in the database can
 * be edited and removed. Other treatment entities
 * can also be added to the database.
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// Add the packages that are required.
var express = require('express');
var treatmentRouter = express.Router();

// Include flash message and session packages.
const flash = require("connect-flash");
const session = require('express-session');

// Use the flash module to transmit messages
// to the user as well as the developers.
treatmentRouter.use(flash());

// The code for SESSIONS is set up here.
// The SESSIONS need to be set up in order
// to use flash messages.
treatmentRouter.use(session({
    secret: "Confidential information.",
    resave: false,
    saveUninitialized: false
}));

// Use the flash module to transmit messages
// to the user as well as the developers.
treatmentRouter.use(flash());

// Include the database route in order to 
// work with the data in the treatments table.
const database = require('./database.js');

/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Creat a route to render the treatments page.
// In this route, all of the data in the Treatment
// table of the database is sent to be displayed 
// on the treatments page of the website.
treatmentRouter.get("/treatments", function(req, res, next) {

    // Create a query to SELECT all of the treatments in
    // the Treatment table.
    var sql = `SELECT * FROM PCM.Treatment`;

    // Get all of the treatments from the treatments table.
    database.query(sql, function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Otherwise, send the data to the
            // treatments.ejs page in order to 
            // display that data.
            res.render("treatments", {
                title: "Treatment List", 
                treatmentData: data,
                treatmentChange: req.flash("treatmentChange")
            });
        }
    });
});

// Creat a route to render the treatment data that
// the user wants to edit on a separate page. If
// the user chooses to change any of the data, 
// this route will redirect to an update route
// that will commit the changes to the databases.
treatmentRouter.get("/treatment-edit/:treatmentId", function(req, res) {

    // Create a constant for storing the post ID so that it
    // can be retrieved from the database.
    const requestedTreatmentId = req.params.treatmentId;

    // Complete a query to obtain the treatment that the
    // user wishes to edit from the Treatment table.
    var sql = `SELECT * FROM PCM.Treatment 
                WHERE PCM.Treatment.TreatmentID = ?`;

    // Complete the query in the database and display the treatment
    // data that the user wants to edit on a page for that treatment.
    database.query(sql, [requestedTreatmentId], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Otherwise, send the data to the
            // treatment_edit.ejs page in order to 
            // allow the user to edit that data.
            res.render("treatment-edit", {title: "Treatment Edit", treatmentEdit: data});
        }
    });
});

// Create a get request for when the user wants to 
// create a new treatment.
treatmentRouter.get("/treatment-new", function(req, res) {

    // Render the "treatment_new" page to allow the user to 
    // create a new treatment entity and add it to the database.
    res.render("treatment-new");
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ------------ CRUD Operations for Treatment ------------
// Create a post request for when the user wants to 
// create a new treatment. The treatment that is created 
// by the user is added to the treatment table of the
// database.
treatmentRouter.post("/treatment-add", function(req, res) {

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
// update a given treatment.
treatmentRouter.post("/treatment-update", function(req, res) {

    // Declare a variable for the treatment identifier.
    var updateTreatmentID = req.body.defaulttreatmentid;

    // Declare variables for the values that will be passed into the
    // SQL update statement below. A series of conditionals before that
    // SQL update statement determine whether the variables will contain
    // values entered into the input or the default values.
    var treatmentName = req.body.treatmentname.trim();
    var treatmentRequirements = req.body.treatmentrequirements.trim();
    var treatmentDescription = req.body.treatmentdescription.trim();
    var treatmentRiskIndex = req.body.treatmentriskindex; 
    var treatmentTools = req.body.treatmenttools.trim();

    // Include a series of conditionals to determine if any of
    // the default values need to be utilized in the process of
    // updating the treatment in the database.
    if(!treatmentName) {
        treatmentName = req.body.defaulttreatmentname.trim();
    }
    if(!treatmentRequirements) {
        treatmentRequirements = req.body.defaulttreatmentrequirements.trim();
    }
    if(!treatmentDescription) {
        treatmentDescription = req.body.defaulttreatmentdescription.trim();
    }
    if(!treatmentRiskIndex) {
        treatmentRiskIndex = req.body.defaulttreatmentriskindex;
    }
    if(!treatmentTools) {
        treatmentTools = req.body.defaulttreatmenttools.trim();
    }

    // Include the SQL query that will update the
    // treatment entity in the treatment table.
    var sql = `UPDATE PCM.Treatment 
                SET TreatmentName = ?, TreatmentRequirements = ?, TreatmentDescription = ?, TreatmentRiskIndex = ?, TreatmentTools = ?
               WHERE TreatmentID = ?;`;

    // Complete the query in the database and display the treatment
    // data that the user wants to edit on a page for that treatment.
    database.query(sql, [treatmentName, 
                         treatmentRequirements, 
                         treatmentDescription, 
                         treatmentRiskIndex, 
                         treatmentTools, 
                         updateTreatmentID], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {
            
            // Redirect the route back to the main treatments page.
            // Add a flash message indicating that the treatment was
            // successfully updated in the database.
            req.flash("treatmentChange", "Treatment updated.");
            res.redirect("/treatments");
        }
    });
});

// Create a post request for when the user wants to
// remove a given treatment.
treatmentRouter.post("/treatment-remove", function(req, res) {

    // Obtain the treatment identifier of the treatment that
    // the user wants to remove from the database, and 
    // store the treatment ID in a variable.
    var removeTreatment = req.body.treatmentidentifier;

    // Include the SQL query that will remove the selected treatment
    // entity from the treatment table in the database.
    var sql = `DELETE FROM PCM.Treatment WHERE TreatmentID = ?;`;

    // Complete the query in the database and remove the
    // treatment that the user selected from the database. 
    database.query(sql, [removeTreatment], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Redirect the route back to the main treatments page.
            // Add a flash message indicating that the treatment was
            // successfully removed from the database.
            req.flash("treatmentChange", "Treatment removed.");
            res.redirect("/treatments");
        }
    });
});

// Export the module for use in the main app.js file.
module.exports = treatmentRouter;
