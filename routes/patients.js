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

// Add the router packages that are required.
var express = require('express');
var patientRouter = express.Router();

// Include flash message and session packages.
const flash = require("connect-flash");
const session = require('express-session');

// Use the flash module to transmit messages
// to the user as well as the developers.
patientRouter.use(flash());

// The code for SESSIONS is set up here.
// The SESSIONS need to be set up in order
// to use flash messages.
patientRouter.use(session({
    secret: "Confidential information.",
    resave: false,
    saveUninitialized: false
}));

// Use the flash module to transmit messages
// to the user as well as the developers.
patientRouter.use(flash());

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
    var selectPatientsSQL = `SELECT * FROM Patient`;

    // Create a query to SELECT all of the relationships between
    // patients and providers represented in the Cares_For table.
    var selectPatientProviderJoinSQL = `SELECT * FROM Cares_For`;

    // Create a query to SELECT all of the providers in
    // the Provider table.
    var selectProvidersSQL = `SELECT * FROM Provider`;

    // Create a query to SELECT all of the relationships between
    // patients and treatments represented in the Receives_Treatment
    // table.
    var selectPatientTreatmentJoinSQL = `SELECT * FROM Receives_Treatment`;

    // Create a query to SELECT all of the treatments in
    // the Treatment table.
    var selectTreatmentsSQL = `SELECT * FROM Treatment`;

    // Get all of the patients from the Patients table.
    database.query(selectPatientsSQL, function(error, patientData, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // Otherwise, execute the second query to
        // obtain the items in the Cares_For table
        // in the database.
        } else {

            // Get all of the items from the Cares_For table.
            database.query(selectPatientProviderJoinSQL, function(error, patientProviderJoinData, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);

                // Otherwise, execute the third query to
                // obtain the Providers in the database.
                } else {

                    // Get all of the providers from the Providers table.
                    database.query(selectProvidersSQL, function(error, providerData, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // Otherwise, execute the fourth query to
                        // obtain the items in the Receives_Treatment
                        // in the database.
                        } else {

                            // Get all of the items from the Receives_Treatment table.
                            database.query(selectPatientTreatmentJoinSQL, function(error, patientTreatmentJoinData, fields) {

                                // If there is an error, log the error.
                                if(error) {
                                    console.log(error);

                                // Otherwise, execute the fifth query to
                                // obtain the Treatments in the database.
                                } else {

                                    // Get all of the treatments from the Treatments table.
                                    database.query(selectTreatmentsSQL, function(error, treatmentData, fields) {

                                        // If there is an error, log the error.
                                        if(error) {
                                            console.log(error);

                                        // Otherwise, display the patients.ejs page.
                                        } else {

                                            // Otherwise, send the data to the
                                            // patients.ejs page in order to 
                                            // display that data.
                                            res.render("patients", {
                                                title: "Patient List", 
                                                patientData: patientData,
                                                patientProviderJoinData: patientProviderJoinData,
                                                providerData: providerData,
                                                patientTreatmentJoinData: patientTreatmentJoinData,
                                                treatmentData: treatmentData,
                                                patientChange: req.flash("patientChange")
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

// Creat a route to render the patient data that
// the user wants to edit on a separate page. If
// the user chooses to change any of the data, 
// this route will redirect to an update route
// that will commit the changes to the database.
patientRouter.get("/patient-edit/:patientId", function(req, res) {

    // Create a constant for storing the post ID so that it
    // can be retrieved from the database.
    const requestedPatientId = req.params.patientId;

    // Complete a query to obtain the patient that the
    // user wishes to edit from the Patient table.
    var selectPatientSQL = `SELECT * FROM Patient 
                                WHERE Patient.PatientID = ?`;

    // Create a query to SELECT all of the relationships between
    // patients and providers represented in the Cares_For table.
    // The relationships will be filtered out on the "patient-edit"
    // page to display providers that the patient was assigned.
    var selectPatientProviderJoinSQL = `SELECT * FROM Cares_For`;

    // Create a query to SELECT all of the providers in
    // the Provider table. The providers will be filtered
    // out on the "patient-edit" page as well.
    var selectProvidersSQL = `SELECT * FROM Provider`;

    // Create a query to SELECT all of the relationships between
    // patients and treatments represented in the Receives_Treatment
    // table. The relationships will be filtered out on the "patient-edit"
    // page to display treatments that the patient was assigned.
    var selectPatientTreatmentJoinSQL = `SELECT * FROM Receives_Treatment`;

    // Create a query to SELECT all of the treatments in
    // the Treatment table. The treatments will be filtered
    // out on the "patient-edit" page as well.
    var selectTreatmentsSQL = `SELECT * FROM Treatment`;

    // Complete the query in the database and display the patient
    // data that the user wants to edit on a page for that patient.
    // Also obtain all of the data associated with the given patient
    // through the join relationships.
    database.query(selectPatientSQL, [requestedPatientId], function(error, patientEditData, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // Otherwise, execute the second query to
        // obtain the items in the Cares_For table
        // in the database.
        } else {

            // Get all of the items from the Cares_For table.
            database.query(selectPatientProviderJoinSQL, function(error, patientProviderJoinEditData, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);

                // Otherwise, execute the third query to
                // obtain the Providers in the database.
                } else {

                    // Get all of the providers from the Providers table.
                    database.query(selectProvidersSQL, function(error, providerEditData, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // Otherwise, execute the fourth query to
                        // obtain the items in the Receives_Treatment
                        // table in the database.
                        } else {

                            // Get all of the items from the Receives_Treatment table.
                            database.query(selectPatientTreatmentJoinSQL, function(error, patientTreatmentJoinEditData, fields) {

                                // If there is an error, log the error.
                                if(error) {
                                    console.log(error);

                                // Otherwise, execute the fifth query to
                                // obtain the Treatments in the database.
                                } else {

                                    // Get all of the treatments from the Treatments table.
                                    database.query(selectTreatmentsSQL, function(error, treatmentEditData, fields) {

                                        // If there is an error, log the error.
                                        if(error) {
                                            console.log(error);

                                        // Otherwise, display the patient-edit.ejs page.
                                        } else {

                                            // Otherwise, send the data to the
                                            // patient-edit.ejs page in order to 
                                            // allow the user to edit that data.
                                            res.render("patient-edit", {
                                                title: "Patient Edit", 
                                                patientEditData: patientEditData,
                                                patientProviderJoinEditData: patientProviderJoinEditData,
                                                providerEditData: providerEditData,
                                                patientTreatmentJoinEditData: patientTreatmentJoinEditData,
                                                treatmentEditData: treatmentEditData,
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

// Create a get request for when the user wants to 
// create a new patient.
patientRouter.get("/patient-new", function(req, res) {

    // Complete the two queries to obtain the providers and treatments
    // that the patient can be joined with in the database.
    var providerQuerySQL = `SELECT Provider.ProviderID, Provider.ProviderFirstName, Provider.ProviderMiddleName, Provider.ProviderLastName, Provider.ProviderTitle FROM Provider`;
    var treatmentQuerySQL = `SELECT Treatment.TreatmentID, Treatment.TreatmentName FROM Treatment`;

    // Complete the queries in the database and display the patient-new.ejs
    // page on the website so that the user can create a new patient. Execute
    // the first query to obtain all of the providers in the database.
    database.query(providerQuerySQL, function(error, patientEditProvider, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // If there are no errors, execute the second query.
        } else {

            // Complete the queries in the database and display the patient-new.ejs
            // page on the website so that the user can create a new patient. Execute
            // the second query to obtain all of the treatments in the database.
            database.query(treatmentQuerySQL, function(error, patientEditTreatment, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);

                // If there are no errors, display the 
                // patient-new.ejs page to create a new 
                // patient for the website.
                } else {

                    // Render the "patient-new" page to allow the user to 
                    // create a new patient entity and add it to the database.
                    res.render("patient-new", {
                        title: "Patient New", 
                        patientEditProvider: patientEditProvider, 
                        patientEditTreatment: patientEditTreatment
                    });
                }
            });
        }
    });
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ------------ CRUD Operations for Patient ------------
// Create a post request for when the user wants to 
// create a new patient. The patient that is created 
// by the user is added to the patient table of the
// database.
patientRouter.post("/patient-add", function(req, res) {

    // Declare a variable for the patient identifier.
    // var updatePatientID = null; // --> DO NOT THINK WE NEED THIS!!!

    // Declare variables for the values that will be passed into the
    // SQL update statement below. A series of conditionals before that
    // SQL update statement determine whether the variables will contain
    // values entered into the input or the default values.
    var patientFirstName = req.body.patientfirstname.trim();
    var patientMiddleName = req.body.patientmiddlename.trim();
    var patientLastName = req.body.patientlastname.trim();
    var patientBirthdate = req.body.patientbirthdate.toString().split(" "); 
    var patientSex = req.body.patientsex;
    var patientHeight = req.body.patientheight;
    var patientWeight = req.body.patientweight;
    var patientRiskIndex = req.body.patientriskindex;
    var patientDescription = req.body.patientdescription;
    var patientPhone = req.body.patientphone;
    var patientEmail = req.body.patientemail.trim();
    var patientStartDate = req.body.patientstartdate.toString().split(" "); 
    var patientEndDate; // We do not assign this variable a value immediately.

    // Create a final variable to check if the "In Treatment"
    // checkbox was checked, which indicates that the patient
    // is currently in treatment and does not have an end date.
    var patientInTreatment = req.body.patientintreatment;

    // If the user selects the checkbox, the end date is null.
    if(patientInTreatment) {
        patientEndDate = null;  

    // If the user does not select the checkbox or the end
    // date, default to null.
    } else if(!patientInTreatment && !patientEndDate) {
        patientEndDate = null;  

    // Otherwise, get the patient end date from the body.
    } else {
        patientEndDate = req.body.patientenddate.toString().split(" ");
    }

    // If the user has not selected an option for
    // the patient's sex, default to "Other".
    if(patientSex == "-") {
        patientSex = "Other";
    }

    // Include the SQL query that will add the patient entity
    // to the patient table.
    var addPatientSQL = `INSERT INTO Patient (PatientNotes, 
                                    PatientFirstName, 
                                    PatientMiddleName, 
                                    PatientLastName, 
                                    PatientBirthdate, 
                                    PatientSex, 
                                    PatientWeight, 
                                    PatientRiskIndex,
                                    PatientPhone, 
                                    PatientEmail, 
                                    PatientHeight,
                                    PatientStartDate,
                                    PatientEndDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    // Complete the query in the database and add the patient
    // data entered by the user into the patient table of the
    // database.
    database.query(addPatientSQL, [patientDescription, 
                         patientFirstName, 
                         patientMiddleName, 
                         patientLastName, 
                         patientBirthdate, 
                         patientSex, 
                         patientWeight, 
                         patientRiskIndex,
                         patientPhone, 
                         patientEmail, 
                         patientHeight, 
                         patientStartDate, 
                         patientEndDate], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // Otherwise, complete the actions below.
        } else {

            // ===============================================================================
            // THIS SECTION WITHIN THE "patient-add" ROUTE IS FOR PROVIDER AND TREATMENT JOINS
            // ===============================================================================

            // Create a variable for storing the query that will
            // add the patient ID to the "Cares_For" table and
            // the "Receives_Treatment" table along with any
            // provider and/or treatment IDs.
            var patientIDSQL = `SELECT Patient.PatientID FROM Patient
                                ORDER BY Patient.PatientID DESC
                                LIMIT 1;`;

            // Execute the query listed above in order to obtain the 
            // identifier of the patient that was just inserted into
            // the database. This is used for adding the patient along
            // with any providers and/or treatments to their respective
            // tables.
            database.query(patientIDSQL, function(error, patientIdData, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);

                // Otherwise, complete the JOIN operations below.
                } else {
                    
                    // ===============================================================================
                    // THIS SECTION WITHIN THE "patient-add" ROUTE IS FOR PROVIDER JOINS
                    // FOR WHEN YOU ADD THE PATIENT BEING CREATED TO THE DATABASE.
                    // ===============================================================================

                    // Create a variable to store the provider data that may
                    // have been entered by the user on the "patient-new" page.
                    var providersIdSelected = req.body.providerforpatient;

                    // Check if the user selected any of the providers that 
                    // were listed on the "patient-new.ejs" page. If there
                    // were providers selected, complete the actions below.
                    if(providersIdSelected) {

                        // Create a query variable for adding the patient 
                        // and provider identifiers to the "Cares_For" table.
                        var joinPatientProviderSQL = `INSERT INTO Cares_For (Cares_PatientID, 
                                                        Cares_ProviderID) VALUES (?, ?);`;

                        // If only one provider was selected, then
                        // execute the query to insert the provider ID
                        // and the patient ID in the "Cares_For" table
                        // to help show the relationship between the
                        // patient an provider entities.
                        if(providersIdSelected.length == 1) {

                            // Complete the query in the database and add the patient
                            // data entered by the user into the "Cares_For" table of
                            // the database.
                            database.query(joinPatientProviderSQL, [patientIdData[0].PatientID, providersIdSelected], function(error, data, fields) {

                                // If there is an error, log the error.
                                if(error) {
                                    console.log(error);

                                // Otherwise, complete the actions below.
                                } else {

                                    // For now, do nothing.
                                }
                            });

                        // If more than one provider was selected, then 
                        // loop through each provider that was selected 
                        // and add their identifiers along with the patient 
                        // ID to the "Cares_For" table.
                        } else if(providersIdSelected.length > 1) {

                            // Create a for loop to add each provider that was selected,
                            // assuming that there were multiple providers selected, to
                            // the "Cares_For" table along with the patient ID that was
                            // obtained.
                            for(var i = 0; i < providersIdSelected.length; i++) {

                                // Complete the query in the database and add the patient
                                // data entered by the user into the patient table of the
                                // database.
                                database.query(joinPatientProviderSQL, [patientIdData[0].PatientID, providersIdSelected[i]], function(error, data, fields) {

                                    // If there is an error, log the error.
                                    if(error) {
                                        console.log(error);

                                    // Otherwise, complete the actions below.
                                    } else {

                                        // For now, do nothing.
                                    }
                                });
                            }
            
                        // There are no actions that were
                        // taken, then do nothing for now.
                        } else {

                            // Otherwise, do nothing.
                        }
                    }

                    // ===============================================================================
                    // THIS SECTION WITHIN THE "patient-add" ROUTE IS FOR TREATMENT JOINS
                    // FOR WHEN YOU ADD THE PATIENT BEING CREATED TO THE DATABASE.
                    // ===============================================================================

                    // Create a variable to store the treatment data that may
                    // have been entered by the user on the "patient-new" page.
                    var treatmentsIdSelected = req.body.treatmentforpatient;

                    // Check if the user selected any of the treatments that 
                    // were listed on the "patient-new.ejs" page. If there
                    // were treatments selected, complete the actions below.
                    if(treatmentsIdSelected) {

                        // Create a query variable for adding the patient and
                        // treatment identifiers to the "Receives_Treatment" table.
                        var joinPatientTreatmentSQL = `INSERT INTO Receives_Treatment (Receives_PatientID, 
                                                            Receives_TreatmentID) VALUES (?, ?);`;

                        // If only one treatment was selected, then
                        // execute the query to insert the treatment ID
                        // and the patient ID in the "Receives_Treatment"
                        // table to help show the relationship between
                        // the patient and treatment entities.
                        if(treatmentsIdSelected.length == 1) {

                            // Complete the query in the database and add the patient
                            // and treatment data entered by the user into the 
                            // "Receives_Treatment" table of the database.
                            database.query(joinPatientTreatmentSQL, [patientIdData[0].PatientID, treatmentsIdSelected], function(error, data, fields) {

                                // If there is an error, log the error.
                                if(error) {
                                    console.log(error);

                                // Otherwise, complete the actions below.
                                } else {

                                    // For now, do nothing.
                                }
                            });

                        // If more than one treatment was selected, then 
                        // loop through each treatment that was selected 
                        // and add their identifiers along with the patient 
                        // ID to the "Receives_Treatment" table.
                        } else if(treatmentsIdSelected.length > 1) {

                            // Create a for loop to add each treatment that was selected,
                            // assuming that there were multiple treatments selected, to
                            // the "Receives_Treatment" table along with the patient ID
                            // that was obtained.
                            for(var j = 0; j < treatmentsIdSelected.length; j++) {

                                // Complete the query in the database and add the treatment
                                // data entered by the user into the "Receives_Treatment"
                                // table of the database.
                                database.query(joinPatientTreatmentSQL, [patientIdData[0].PatientID, treatmentsIdSelected[j]], function(error, data, fields) {

                                    // If there is an error, log the error.
                                    if(error) {
                                        console.log(error);

                                    // Otherwise, complete the actions below.
                                    } else {

                                        // For now, do nothing.
                                    }
                                });
                            }
            
                        // If there are no actions that were
                        // taken, then do nothing for now.
                        } else {

                            // Otherwise, do nothing.
                        }
                    }
                    // ===============================================================================
                }
            });

            // Redirect the route back to the main patients page
            // after adding the patient to the database.
            // Add a flash message indicating that the patient was
            // successfully added to the database.
            req.flash("patientChange", "Patient created.");
            res.redirect("/patients");
        }
    });
});

// Create a post request for when the user wants to
// update a given patient.
patientRouter.post("/patient-update", function(req, res) {

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
    var patientFirstName = req.body.patientfirstname.trim();
    var patientMiddleName = req.body.patientmiddlename.trim();
    var patientLastName = req.body.patientlastname.trim();
    var patientBirthdate = req.body.patientbirthdate; 
    var patientSex = req.body.patientsex;
    var patientHeight = req.body.patientheight;
    var patientWeight = req.body.patientweight;
    var patientRiskIndex = req.body.patientriskindex;
    var patientDescription = req.body.patientdescription.trim();
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
    if(!patientRiskIndex) {
        patientRiskIndex = req.body.defaultpatientriskindex;
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
    var sql = `UPDATE Patient 
                SET PatientNotes = ?, PatientFirstName = ?, PatientMiddleName = ?, PatientLastName = ?, PatientBirthdate = ?, PatientSex = ?, PatientWeight = ?, PatientRiskIndex = ?, PatientPhone = ?, PatientEmail = ?, PatientHeight = ?, PatientStartDate = ?, PatientEndDate = ?
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
                         patientRiskIndex,
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

            // ===============================================================================
            // THIS SECTION WITHIN THE "patient-update" ROUTE IS FOR PATIENT AND PROVIDER 
            // JOINS FOR CASES WHERE YOU WANT TO <REMOVE> PROVIDERS FROM THE PATIENTS.
            // ===============================================================================
            
            // Create a variable to store the provider identifiers for the
            // providers that the user wishes to REMOVE from the "Cares_For"
            // table. This variable will be used in the remove query.
            var patientUpdateRemoveProviders = req.body.removeproviderforpatient;

            // Check if the user selected any of the providers that
            // were listed on the "patients-edit" page to be removed.
            if(patientUpdateRemoveProviders) {

                // Create a variable for storing the query that will remove
                // the provider from the "Cares_For" table in the database.
                var removePatientJoinSQL = `DELETE FROM Cares_For WHERE Cares_PatientID = ? AND Cares_ProviderID = ?;`;

                // If only one provider was selected, then 
                // execute the query to remove the provider ID
                // and the patient ID from the "Cares_For" table.
                if(patientUpdateRemoveProviders.length == 1) {

                    // If only one provider was selected to be removed 
                    // in the update route, then execute the query to
                    // remove the provider associated with the given 
                    // patient from the "Cares_For" table.
                    database.query(removePatientJoinSQL, [updatePatientID, patientUpdateRemoveProviders], function(error, data, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // Otherwise, complete the actions below.
                        } else {

                            // For now, do nothing.
                        }
                    });

                // If more than one provider was selected, then 
                // loop through each provider that was selected
                // and remove their identifiers along with the
                // corresponding patient identifier from the
                // "Cares_For" table.
                } else if(patientUpdateRemoveProviders.length > 1) {

                    // Create a for loop to remove each provider that was selected,
                    // assuming that there were multiple providers selected, from
                    // the "Cares_For" table along with the patient ID that was
                    // obtained.
                    for(var i = 0; i < patientUpdateRemoveProviders.length; i++) {

                        // Complete the query in the database and remove the provider
                        // data from the "Cares_For" table in the database.
                        database.query(removePatientJoinSQL, [updatePatientID, patientUpdateRemoveProviders[i]], function(error, data, fields) {

                            // If there is an error, log the error.
                            if(error) {
                                console.log(error);

                            // Otherwise, complete the actions below.
                            } else {

                                // For now, do nothing.
                            }
                        });
                    }

                // There are no actions that were
                // taken, then do nothing for now.
                } else {

                    // Otherwise, do nothing.
                }
            }

            // ===============================================================================
            // THIS SECTION WITHIN THE "patient-update" ROUTE IS FOR PATIENT AND PROVIDER 
            // JOINS FOR CASES WHERE YOU WANT TO <ADD> PROVIDERS TO THE PATIENTS.
            // ===============================================================================
            
            // Create a variable to store the provider identifiers for the
            // providers that the user wishes to ADD to the "Cares_For"
            // table. This variable will be used in the add query. 
            var patientUpdateAddProviders = req.body.addproviderforpatient;

            // Check if the user selected any of the providers that
            // were listed on the "patients-edit" page to be added.
            if(patientUpdateAddProviders) {

                // Create a variable for storing the query that will add
                // the provider to the "Cares_For" table in the database.
                var addPatientJoinSQL = `INSERT INTO Cares_For (Cares_PatientID, 
                                            Cares_ProviderID) VALUES (?, ?);`;

                // If only one provider was selected, then 
                // execute the query to add the provider ID
                // and the patient ID to the "Cares_For" table.
                if(patientUpdateAddProviders.length == 1) {

                    // If only one provider was selected to be added 
                    // in the update route, then execute the query to
                    // add the provider associated with the given 
                    // patient to the "Cares_For" table.
                    database.query(addPatientJoinSQL, [updatePatientID, patientUpdateAddProviders], function(error, data, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // Otherwise, complete the actions below.
                        } else {

                            // For now, do nothing.
                        }
                    });

                // If more than one provider was selected, then 
                // loop through each provider that was selected
                // and add their identifiers along with the
                // corresponding patient identifier to the
                // "Cares_For" table.
                } else if(patientUpdateAddProviders.length > 1) {

                    // Create a for loop to add each provider that was selected,
                    // assuming that there were multiple providers selected, to
                    // the "Cares_For" table along with the patient ID that was
                    // obtained.
                    for(var j = 0; j < patientUpdateAddProviders.length; j++) {

                        // Complete the query in the database and add the provider
                        // data entered by the user into the "Cares_For" table of
                        // the database.
                        database.query(addPatientJoinSQL, [updatePatientID, patientUpdateAddProviders[j]], function(error, data, fields) {

                            // If there is an error, log the error.
                            if(error) {
                                console.log(error);

                            // Otherwise, complete the actions below.
                            } else {

                                // For now, do nothing.
                            }
                        });
                    }

                // There are no actions that were
                // taken, then do nothing for now.
                } else {

                    // Otherwise, do nothing.
                }
            }

            // ===============================================================================
            // THIS SECTION WITHIN THE "patient-update" ROUTE IS FOR PATIENT AND TREATMENT 
            // JOINS FOR CASES WHERE YOU WANT TO <REMOVE> TREATMENTS FROM THE PATIENTS.
            // ===============================================================================
            
            // Create a variable to store the treatment identifiers for the treatments
            // that the user wishes to REMOVE from the "Receives_Treatment" table. This
            // variable will be used in the remove query.
            var patientUpdateRemoveTreatments = req.body.removetreatmentforpatient;

            // Check if the user selected any of the treatments that
            // were listed on the "patients-edit" page to be removed.
            if(patientUpdateRemoveTreatments) {

                // Create a variable for storing the query that will remove
                // the treatment from the "Receives_Treatment" table in the database.
                var removeTreatmentJoinSQL = `DELETE FROM Receives_Treatment WHERE Receives_PatientID = ? AND Receives_TreatmentID = ?;`;

                // If only one treatment was selected, then execute
                // the query to remove the treatment ID and the
                // patient ID from the "Receives_Treatment" table.
                if(patientUpdateRemoveTreatments.length == 1) {

                    // If only one treatment was selected to be removed 
                    // in the update route, then execute the query to
                    // remove the treatment associated with the given 
                    // patient from the "Receives_Treatment" table.
                    database.query(removeTreatmentJoinSQL, [updatePatientID, patientUpdateRemoveTreatments], function(error, data, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // Otherwise, complete the actions below.
                        } else {

                            // For now, do nothing.
                        }
                    });

                // If more than one treatment was selected, then 
                // loop through each treatment that was selected
                // and remove their identifiers along with the
                // corresponding treatment identifier from the
                // "Receives_Treatment" table.
                } else if(patientUpdateRemoveTreatments.length > 1) {

                    // Create a for loop to remove each treatment that was selected,
                    // assuming that there were multiple treatments selected, from
                    // the "Receives_Treatment" table along with the patient ID
                    // that was obtained.
                    for(var k = 0; k < patientUpdateRemoveTreatments.length; k++) {

                        // Complete the query in the database and remove the treatment
                        // data from the "Receives_Treatment" table in the database.
                        database.query(removeTreatmentJoinSQL, [updatePatientID, patientUpdateRemoveTreatments[k]], function(error, data, fields) {

                            // If there is an error, log the error.
                            if(error) {
                                console.log(error);

                            // Otherwise, complete the actions below.
                            } else {

                                // For now, do nothing.
                            }
                        });
                    }

                // There are no actions that were
                // taken, then do nothing for now.
                } else {

                    // Otherwise, do nothing.
                }
            }

            // ===============================================================================
            // THIS SECTION WITHIN THE "patient-update" ROUTE IS FOR PATIENT AND TREATMENT 
            // JOINS FOR CASES WHERE YOU WANT TO <ADD> TREATMENTS TO THE PATIENTS.
            // ===============================================================================
            
            // Create a variable to store the treatment identifiers for the
            // treatments that the user wishes to ADD to the "Receives_Treatment"
            // table. This variable will be used in the add query. 
            var patientUpdateAddTreatments = req.body.addtreatmentforpatient;

            // Check if the user selected any of the treatments that
            // were listed on the "patients-edit" page to be added.
            if(patientUpdateAddTreatments) {

                // Create a variable for storing the query that will add
                // the treatment to the "Receives_Treatment" table in the
                // database.
                var addTreatmentJoinSQL = `INSERT INTO Receives_Treatment (Receives_PatientID, 
                                            Receives_TreatmentID) VALUES (?, ?);`;

                // If only one treatment was selected, then 
                // execute the query to add the treatment ID
                // and the patient ID to the "Receives_Treatment" 
                // table.
                if(patientUpdateAddTreatments.length == 1) {

                    // If only one treatment was selected to be added 
                    // in the update route, then execute the query to
                    // add the treatment associated with the given 
                    // patient to the "Receives_Treatment" table.
                    database.query(addTreatmentJoinSQL, [updatePatientID, patientUpdateAddTreatments], function(error, data, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // Otherwise, complete the actions below.
                        } else {

                            // For now, do nothing.
                        }
                    });

                // If more than one treatment was selected, then 
                // loop through each treatment that was selected
                // and add their identifiers along with the
                // corresponding patient identifier to the
                // "Receives_Treatment" table.
                } else if(patientUpdateAddTreatments.length > 1) {

                    // Create a for loop to add each treatment that was selected,
                    // assuming that there were multiple treatments selected, to
                    // the "Receives_Treatment" table along with the patient ID 
                    // that was obtained.
                    for(var l = 0; l < patientUpdateAddTreatments.length; l++) {

                        // Complete the query in the database and add the treatment
                        // data entered by the user into the treatment table of the
                        // database.
                        database.query(addTreatmentJoinSQL, [updatePatientID, patientUpdateAddTreatments[l]], function(error, data, fields) {

                            // If there is an error, log the error.
                            if(error) {
                                console.log(error);

                            // Otherwise, complete the actions below.
                            } else {

                                // For now, do nothing.
                            }
                        });
                    }

                // There are no actions that were
                // taken, then do nothing for now.
                } else {

                    // Otherwise, do nothing.
                }
            }
            // ===============================================================================
        
            // Redirect the route back to the main patients page.
            // Add a flash message indicating that the patient was
            // successfully updated in the database.
            req.flash("patientChange", "Patient updated.");
            res.redirect("/patients");
        }
    });
});

// Create a post request for when the user wants to
// remove a given patient.
patientRouter.post("/patient-remove", function(req, res) {

    // Obtain the patient identifier of the patient that
    // the user wants to remove from the database, and 
    // store the patient ID in a variable.
    var removePatient = req.body.patientidentifier;

    // Include the SQL query that will remove the selected
    // patient entity from the "Cares_For" relationship table
    // in the database.
    var removePatientJoinSQL = `DELETE FROM Cares_For WHERE Cares_PatientID = ?;`;

    // Include the SQL query that will remove the selected
    // patient entity from the "Receives_Treatment" relationship
    // table in the database.
    var removeTreatmentJoinSQL = `DELETE FROM Receives_Treatment WHERE Receives_PatientID = ?;`;

    // Include the SQL query that will remove the selected
    // patient entity from the patient table in the database.
    var removePatientSQL = `DELETE FROM Patient WHERE PatientID = ?;`;

    // Complete the first query in the database and remove the patient
    // that the user selected from the "Cares_For" join relationship. 
    // Then complete the second query in the database and remove the
    // patient that the user selected from "Receives_Treatment" join
    // relationship. This must be completed before removing the patient 
    // from the "Patient" table.
    database.query(removePatientJoinSQL, [removePatient], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // If there are no errors, then complete the second query.
        } else {

            // The second query removes the patient entity that
            // the user selected from the "Receives_Treatment" table.
            database.query(removeTreatmentJoinSQL, [removePatient], function(error, data, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);

                // If there are no errors, then complete the third query.
                } else {
        
                    // The third query removes the patient entity that
                    // the user selected from the "Patient" table.
                    database.query(removePatientSQL, [removePatient], function(error, data, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // Complete the final actions below.
                        } else {

                            // Redirect the route back to the main patients page.
                            // Add a flash message indicating that the patient was
                            // successfully removed from the database.
                            req.flash("patientChange", "Patient removed.");
                            res.redirect("/patients");
                        }
                    });
                }
            });
        }
    });
});

// Export the module for use in the main app.js file.
module.exports = patientRouter;
