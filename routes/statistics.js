/**
 * The statistics.js file is a route module that
 * contains the routes for the statistics in the 
 * database. The statistics in the database are
 * not able to be edited or removed given that 
 * the data is obtained through complex SQL queries.
 * The purpose of this route module/JavaScript
 * file is to simply organize the data through
 * SQL queries and send it to the statistics.ejs
 * file to be displayed on the website. 
 * 
 * NOTE: There is also other data displayed 
 * here that is obtained through the use of
 * complex queries (at least three) made on
 * the database. The user can ONLY VIEW the
 * complex queries. Future updates to this 
 * project may enable the user to make edits
 * to the results of the complex queries
 * displayed on the "Statistics" page.
 * 
 * Project: Mayo Clinic (PCM) Web Application
 * Author: Andrew Krause
 * Class: CS 364
 * Date: 5/10/2022
 * 
 */

// Add the packages that are required.
var express = require('express');
var statisticsRouter = express.Router();

// Create global variables that will help in
// the process of executing the complex queries
// based on the input that the user provides.
var applyPatientRiskIndex;
var applyPatientRiskIndexLimit;
var applyNumProviderCare;
var applyNumProviderCareLimit;
var applyProviderTreatment;
var applyProviderTreatment1;
var applyProviderTreatment2;
var applyProviderTreatment3;
var applyProviderTreatment4;
var applyProviderTreatment5;
var applyProviderTreatment6;
var applyProviderTreatment7;
var applyProviderTreatment8;
var applyProviderTreatment9;
var applyProviderTreatment10;
var applyProviderTreatmentLimit;

// Include the database route in order to 
// work with the data obtained by the complex
// queries.
const database = require('./database.js');

/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Creat a route to render the different statistic views  
// that can be selected from the statistics-view page.
// In this route, the user can select from three different
// categories to view a certain statistic, which is created
// via a complex query.
statisticsRouter.get("/statistics-view", function(req, res, next) {

    // Render the statistics-view page.
    res.render("statistics-view");
});

// --> ========
// -->  NOTES:
// --> ========
// --> MAY ADD MORE QUERIES IN THE FUTURE. ANOTHER COMPLEX
// --> QUERY COULD BE WHAT PATIENTS HAVE A RISK INDEX GREATER
// --> THAN 5 AND ARE RECEIVING TREATMENTS WITH A RISK INDEX
// --> GREATER THAN 5.

// Create a route for the user to access and view the first
// statistic on the website. The first statistic is generated
// through the implementation of a complex query that is executed
// upon the database to obtain the information needed. The first
// statistic shows the patients with a risk index equal to the
// search value entered by the user.
statisticsRouter.get("/statistics-query1", function(req, res, next) {

    // Include a conditional to determine whether the user entered input
    // for finding patients that have a risk index greater than or equal
    // to the entered input.
    if(!applyPatientRiskIndex) {

        // If the user did not enter any input, set
        // the default value to 5 for the patient
        // risk index query.
        applyPatientRiskIndex = 5;
    }

    // Include a conditional that determines if the user entered in 
    // any input for the limit field of the patient risk index search.
    if(!applyPatientRiskIndexLimit) {

        // If the user did not enter any input, set
        // the default value to 5 for the patient
        // risk index query limit.
        applyPatientRiskIndexLimit = 100;
    }

    // ==================================================================
    // Complex Query <1> - Patients with Certain Risk Index
    // ==================================================================
    // Create the first complex query. The first complex query 
    // selects all of the patients that have a risk index greater
    // than or equal to the value entered by the user as an input. 
    // The patients who meet the query and entered inputs are then 
    // displayed on the "statistics-query1.ejs" page of the website. 
    // The patients are displayed with risk indexes in descending 
    // order.
    var complexQuery1 = `SELECT * FROM Patient
                            WHERE Patient.PatientRiskIndex = ?
                            ORDER BY Patient.PatientRiskIndex DESC
                            LIMIT ?`;

    // <1> Execute the first complex query. If the first complex query executes,
    // then execute the second complex query. Otherwise, log an error.
    database.query(complexQuery1, [parseInt(applyPatientRiskIndex), parseInt(applyPatientRiskIndexLimit)], function(error1, dataQuery1, fields1) {

        // If there is an error, log the error.
        if(error1) {
            console.log(error1);

        // If there is no error, display the 
        // results of the first complex query.
        } else {

            // --> DEBUGGING STATEMENT; DELETE LATER!!!
            // console.log(dataQuery1);

            // If there are no errors, send the data obtained by the
            // complex queries to the statistics-query1.ejs page in 
            // order to display that data.
            res.render("statistics-query1", {
                title: "Statistics Query 1 List", 
                highestRiskPatient: dataQuery1,
            });
        }
    });
});

// Create a route for the user to access and view the second
// statistic on the website. The second statistic is generated
// through the implementation of a complex query that is executed
// upon the database to obtain the information needed. The second
// statistic shows the providers caring for the number of patients
// greater than or equal to the search value entered by the user.
statisticsRouter.get("/statistics-query2", function(req, res, next) {

    // Include a conditional to determine whether the user entered input
    // for finding which proivders are caring for a number of patients 
    // that is greater than or equal to the entered input.
    if(!applyNumProviderCare) {

        // If the user did not enter any input, set
        // the default value to 5 for the number of
        // provider care query.
        applyNumProviderCare = 5;
    }

    // Include a conditional that determines if the user entered in 
    // any input for the limit field of the provider care search.
    if(!applyNumProviderCareLimit) {

        // If the user did not enter any input, set
        // the default value to 5 for the provider
        // care query limit.
        applyNumProviderCareLimit = 100;
    }

    // ==================================================================
    // Complex Query <2> - Providers Caring for (x) or More Patients 
    // ==================================================================
    // Create the second complex query. The second complex query 
    // selects all of the providers who are caring for the number of 
    // patients that is greater than or equal to a value entered by 
    // the user. The providers who meet the query and inputs entered
    // are displayed on the "statistics-query2.ejs" page.
    var complexQuery2 = `SELECT Provider.ProviderFirstName, Provider.ProviderLastName, Provider.ProviderTitle, count(*) AS NumPatients 
                            FROM Provider
                            JOIN Cares_For
                                ON Provider.ProviderID = Cares_For.Cares_ProviderID
                            JOIN Patient
                                ON Cares_For.Cares_PatientID = Patient.PatientID
                            GROUP BY Provider.ProviderID
                            HAVING count(*) >= ?
                            LIMIT ?`;

    // <2> Execute the second complex query. If the second complex query executes,
    // then execute the third complex query. Otherwise, log an error.
    database.query(complexQuery2, [parseInt(applyNumProviderCare), parseInt(applyNumProviderCareLimit)], function(error2, dataQuery2, fields2) {

        // If there is an error, log the error.
        if(error2) {
            console.log(error2);

        // If there is no error, display the 
        // results of the second complex query.
        } else {

            // --> DEBUGGING STATEMENT; DELETE LATER!!!
            // console.log(dataQuery2);

            // If there are no errors, send the data obtained by the
            // complex queries to the statistics-query2.ejs page in 
            // order to display that data.
            res.render("statistics-query2", {
                title: "Statistics Query 2 List", 
                numberOfCareProviders: dataQuery2,
            });
        }
    });
});

// Create a route for the user to access and view the third
// statistic on the website. The third statistic is generated
// through the implementation of a complex query that is executed
// upon the database to obtain the information needed. The third
// statistic shows the providers administering any of the given 
// treatments that are entered as inputs by the user.
statisticsRouter.get("/statistics-query3", function(req, res, next) {

    // Include a conditional to determine whether the user entered input
    // for finding patients with a certain risk index in the database.
    if(!applyProviderTreatment) {

        // If the user did not enter any input, set
        // the default value to 5 for the query.
        applyProviderTreatment1 = "NULL";
        applyProviderTreatment2 = "NULL";
        applyProviderTreatment3 = "NULL";
        applyProviderTreatment4 = "NULL";
        applyProviderTreatment5 = "NULL";
        applyProviderTreatment6 = "NULL";
        applyProviderTreatment7 = "NULL";
        applyProviderTreatment8 = "NULL";
        applyProviderTreatment9 = "NULL";
        applyProviderTreatment10 = "NULL";
    }

    // Include a conditional that determines if the user entered in 
    // any input for the limit field of the treatment search.
    if(!applyProviderTreatmentLimit) {

        // If the user did not enter any input, set
        // the default value to 5 for the treatment
        // query limit.
        applyProviderTreatmentLimit = 100;
    }

    // ==================================================================
    // Complex Query <3> - What Providers are Administering
    //                     the Specified Treatments.
    // ==================================================================
    // Create the third complex query. The third complex query selects
    // which providers are currently administering the treatments that are
    // entered by the user at the hospital. The providers who meet the inputs 
    // of this complex query are displayed on the "statistics-query3.ejs" page
    // of the website.
    var complexQuery3 = `SELECT Provider.ProviderID, Provider.ProviderFirstName, Provider.ProviderLastName, Provider.ProviderTitle, Treatment.TreatmentName
                            FROM Provider
                            JOIN Administers_Treatment
                                ON Provider.ProviderID = Administers_Treatment.Administers_ProviderID
                            JOIN Treatment
                                ON Administers_Treatment.Administers_TreatmentID = Treatment.TreatmentID
                            WHERE Treatment.TreatmentName IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            LIMIT ?`; 

    // <3> Execute the third complex query. If the third complex query executes,
    // then send the obtained data to the frontend of the web application to
    // be displayed to the user(s).
    database.query(complexQuery3, [applyProviderTreatment1,
                                   applyProviderTreatment2, 
                                   applyProviderTreatment3,
                                   applyProviderTreatment4,
                                   applyProviderTreatment5,
                                   applyProviderTreatment6,
                                   applyProviderTreatment7,
                                   applyProviderTreatment8,
                                   applyProviderTreatment9,
                                   applyProviderTreatment10,
                                   parseInt(applyProviderTreatmentLimit)], function(error3, dataQuery3, fields3) {

        // If there is an error, log the error.
        if(error3) {
            console.log(error3);

        // If there is no error, display the 
        // results of the third complex query.
        } else {

            // --> DEBUGGING STATEMENT; DELETE LATER!!!
            // console.log(dataQuery3);

            // If there are no errors, send the data obtained by the
            // complex queries to the statistics-query3.ejs page in 
            // order to display that data.
            res.render("statistics-query3", {
                title: "Statistics Query 3 List", 
                treatmentsAdministered: dataQuery3,
            });
        }
    });
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// Create a route to update the statistics-query1 page
// on the website. In this route, all of the data that
// is obtained through the implementation of the first
// complext query is displayed on the statistics-query1
// page of the website.
statisticsRouter.post("/statistics-query1-update", function(req, res, next) {

    // Assign the global variables to the two inputs that may have been
    // entered by the user on the statistics-query1 page of the website.
    // If input was not entered for any of the fields on the statistics
    // page, then the value for that given field or fields will be NULL.
    applyPatientRiskIndex = req.body.applypatientriskindex;
    applyPatientRiskIndexLimit = req.body.applypatientrisklimit;    

    // After assigning the global variables, redirect
    // back to the statistics-query1 page in order to 
    // view the results of the query with the entered
    // input.
    res.redirect("/statistics-query1");
});

// Create a route to update the statistics-query2 page
// on the website. In this route, all of the data that
// is obtained through the implementation of the second
// complext query is displayed on the statistics-query2
// page of the website.
statisticsRouter.post("/statistics-query2-update", function(req, res, next) {

    // Assign the global variables to the two inputs that may have been
    // entered by the user on the statistics-query2 page of the website.
    // If input was not entered for any of the fields on the statistics
    // page, then the value for that given field or fields will be NULL.
    applyNumProviderCare = req.body.applyprovidercare;
    applyNumProviderCareLimit = req.body.applyprovidercarelimit;  

    // After assigning the global variables, redirect
    // back to the statistics-query2 page in order to 
    // view the results of the query with the entered
    // input.
    res.redirect("/statistics-query2");
});

// Create a route to update the statistics-query3 page
// on the website. In this route, all of the data that
// is obtained through the implementation of the third
// complext query is displayed on the statistics-query3
// page of the website.
statisticsRouter.post("/statistics-query3-update", function(req, res, next) {

    // Assign the global variables to the two inputs that may have been
    // entered by the user on the statistics-query3 page of the website.
    // If input was not entered for any of the fields on the statistics
    // page, then the value for that given field or fields will be NULL.
    applyProviderTreatment = req.body.applyprovidertreatment;
    applyProviderTreatmentLimit = req.body.applyprovidertreatmentlimit;

    // Next, initialize all of the treatment variables to NULL to start.
    applyProviderTreatment1 = "NULL";
    applyProviderTreatment2 = "NULL";
    applyProviderTreatment3 = "NULL";
    applyProviderTreatment4 = "NULL";
    applyProviderTreatment5 = "NULL";
    applyProviderTreatment6 = "NULL";
    applyProviderTreatment7 = "NULL";
    applyProviderTreatment8 = "NULL";
    applyProviderTreatment9 = "NULL";
    applyProviderTreatment10 = "NULL";

    // If more than one treatment was entered, complete
    // the actions below. Otherwise, assign the value 
    // to the first global treatment list variable.
    if(applyProviderTreatment.length > 1) {

        // Obtain all of the values that will be entered into the third complex
        // query by splitting the string that is returned in the applyProviderTreatment
        // variable and storing it in the other global values.
        var separateProviderTreatment = applyProviderTreatment.split(", ");

        // Create a for loop to assign the values to the correct global
        // variables.
        for(var i = 0; i < separateProviderTreatment.length; i++) {

            // Include a series of conditionals to determine which of the ten
            // global variables you should assign a given value in the array
            // of split treatment strings.
            if(!applyProviderTreatment1 || applyProviderTreatment1 == "NULL") {

                applyProviderTreatment1 = separateProviderTreatment[i];

            } else if(!applyProviderTreatment2 || applyProviderTreatment2 == "NULL") {

                applyProviderTreatment2 = separateProviderTreatment[i];

            } else if(!applyProviderTreatment3 || applyProviderTreatment3 == "NULL") {

                applyProviderTreatment3 = separateProviderTreatment[i];

            } else if(!applyProviderTreatment4 || applyProviderTreatment4 == "NULL") {

                applyProviderTreatment4 = separateProviderTreatment[i];

            } else if(!applyProviderTreatment5 || applyProviderTreatment5 == "NULL") {

                applyProviderTreatment5 = separateProviderTreatment[i];

            } else if(!applyProviderTreatment6 || applyProviderTreatment6 == "NULL") {

                applyProviderTreatment6 = separateProviderTreatment[i];

            } else if(!applyProviderTreatment7 || applyProviderTreatment7 == "NULL") {

                applyProviderTreatment7 = separateProviderTreatment[i];

            } else if(!applyProviderTreatment8 || applyProviderTreatment8 == "NULL") {

                applyProviderTreatment8 = separateProviderTreatment[i];

            } else if(!applyProviderTreatment9 || applyProviderTreatment9 == "NULL") {

                applyProviderTreatment9 = separateProviderTreatment[i];

            } else{

                applyProviderTreatment10 = separateProviderTreatment[i];

            }
        }

    } else {
        applyProviderTreatment1 = String(applyProviderTreatment);
    }

    // If any of the ten global variables were not assigned a treatments
    // string from the user input, assign default values to them.
    if(!applyProviderTreatment1 || applyProviderTreatment1 == "NULL") {

        applyProviderTreatment1 = "NULL";

    } 
    if(!applyProviderTreatment2 || applyProviderTreatment2 == "NULL") {

        applyProviderTreatment2 = "NULL";

    }
    if(!applyProviderTreatment3 || applyProviderTreatment3 == "NULL") {

        applyProviderTreatment3 = "NULL";

    }
    if(!applyProviderTreatment4 || applyProviderTreatment4 == "NULL") {

        applyProviderTreatment4 = "NULL";

    }
    if(!applyProviderTreatment5 || applyProviderTreatment5 == "NULL") {

        applyProviderTreatment5 = "NULL";

    }
    if(!applyProviderTreatment6 || applyProviderTreatment6 == "NULL") {

        applyProviderTreatment6 = "NULL";

    }
    if(!applyProviderTreatment7 || applyProviderTreatment7 == "NULL") {

        applyProviderTreatment7 = "NULL";

    }
    if(!applyProviderTreatment8 || applyProviderTreatment8 == "NULL") {

        applyProviderTreatment8 = "NULL";

    }
    if(!applyProviderTreatment9 || applyProviderTreatment9 == "NULL") {

        applyProviderTreatment9 = "NULL";

    } 
    if(!applyProviderTreatment10 || applyProviderTreatment10 == "NULL") {

        applyProviderTreatment10 = "NULL";

    } 

    // After assigning the global variables, redirect
    // back to the statistics-query3 page in order to 
    // view the results of the query with the entered
    // input.
    res.redirect("/statistics-query3");
});

// Export the module for use in the main app.js file.
module.exports = statisticsRouter;
