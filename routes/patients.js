/**
 * The patients.js file is a route module that
 * contains the routes for the patients in the 
 * database. The patients in the database can
 * be edited and removed. Other patient entities
 * can also be added to the database.
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// NOTES: 
// ============================================================================
// AFTER YOU FINISH YOUR THREE COMPLEX QUERIES, COME BACK HERE (AND MAYBE
// TO THE OTHER MAIN ENTITIES YOU CREATED) AND TRY TO DISPLAY THE TREATMENTS
// THAT EACH PATIENT IS RECEIVING. 

// THIS DATA WILL BE OBTAINED VIA A JOIN
// BETWEEN THE PATIENT AND TREATMENT TABLES. YOU WILL NEVER DISPLAY ANY OF
// THE TABLES THAT REPRESENT A RELATIONSHIP BETWEEN TWO OTHER TABLES IN 
// YOUR DATABASE. YOU WILL SIMPLY DISPLAY THE RESULT(S) OF THE QUERY THAT
// COMPLETES THE JOIN ON THE INTERFACE OF THE PATIENT PAGE. 

// IF CHANGES ARE
// MADE TO THE TREATMENTS LISTED FOR EACH PATIENT VIA THE "UPDATE" FEATURE,
// THEN APPLY THOSE CHANGES TO THE TABLE (NOT THE PATIENT TABLE) THAT 
// REPRESENTS THE RELATIONSHIP BETWEEN THE PATIENT TABLE AND THE TREATMENT
// TABLE.
// ============================================================================

// Add the packages that are required.
var express = require('express');
var patientRouter = express.Router();

// Include the database route in order to 
// work with the data in the patients table.
const database = require('./database.js');

/* SECTION: GET INFORMATION FROM SERVER (GET) */ 

// Creat a route to render the patients page.
// In this route, all of the data in the Patient
// table of the database is sent to be displayed 
// on the patients page of the website.
patientRouter.get("/patients", function(req, res, next) {

    // Create a query to SELECT all of the patients in
    // the Patient table.
    var sql = `SELECT * FROM PCM.Patient`;

    // Get all of the patients from the patients table. (YOU WILL
    // DISPLAY THIS ON THE PATEINTS VIEW PAGE AT SOME POINT!!!)
    database.query(sql, function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Otherwise, send the data to the
            // patients.ejs page in order to 
            // display that data.
            res.render("patients", {title: "Patient List", patientData: data});
        }
    });
});

// Creat a route to render the patient data that
// the user wants to edit on a separate page. If
// the user chooses to change any of the data, 
// this route will redirect to an update route
// that will commit the changes to the databases.
patientRouter.get("/edit_patient/:patientId", function(req, res){
 
    // Create a constant for storing the post ID so that it
    // can be retrieved from the database.
    const requestedPatientId = req.params.patientId;

    // Complete a query to obtain the patient that the
    // user wishes to edit from the Patient table.
    var sql = `SELECT * FROM PCM.Patient 
                WHERE PCM.Patient.PatientID = ?`;

    // Complete the query in the database and display the patient
    // data that the user wants to edit on a page for that patient.
    database.query(sql, [requestedPatientId], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Otherwise, send the data to the
            // patients.ejs page in order to 
            // allow the user to edit that data.
            res.render("edit_patient", {title: "Patient Edit", patientEdit: data});
        }
    });
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ------------ CRUD Operations for Patient ------------
// Create a post request for when the user wants to 
// create a new patient.
patientRouter.post("/new_patient", function(req, res){

    // ADD MORE...
});


// Create a post request for when the user wants to
// update a given patient.
patientRouter.post("/update_patient", function(req, res){

    // ================================================================
    // The function ensures that the date attributes are 
    // entered properly into the database if/when the user 
    // updates the data.
    function simplifyDateShorthand(eventDate) {

        // Check if the date being entered is undefined.
        // (This would indicate that the patient does
        // not have an end date)
        if(!eventDate) {
            return null;
        }

        // First split the event into the components that directly 
        // involve the numberical representations of a date. 
        var date = eventDate.toString().split(" "); 
    
        // Create variables for working with
        // the nubmers in the date variable.
        var getMonth = date[1];
        var month = "";
        var day = date[2];
        var year = date[3];
        var simplifiedDate = "";

        // --> DEBUGGING STATEMENTS; DELETE LATER!!!
        // console.log("DATE: " + date);
        // console.log("MONTH: " + getMonth);
        // console.log("DAY: " + day);
        // console.log("YEAR: " + year);  

        // Use a series of conditionals to determine 
        // what the name of the month is based on the 
        // numerical representation of it. 
        if(getMonth.localeCompare('Jan') == 0) { 
            month = '01';
        } else if(getMonth.localeCompare('Feb') == 0) {
            month = '02';
        } else if(getMonth.localeCompare('Mar') == 0) {
            month = '03'; 
        } else if(getMonth.localeCompare('Apr') == 0) {
            month = '04';
        } else if(getMonth.localeCompare('May') == 0) {
            month = '05';
        } else if(getMonth.localeCompare('Jun') == 0) {
            month = '06';
        } else if(getMonth.localeCompare('Jul') == 0) {
            month = '07'; 
        } else if(getMonth.localeCompare('Aug') == 0) { 
            month = '08'; 
        } else if(getMonth.localeCompare('Sep') == 0) {
            month = '09';
        } else if(getMonth.localeCompare('Oct') == 0) {
            month = '10';
        } else if(getMonth.localeCompare('Nov') == 0) {
            month = '11';
        } else if(getMonth.localeCompare('Dec') == 0) {
            month = '12';
        } else {
            month = 'ERROR';
        } 
    
        // Create the simplified date and return it.
        simplifiedDate = year + "-" + month + "-" + day;
        return simplifiedDate;
    }
    // ================================================================

    // Declare a variable for the patient identifier.
    var updatePatientID = req.body.defaultpatientid;

    // Declare variables for the values that will be passed into the
    // SQL update statement below. A series of conditionals before that
    // SQL update statement determine whether the variables will contain
    // values entered into the input or the default values.
    var patientFirstName = req.body.patientfirstname;
    var patientMiddleName = req.body.patientmiddlename;
    var patientLastName = req.body.patientlastname;
    var patientBirthdate = req.body.patientbirthdate; 
    var patientSex = req.body.patientsex;
    var patientHeight = req.body.patientheight;
    var patientWeight = req.body.patientweight;
    var patientDescription = req.body.patientdescription;
    var patientPhone = req.body.patientphone;
    var patientEmail = req.body.patientemail;
    var patientStartDate = req.body.patientstartdate;
    var patientEndDate = req.body.patientenddate;

    // Create a final variable to check if the "In Treatment"
    // checkbox was checked, which indicates that the patient
    // is still in treatment and does not have an end/discharge
    // date.
    var patientInTreatment = req.body.patientintreatment;

    // Include a series of conditionals to determine if any of
    // the default values need to be utilized in the process of
    // updating the patient in the database.
    if(!patientFirstName) {
        patientFirstName = req.body.defaultpatientfirstname.trim();
    }
    if(!patientMiddleName) {
        patientMiddleName = req.body.defaultpatientmiddlename.trim();
    }
    if(!patientLastName) {
        patientLastName = req.body.defaultpatientlastname.trim();
    }
    if(!patientBirthdate) {
        patientBirthdate = simplifyDateShorthand(req.body.defaultpatientbirthdate);
    } else {
        patientBirthdate = req.body.patientbirthdate.toString().split(" ");  
    }
    if(!patientSex || patientSex == "-") {
        patientSex = req.body.defaultpatientsex;
    }
    if(!patientHeight) {
        patientHeight = req.body.defaultpatientheight;
    }
    if(!patientWeight) {
        patientWeight = req.body.defaultpatientweight;
    }
    if(!patientDescription) {
        patientDescription = req.body.defaultpatientdescription.trim();
    }
    if(!patientPhone) {
        patientPhone = req.body.defaultpatientphone;
    }
    if(!patientEmail) {
        patientEmail = req.body.defaultpatientemail.trim();
    }
    if(!patientStartDate) {
        patientStartDate = simplifyDateShorthand(req.body.defaultpatientstartdate);
    } else {
        patientStartDate = req.body.patientstartdate.toString().split(" ");  
    }
    if(!patientEndDate) {
        patientEndDate = simplifyDateShorthand(req.body.defaultpatientenddate);
    } else {
        patientEndDate = req.body.patientenddate.toString().split(" ");  
    }
    if(patientInTreatment) {
        patientEndDate = null;  
    }

    // Include the SQL query that will update the patient entity
    // in the patient table.
    var sql = `UPDATE PCM.Patient 
                SET PatientNotes = ?, PatientFirstName = ?, PatientMiddleName = ?, PatientLastName = ?, PatientBirthdate = ?, PatientSex = ?, PatientWeight = ?, PatientPhone = ?, PatientEmail = ?, PatientHeight = ?, PatientStartDate = ?, PatientEndDate = ?
               WHERE PatientID = ?;`;

    // Complete the query in the database and display the patient
    // data that the user wants to edit on a page for that patient.
    database.query(sql, [patientDescription, 
                         patientFirstName, 
                         patientMiddleName, 
                         patientLastName, 
                         patientBirthdate, 
                         patientSex, 
                         patientWeight, 
                         patientPhone, 
                         patientEmail, 
                         patientHeight, 
                         patientStartDate, 
                         patientEndDate, 
                         updatePatientID], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {
            
            // Redirect the route back to the main patients page.
            // --> MAYBE LATER INCLUDE A FLASH MESSAGE TO INDICATE
            // --> THAT THE PATIENT WAS SUCCESSFULLY UPDATED!!!
            res.redirect("/patients");
        }
    });
});












// Create a post request for when the user wants to
// remove a given patient.
patientRouter.post("/remove_patient", function(req, res){

    // ADD MORE...YOU NEED TO REMOVE THE PATIENT THAT MATCHES
    // THE IDENTIFIER THAT IS OBTAINED THROUGH THIS ROUTE. ALSO,
    // YOU WILL WANT TO ADD A CONFIRM DELETE FEATURE AT SOME 
    // POINT THAT ASKS THE USER IF THEY ARE SURE THAT THEY
    // WANT TO REMOVE THE PATIENT ENTITY.

    var removePatient = req.body.patientidentifier;
    console.log(removePatient);
});

// Export the module for use in the main app.js file.
module.exports = patientRouter;
