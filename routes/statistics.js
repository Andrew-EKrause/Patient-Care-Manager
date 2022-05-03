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

// NOTES: 
// ============================================================================
// AFTER YOU FINISH YOUR THREE COMPLEX QUERIES, GO BACK TO THE patients.js PAGE
// (AND MAYBE TO THE OTHER MAIN ENTITIES YOU CREATED) AND TRY TO DISPLAY THE
// TREATMENTS THAT EACH PATIENT IS RECEIVING. 

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
var statisticsRouter = express.Router();

// Include the database route in order to 
// work with the data obtained by the complex
// queries.
const database = require('./database.js');

/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Creat a route to render the statistics page.
// In this route, all of the data obtained through
// the execution of complex queries is displayed
// on the statistics page of the website.
statisticsRouter.get("/statistics", function(req, res, next) {

    // --> ========
    // -->  NOTES:
    // --> ========
    // --> MAY ADD MORE QUERIES IN THE FUTURE. ANOTHER COMPLEX
    // --> QUERY COULD BE WHAT PATIENTS HAVE A RISK INDEX GREATER
    // --> THAN 5 AND ARE RECEIVING TREATMENTS WITH A RISK INDEX
    // --> GREATER THAN 5.
    // --> ALSO...CREATE THOSE JOIN TABLES IN THE DATABASE AT SOME POINT!!!

    // ==================================================================
    // Complex Query <1> - Top 5 High-Risk Patients
    // ==================================================================
    // Create the first complex query. The first complex query 
    // selects all of the patients that have a risk index greater
    // than or equal to the value of 6. The top 5 highest risk  
    // patients are obtained to be displayed on the "Statistics"
    // page. The 5 highest-risk patients are displayed with risk
    // indexes in descending order.
    var complexQuery1 = `SELECT * FROM Patient
                            WHERE Patient.PatientRiskIndex >= 6
                            ORDER BY Patient.PatientRiskIndex DESC
                            LIMIT 5`;

    // ==================================================================
    // Complex Query <2> - Providers Caring for 5 or More Patients 
    // ==================================================================
    // Create the second complex query. The second complex query 
    // selects all of the providers who are caring for 5 or more
    // patients. The providers who are caring for 5 or more patients
    // are then displayed on the "Statistics" page.
    var complexQuery2 = `SELECT Provider.ProviderFirstName, Provider.ProviderLastName, Provider.ProviderTitle, count(*) AS NumPatients 
                            FROM Provider
                            JOIN Cares_For
                                ON Provider.ProviderID = Cares_For.Cares_ProviderID
                            JOIN Patient
                                ON Cares_For.Cares_PatientID = Patient.PatientID
                            GROUP BY Provider.ProviderID
                            HAVING count(*) >= 5`;

    // ==================================================================
    // Complex Query <3> - What Providers Administered What Treatments 5 
    //                     or More Times 
    // ==================================================================
    // Create the third complex query. The third complex query selects
    // which providers are currently authorized to administer high-risk 
    // treatments at the hospital. The providers who meet the criteria 
    // of this complex query are obtained to be displayed on the
    // "Statistics" page.
    var complexQuery3 = `SELECT Provider.ProviderID, Provider.ProviderFirstName, Provider.ProviderLastName, Provider.ProviderTitle, Treatment.TreatmentName
                            FROM Provider
                            JOIN Administers_Treatment
                                ON Provider.ProviderID = Administers_Treatment.Administers_ProviderID
                            JOIN Treatment
                                ON Administers_Treatment.Administers_TreatmentID = Treatment.TreatmentID
                            WHERE Treatment.TreatmentName IN ('Chemotherapy', 'Immunotherapy', 'Heart Surgery', 'Brain Surgery')`; 

    // <1> Execute the first complex query. If the first complex query executes,
    // then execute the second complex query. Otherwise, log an error.
    database.query(complexQuery1, function(error1, dataQuery1, fields1) {

        // If there is an error, log the error.
        if(error1) {
            console.log(error1);

        // If there are no errors, execute the second complex query.
        } else {

            // <2> Execute the second complex query. If the second complex query executes,
            // then execute the third complex query. Otherwise, log an error.
            database.query(complexQuery2, function(error2, dataQuery2, fields2) {

                // If there is an error, log the error.
                if(error2) {
                    console.log(error2);

                // If there are no errors, execute the third complex query.
                } else {

                    // <3> Execute the third complex query. If the third complex query executes,
                    // then send the obtained data to the frontend of the web application to
                    // be displayed to the user(s).
                    database.query(complexQuery3, function(error3, dataQuery3, fields3) {

                        // If there is an error, log the error.
                        if(error3) {
                            console.log(error3);
                        } else {

                            // --> DEBUGGING STATEMENTS; DELETE LATER!!!
                            // console.log(dataQuery1);
                            // console.log(dataQuery2);
                            // console.log(dataQuery3);

                            // If there are no errors, send the data obtained 
                            // by the three complex queries to the statistics.ejs
                            // page in order to display that data.
                            res.render("statistics", {
                                title: "Statistics List", 
                                highestRiskPatient: dataQuery1,
                                numberOfCareProviders: dataQuery2,
                                treatmentsAdministered: dataQuery3,
                            });
                        }
                    });
                }
            });
        }
    });
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// --> MAY ADD INFORMATION TO THIS LATER; MAY NOT NEED!!!
// --> MAY ALSO INCLUDE INFORMATION REGARDING THE USE OF THE
// --> THREE COMPLEX QUERIES THAT YOU NEED TO IMPLEMENT FOR
// --> THIS PROJECT.

// Export the module for use in the main app.js file.
module.exports = statisticsRouter;
