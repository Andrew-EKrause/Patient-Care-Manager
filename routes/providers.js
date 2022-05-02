/**
 * The providers.js file is a route module that
 * contains the routes for the providers in the 
 * database. The providers in the database can
 * be edited and removed. Other provider entities
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
var providerRouter = express.Router();

// Include flash message and session packages.
const flash = require("connect-flash");
const session = require('express-session');

// Use the flash module to transmit messages
// to the user as well as the developers.
providerRouter.use(flash());

// The code for SESSIONS is set up here.
// The SESSIONS need to be set up in order
// to use flash messages.
providerRouter.use(session({
    secret: "Confidential information.",
    resave: false,
    saveUninitialized: false
}));

// Use the flash module to transmit messages
// to the user as well as the developers.
providerRouter.use(flash());

// Include the database route in order to 
// work with the data in the providers table.
const database = require('./database.js');

/* SECTION: GET INFORMATION FROM SERVER (GET) */

// Creat a route to render the providers page.
// In this route, all of the data in the Provider
// table of the database is sent to be displayed 
// on the providers page of the website.
providerRouter.get("/providers", function(req, res, next) {

    // Create a query to SELECT all of the providers in
    // the Provider table.
    var selectProvidersSQL = `SELECT * FROM Provider`;

    // Create a query to SELECT all of the relationships between
    // providers and patients represented in the Cares_For table.
    var selectPatientProviderJoinSQL = `SELECT * FROM Cares_For`;

    // Create a query to SELECT all of the patients in
    // the Patient table.
    var selectPatientsSQL = `SELECT * FROM Patient`;

    // Create a query to SELECT all of the relationships between
    // providers and departments represented in the Part_Of table.
    var selectProviderDepartmentJoinSQL = `SELECT * FROM Part_Of`;

    // Create a query to SELECT all of the departments in
    // the department table.
    var selectDepartmentSQL = `SELECT * FROM Department`;

    // Create a query to SELECT all of the relationships between
    // providers and treatments represented in the Administers_Treatment 
    // table.
    var selectProviderTreatmentJoinSQL = `SELECT * FROM Administers_Treatment`;

    // Create a query to SELECT all of the treatments in
    // the treatment table.
    var selectTreatmentSQL = `SELECT * FROM Treatment`;

    // Get all of the providers from the providers table.
    database.query(selectProvidersSQL, function(error, providerData, fields) {

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
                // obtain the Patients in the database.
                } else {

                    // Get all of the patients from the patients table.
                    database.query(selectPatientsSQL, function(error, patientData, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // Otherwise, execute the fourth query to
                        // obtain the items in the Part_Of table
                        // in the database.
                        } else {

                            // Get all of the items from the Part_Of table.
                            database.query(selectProviderDepartmentJoinSQL, function(error, providerDepartmentJoinData, fields) {

                                // If there is an error, log the error.
                                if(error) {
                                    console.log(error);

                                // Otherwise, execute the fifth query to
                                // obtain the Departments in the database.
                                } else {

                                    // Get all of the departments from the department table.
                                    database.query(selectDepartmentSQL, function(error, departmentData, fields) {

                                        // If there is an error, log the error.
                                        if(error) {
                                            console.log(error);

                                        // Otherwise, execute the sixth query to
                                        // obtain the items in the Administers_Treatment
                                        // table in the database.
                                        } else {

                                            // Get all of the items from the Administers_Treatment table.
                                            database.query(selectProviderTreatmentJoinSQL, function(error, providerTreatmentJoinData, fields) {

                                                // If there is an error, log the error.
                                                if(error) {
                                                    console.log(error);

                                                // Otherwise, execute the seventh query to
                                                // obtain the Treatments in the database.
                                                } else {

                                                    // Get all of the treatments from the treatment table.
                                                    database.query(selectTreatmentSQL, function(error, treatmentData, fields) {

                                                        // If there is an error, log the error.
                                                        if(error) {
                                                            console.log(error);

                                                        // Otherwise, execute the seventh query to
                                                        // obtain the Treatments in the database.
                                                        } else {

                                                            // Otherwise, send the data to the
                                                            // providers.ejs page in order to 
                                                            // display that data.
                                                            res.render("providers", {
                                                                title: "Provider List", 
                                                                providerData: providerData,
                                                                patientProviderJoinData: patientProviderJoinData,
                                                                patientData: patientData,
                                                                providerDepartmentJoinData: providerDepartmentJoinData,
                                                                departmentData: departmentData,
                                                                providerTreatmentJoinData: providerTreatmentJoinData,
                                                                treatmentData: treatmentData,
                                                                providerChange: req.flash("providerChange")
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
                }
            });
        }
    });
});

// Creat a route to render the provider data that
// the user wants to edit on a separate page. If
// the user chooses to change any of the data, 
// this route will redirect to an update route
// that will commit the changes to the database.
providerRouter.get("/provider-edit/:providerId", function(req, res) {

    // Create a constant for storing the post ID so that it
    // can be retrieved from the database.
    const requestedProviderId = req.params.providerId;

    // Complete a query to obtain the provider that the
    // user wishes to edit from the Provider table.
    var selectProviderSQL = `SELECT * FROM Provider 
                                WHERE Provider.ProviderID = ?`;

    // Create a query to SELECT all of the relationships between
    // providers and departments represented in the Part_Of table.
    // The relationships will be filtered out on the "provider-edit"
    // page to display the department that the provider was assigned
    // to.
    var selectProviderDepartmentJoinSQL = `SELECT * FROM Part_Of`;

    // Create a query to SELECT all of the departments in
    // the Department table. The departments will be filtered
    // out on the "provider-edit" page as well.
    var selectDepartmentSQL = `SELECT * FROM Department`;

    // Create a query to SELECT all of the relationships between
    // providers and treatments represented in the Administers_Treatment
    // table. The relationships will be filtered out on the "provider-edit"
    // page to display treatments that the provider is listed as being
    // authorized to administer.
    var selectProviderTreatmentJoinSQL = `SELECT * FROM Administers_Treatment`;

    // Create a query to SELECT all of the treatments in
    // the Treatment table. The treatments will be filtered
    // out on the "patient-edit" page as well.
    var selectTreatmentsSQL = `SELECT * FROM Treatment`;

    // Complete the query in the database and display the provider
    // data that the user wants to edit on a page for that provider.
    // Also obtain all of the data associated with the given provider
    // through the join relationships.
    database.query(selectProviderSQL, [requestedProviderId], function(error, providerEditData, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // Otherwise, execute the second query to
        // obtain the items in the Part_Of table 
        // in the database.
        } else {

            // Get all of the items in the Part_Of table.
            database.query(selectProviderDepartmentJoinSQL, [requestedProviderId], function(error, providerDepartmentJoinEditData, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);
        
                // Otherwise, execute the third query to
                // obtain the Departments in the database.
                } else {
        
                    // Get all of the departments from the Department table.
                    database.query(selectDepartmentSQL, [requestedProviderId], function(error, departmentEditData, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);
                
                        // Otherwise, execute the fourth query to
                        // obtain the items in the Administers_Treatment
                        // table in the database.
                        } else {
                
                            // Get all of the items in the Administers_Treatment table.
                            database.query(selectProviderTreatmentJoinSQL, [requestedProviderId], function(error, providerTreatmentJoinEditData, fields) {

                                // If there is an error, log the error.
                                if(error) {
                                    console.log(error);
                        
                                // Otherwise, execute the fifth query to
                                // obtain Treatments in the database.
                                } else {
                        
                                    // Get all of the treatments from the Treatment table.
                                    database.query(selectTreatmentsSQL, [requestedProviderId], function(error, treatmentEditData, fields) {

                                        // If there is an error, log the error.
                                        if(error) {
                                            console.log(error);

                                        // Otherwise, display the provider-edit.ejs page.
                                        } else {

                                            // Otherwise, send the data to the
                                            // provider-edit.ejs page in order to 
                                            // allow the user to edit that data.
                                            res.render("provider-edit", {
                                                title: "Provider Edit", 
                                                providerEditData: providerEditData,
                                                providerDepartmentJoinEditData: providerDepartmentJoinEditData,
                                                departmentEditData: departmentEditData,
                                                providerTreatmentJoinEditData: providerTreatmentJoinEditData,
                                                treatmentEditData: treatmentEditData
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
// create a new provider.
providerRouter.get("/provider-new", function(req, res) {

    // Complete the two queries to obtain the departments and treatments
    // that the provider can be joined with in the database.
    var departmentQuerySQL = `SELECT Department.DepartmentID, Department.DepartmentName FROM Department`;
    var treatmentQuerySQL = `SELECT Treatment.TreatmentID, Treatment.TreatmentName FROM Treatment`;

    // Complete the queries in the database and display the provider-new.ejs
    // page on the website so that the user can create a new provider. Execute
    // the first query to obtain all of the departments in the database.
    database.query(departmentQuerySQL, function(error, providerEditDepartment, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // If there are no errors, execute the second query.
        } else {

            // Complete the queries in the database and display the provider-new.ejs
            // page on the website so that the user can create a new provider. Execute
            // the second query to obtain all of the treatments in the database.
            database.query(treatmentQuerySQL, function(error, providerEditTreatment, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);

                // If there are no errors, display the 
                // provider-new.ejs page to create a new 
                // provider for the website.
                } else {

                    // Render the "provider-new" page to allow the user to 
                    // create a new provider entity and add it to the database.
                    res.render("provider-new", {
                        title: "Provider New", 
                        providerEditDepartment: providerEditDepartment, 
                        providerEditTreatment: providerEditTreatment
                    });
                }
            });
        }
    });
});

/* SECTION: PROCESS REQUESTS MADE TO SERVER (POST) */

// ------------ CRUD Operations for Provider ------------
// Create a post request for when the user wants to 
// create a new provider. The provider that is created 
// by the user is added to the provider table of the
// database.
providerRouter.post("/provider-add", function(req, res) {

    // Declare a variable for the provider identifier.
    // var updateProviderID = null; // --> DO NOT THINK WE NEED THIS!!!

    // Declare variables for the values that will be passed into the
    // SQL update statement below. A series of conditionals before that
    // SQL update statement determine whether the variables will contain
    // values entered into the input or the default values.
    var providerFirstName = req.body.providerfirstname.trim();
    var providerMiddleName = req.body.providermiddlename.trim();
    var providerLastName = req.body.providerlastname.trim();
    var providerTitle = req.body.providertitle; 
    var providerDescription = req.body.providerdescription;
    var providerPhone = req.body.providerphone;
    var providerEmail = req.body.provideremail.trim();
    var providerStartDate = req.body.providerstartdate.toString().split(" "); 
    var providerEndDate; // We do not assign this variable a value immediately.

    // Create a final variable to check if the "Currently Employed"
    // checkbox was checked, which indicates that the provider is
    // currently employed and does not have an end date.
    var providerIsEmployed = req.body.providerisemployed;

    // If the user selects the checkbox, the end date is null.
    if(providerIsEmployed) {
        providerEndDate = null;  

    // If the user does not select the checkbox or the end
    // date, default to null.
    } else if(!providerIsEmployed && !providerEndDate) {
        providerEndDate = null;  

    // Otherwise, get the provider end date from the body.
    } else {
        providerEndDate = req.body.providerenddate.toString().split(" ");
    }

    // If the user has not selected an option for
    // the provider's title, default to "N/A".
    if(providerTitle == "-") {
        providerTitle = "N/A";
    }

    // Include the SQL query that will add the provider entity
    // to the provider table.
    var addProviderSQL = `INSERT INTO Provider (ProviderFirstName,
                                     ProviderMiddleName,
                                     ProviderLastName,
                                     ProviderTitle,
                                     ProviderDescription,
                                     ProviderPhone,
                                     ProviderEmail,
                                     ProviderStartDate,
                                     ProviderEndDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    // Complete the query in the database and add the provider
    // data entered by the user into the provider table of the
    // database.
    database.query(addProviderSQL, [providerFirstName, 
                         providerMiddleName,
                         providerLastName,
                         providerTitle,
                         providerDescription,
                         providerPhone,
                         providerEmail,
                         providerStartDate,
                         providerEndDate], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // ===============================================================================
            // THIS SECTION WITHIN THE "provider-add" ROUTE IS FOR DEPARTMENT AND TREATMENT JOINS
            // ===============================================================================

            // Create a variable for storing the query that will
            // add the provider ID to the "Part_Of" table and 
            // the "Administers_Treatment" table along with
            // any department and/or treatment IDs.
            var providerIDSQL = `SELECT Provider.ProviderID FROM Provider
                                    ORDER BY Provider.ProviderID DESC
                                    LIMIT 1;`;

            // Execute the query listed above in order to obtain the 
            // identifier of the provider that was just inserted into
            // the database. This is used for adding the provider along
            // with any departments and/or treatments to their respective
            // tables.
            database.query(providerIDSQL, function(error, providerIdData, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);

                // Otherwise, complete the JOIN operations below.
                } else {
                    
                    // ===============================================================================
                    // THIS SECTION WITHIN THE "provider-add" ROUTE IS FOR DEPARTMENT JOINS
                    // FOR WHEN YOU ADD THE PROVIDER BEING CREATED TO THE DATABASE.
                    // ===============================================================================

                    // Create a variable to store the department data that may
                    // have been entered by the user on the "provider-new" page.
                    var departmentIdSelected = req.body.providerdepartment;

                    // Check if the user selected a department that was
                    // listed on the "provider-new.ejs" page. If there
                    // was a department selected, complete the actions 
                    // below.
                    if(departmentIdSelected && departmentIdSelected != "-") {

                        // Create a query variable for adding the provider 
                        // and department identifiers to the "Part_Of" table.
                        var joinProviderDepartmentSQL = `INSERT INTO Part_Of (Part_ProviderID, 
                                                            Part_DepartmentID) VALUES (?, ?);`;

                        // ======================================================================
                        // NOTE: There should be no need to check if the user selected more
                        // than on department because they can only ever select one department.
                        // ======================================================================
                        // Complete the query in the database and add the provider
                        // data entered by the user into the "Part_Of" table of
                        // the database.
                        database.query(joinProviderDepartmentSQL, [providerIdData[0].ProviderID, departmentIdSelected], function(error, data, fields) {

                            // If there is an error, log the error.
                            if(error) {
                                console.log(error);

                            // Otherwise, complete the actions below.
                            } else {

                                // For now, do nothing.
                            }
                        });
                    }

                    // ===============================================================================
                    // THIS SECTION WITHIN THE "provider-add" ROUTE IS FOR TREATMENT JOINS
                    // FOR WHEN YOU ADD THE DEPARTMENT BEING CREATED TO THE DATABASE.
                    // ===============================================================================

                    // Create a variable to store the treatment data that may
                    // have been entered by the user on the "provider-new" page.
                    var treatmentsIdSelected = req.body.treatmentforprovider;

                    // Check if the user selected any of the treatments that 
                    // were listed on the "provider-new.ejs" page. If there
                    // were treatments selected, complete the actions below.
                    if(treatmentsIdSelected) {

                        // Create a query variable for adding the provider and
                        // treatment identifiers to the "Administers_Treatment" table.
                        var joinProviderTreatmentSQL = `INSERT INTO Administers_Treatment (Administers_ProviderID, 
                                                            Administers_TreatmentID) VALUES (?, ?);`;

                        // If only one treatment was selected, then
                        // execute the query to insert the treatment ID
                        // and the provider ID in the "Administers_Treatment"
                        // table to help show the relationship between
                        // the provider and treatment entities.
                        if(treatmentsIdSelected.length == 1) {

                            // Complete the query in the database and add the provider
                            // and treatment data entered by the user into the 
                            // "Administers_Treatment" table of the database.
                            database.query(joinProviderTreatmentSQL, [providerIdData[0].ProviderID, treatmentsIdSelected], function(error, data, fields) {

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
                        // and add their identifiers along with the provider 
                        // ID to the "Administers_Treatment" table.
                        } else if(treatmentsIdSelected.length > 1) {

                            // Create a for loop to add each treatment that was selected,
                            // assuming that there were multiple treatments selected, to
                            // the "Administers_Treatment" table along with the provider
                            // ID that was obtained.
                            for(var i = 0; i < treatmentsIdSelected.length; i++) {

                                // Complete the query in the database and add the treatment
                                // data entered by the user into the "Administers_Treatment"
                                // table of the database.
                                database.query(joinProviderTreatmentSQL, [providerIdData[0].ProviderID, treatmentsIdSelected[i]], function(error, data, fields) {

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
            
            // Redirect the route back to the main providers page
            // after adding the provider to the database.
            // Add a flash message indicating that the provider was
            // successfully added to the database.
            req.flash("providerChange", "Provider created.");
            res.redirect("/providers");
        }
    });
});

// Create a post request for when the user wants to
// update a given provider.
providerRouter.post("/provider-update", function(req, res) {

    // ================================================================
    // The function ensures that the date attributes are 
    // entered properly into the database if/when the user 
    // updates the data.
    function simplifyDateShorthand(eventDate) {

        // Check if the date being entered is undefined.
        // (This would indicate that the provider does
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

    // Declare a variable for the provider identifier.
    var updateProviderID = req.body.defaultproviderid;

    // Declare variables for the values that will be passed into the
    // SQL update statement below. A series of conditionals before that
    // SQL update statement determine whether the variables will contain
    // values entered into the input or the default values.
    var providerFirstName = req.body.providerfirstname.trim();
    var providerMiddleName = req.body.providermiddlename.trim();
    var providerLastName = req.body.providerlastname.trim();
    var providerTitle = req.body.providertitle; 
    var providerDescription = req.body.providerdescription;
    var providerPhone = req.body.providerphone;
    var providerEmail = req.body.provideremail.trim();
    var providerStartDate = req.body.providerstartdate; 
    var providerEndDate = req.body.providerenddate;

    // Create a final variable to check if the "Currently Employed"
    // checkbox was checked, which indicates that the provider is
    // currently employed and does not have an end date.
    var providerIsEmployed = req.body.providerisemployed;

    // Include a series of conditionals to determine if any of
    // the default values need to be utilized in the process of
    // updating the provider in the database.
    if(!providerFirstName) {
        providerFirstName = req.body.defaultproviderfirstname.trim();
    }
    if(!providerMiddleName) {
        providerMiddleName = req.body.defaultprovidermiddlename.trim();
    }
    if(!providerLastName) {
        providerLastName = req.body.defaultproviderlastname.trim();
    }
    if(!providerTitle || providerTitle == "-") {
        providerTitle = req.body.defaultprovidertitle;
    }
    if(!providerDescription) {
        providerDescription = req.body.defaultproviderdescription.trim();
    }
    if(!providerPhone) {
        providerPhone = req.body.defaultproviderphone;
    }
    if(!providerEmail) {
        providerEmail = req.body.defaultprovideremail.trim();
    }
    if(!providerStartDate) {
        providerStartDate = simplifyDateShorthand(req.body.defaultproviderstartdate);
    } else {
        providerStartDate = req.body.providerstartdate.toString().split(" ");  
    }
    if(!providerEndDate) {
        providerEndDate = simplifyDateShorthand(req.body.defaultproviderenddate);
    } else {
        providerEndDate = req.body.providerenddate.toString().split(" ");  
    }
    if(providerIsEmployed) {
        providerEndDate = null;  
    }

    // Include the SQL query that will update the provider entity
    // in the provider table.
    var sql = `UPDATE Provider 
                SET ProviderFirstName = ?, ProviderMiddleName = ?, ProviderLastName = ?, ProviderTitle = ?, ProviderDescription = ?, ProviderPhone = ?, ProviderEmail = ?, ProviderStartDate = ?, ProviderEndDate = ?
               WHERE ProviderID = ?;`;

    // Complete the query in the database and display the provider
    // data that the user wants to edit on a page for that provider.
    database.query(sql, [providerFirstName, 
                         providerMiddleName,
                         providerLastName,
                         providerTitle,
                         providerDescription,
                         providerPhone,
                         providerEmail,
                         providerStartDate,
                         providerEndDate,
                         updateProviderID], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // ===============================================================================
            // THIS SECTION WITHIN THE "provider-update" ROUTE IS FOR PROVIDER AND DEPARTMENT 
            // JOINS FOR CASES WHERE YOU WANT TO <REMOVE/ADD> A DEPARTMENT FROM THE PROVIDER.
            // ===============================================================================

            // Create a variable to store the department identifier for the
            // department that the user wishes to REMOVE/ADD from the "Part_Of"
            // table. This variable will be used in the remove/add queries.
            var providerUpdateDepartmentsID = req.body.updateproviderdepartment;

            // If the user selected any of the departments that
            // were listed on the "provider-edit" page to be 
            // updated (removed or added)
            if(providerUpdateDepartmentsID && providerUpdateDepartmentsID != "-") {

                // If the user selected a "Remove" option, then 
                // simply remove the provider ID from the "Part_Of"
                // table in the database.  
                if(providerUpdateDepartmentsID.includes("Remove")) {

                    // Create a variable for storing the query that will remove
                    // the department from the "Part_Of" table in the database.
                    var removeProviderDepartmentJoinSQL = `DELETE FROM Part_Of WHERE Part_ProviderID = ? AND Part_DepartmentID = ?;`;
                    
                    // If the user selected the "Remove" department option, then split
                    // the string that was attached to the value passed into the request
                    // and obtain the department ID that you want removed.
                    providerUpdateDepartmentsID = providerUpdateDepartmentsID.split("-")[1];

                    // Execute the query to remove the department that was previously
                    // assigned to the provider.
                    database.query(removeProviderDepartmentJoinSQL, [updateProviderID, providerUpdateDepartmentsID], function(error, data, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // Otherwise, complete the actions below.
                        } else {

                            // For now, do nothing.
                        }
                    });

                // If the user selected a different department
                // to add the provider to, then first remove
                // the provider from their original department
                // that they were part of. Then add the provider
                // the new department that was selected.
                } else {

                    // First, create a variable for storing the query that will
                    // remove the department from the "Part_Of" table in the
                    // database BEFORE adding the provider to the new department
                    // that was selected.
                    var firstRemoveProviderDepartmentJoinSQL = `DELETE FROM Part_Of WHERE Part_ProviderID = ?;`;

                    // Next, create a variable for storing the query that will add
                    // the provider and its department to the "Part_Of" table in the 
                    // database.
                    var addProviderDepartmentJoinSQL = `INSERT INTO Part_Of (Part_ProviderID, 
                                                            Part_DepartmentID) VALUES (?, ?);`;

                    // Execute the first query to remove the department that was previously
                    // assigned to the provider before executing the second query to add
                    // the provider to the new department that was selected.
                    database.query(firstRemoveProviderDepartmentJoinSQL, [updateProviderID], function(error, data, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);

                        // If there are no errors, the complete the
                        // second query to add the new provider to
                        // the department that was selected.
                        } else {

                            database.query(addProviderDepartmentJoinSQL, [updateProviderID, providerUpdateDepartmentsID], function(error, data, fields) {

                                // If there is an error, log the error.
                                if(error) {
                                    console.log(error);
        
                                // Otherwise, complete the actions below.
                                } else {
        
                                    // For now, do nothing.
                                }
                            });
                        }
                    });
                }
            }

            // ===============================================================================
            // THIS SECTION WITHIN THE "provider-update" ROUTE IS FOR PROVIDER AND TREATMENT 
            // JOINS FOR CASES WHERE YOU WANT TO <REMOVE> TREATMENTS FROM THE PROVIDERS.
            // ===============================================================================
            
            // Create a variable to store the treatment identifiers for the treatments
            // that the user wishes to REMOVE from the "Administers_Treatment" table. This
            // variable will be used in the remove query.
            var providerUpdateRemoveTreatments = req.body.removetreatmentforprovider;

            // Check if the user selected any of the treatments that
            // were listed on the "provider-edit" page to be removed.
            if(providerUpdateRemoveTreatments) {

                // Create a variable for storing the query that will remove
                // the treatment from the "Administers_Treatment" table in the database.
                var removeProviderTreatmentJoinSQL = `DELETE FROM Administers_Treatment WHERE Administers_ProviderID = ? AND Administers_TreatmentID = ?;`;

                // If only one treatment was selected, then execute
                // the query to remove the treatment ID and the
                // provider ID from the "Administers_Treatment" 
                // table.
                if(providerUpdateRemoveTreatments.length == 1) {

                    // If only one treatment was selected to be removed 
                    // in the update route, then execute the query to
                    // remove the treatment associated with the given 
                    // provider from the "Administers_Treatment" table.
                    database.query(removeProviderTreatmentJoinSQL, [updateProviderID, providerUpdateRemoveTreatments], function(error, data, fields) {

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
                // corresponding provider identifier from the
                // "Receives_Treatment" table.
                } else if(providerUpdateRemoveTreatments.length > 1) {

                    // Create a for loop to remove each treatment that was selected,
                    // assuming that there were multiple treatments selected, from
                    // the "Administers_Treatment" table along with the provider ID
                    // that was obtained.
                    for(var i = 0; i < providerUpdateRemoveTreatments.length; i++) {

                        // Complete the query in the database and remove the treatment
                        // data from the "Receives_Treatment" table in the database.
                        database.query(removeProviderTreatmentJoinSQL, [updateProviderID, providerUpdateRemoveTreatments[i]], function(error, data, fields) {

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
            // THIS SECTION WITHIN THE "provider-update" ROUTE IS FOR PROVIDER AND TREATMENT 
            // JOINS FOR CASES WHERE YOU WANT TO <ADD> TREATMENTS TO THE PROVIDERS.
            // ===============================================================================
            
            // Create a variable to store the treatment identifiers for the
            // treatments that the user wishes to ADD to the "Administers_Treatment"
            // table. This variable will be used in the add query. 
            var providerUpdateAddTreatments = req.body.addtreatmentforprovider;

            // Check if the user selected any of the treatments that
            // were listed on the "provider-edit" page to be added.
            if(providerUpdateAddTreatments) {

                // Create a variable for storing the query that will add
                // the treatment to the "Administers_Treatment" table in
                // the database.
                var addProviderTreatmentJoinSQL = `INSERT INTO Administers_Treatment (Administers_ProviderID, 
                                                    Administers_TreatmentID) VALUES (?, ?);`;

                // If only one treatment was selected, then 
                // execute the query to add the treatment ID
                // and the provider ID to the "Administers_Treatment" 
                // table.
                if(providerUpdateAddTreatments.length == 1) {

                    // If only one treatment was selected to be added 
                    // in the update route, then execute the query to
                    // add the treatment associated with the given 
                    // provider to the "Administers_Treatment" table.
                    database.query(addProviderTreatmentJoinSQL, [updateProviderID, providerUpdateAddTreatments], function(error, data, fields) {

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
                // corresponding provider identifier to the
                // "Administers_Treatment" table.
                } else if(providerUpdateAddTreatments.length > 1) {

                    // Create a for loop to add each treatment that was selected,
                    // assuming that there were multiple treatments selected, to
                    // the "Administers_Treatment" table along with the provider
                    // ID that was obtained.
                    for(var j = 0; j < providerUpdateAddTreatments.length; j++) {

                        // Complete the query in the database and add the treatment
                        // data entered by the user into the "Administers_Treatment"
                        // table of the database.
                        database.query(addProviderTreatmentJoinSQL, [updateProviderID, providerUpdateAddTreatments[j]], function(error, data, fields) {

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

            // Redirect the route back to the main providers page.
            // Add a flash message indicating that the provider was
            // successfully updated in the database.
            req.flash("providerChange", "Provider updated.");
            res.redirect("/providers");
        }
    });
});

// Create a post request for when the user wants to
// remove a given provider.
providerRouter.post("/provider-remove", function(req, res) {

    // Obtain the provider identifier of the provider that
    // the user wants to remove from the database, and 
    // store the provider ID in a variable.
    var removeProvider = req.body.provideridentifier;

    // Include a SQL query that will remove the selected 
    // provider entity from the "Cares_For" relationship
    // table in the database.
    var removeCaresJoinSQL = `DELETE FROM Cares_For WHERE Cares_ProviderID = ?;`;

    // Include a SQL query that will remove the selected 
    // provider entity from the "Administers_Treatment" 
    // relationship table in the database.
    var removeAdministersJoinSQL = `DELETE FROM Administers_Treatment WHERE Administers_ProviderID = ?;`;

    // Include a SQL query that will remove the selected 
    // provider entity from the "Part_Of" relationship
    // table in the database.
    var removePartOfJoinSQL = `DELETE FROM Part_Of WHERE Part_ProviderID = ?;`;

    // Include the SQL query that will remove the selected
    // provider entity from the provider table in the database.
    var removeProviderSQL = `DELETE FROM Provider WHERE ProviderID = ?;`;

    // Complete the first query in the database and remvoe the provider
    // that the user selected frmo the "Cares_For" join relationship.
    // Then complete the second query in the database and remove the
    // provider that the user selected from the "Administers_Treatment"
    // join relationship. Then complete the third query in the database
    // and remove the provider that the user selected from the join
    // "Part_Of" relationship table. All of this must be completed before 
    // removing the provider from the "Provider" table.
    database.query(removeCaresJoinSQL, [removeProvider], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);

        // If there are no errors, then complete the second query.
        } else {

            // The second query removes the provider entity that
            // the user selected from the "Administers_Treatment"
            // table
            database.query(removeAdministersJoinSQL, [removeProvider], function(error, data, fields) {

                // If there is an error, log the error.
                if(error) {
                    console.log(error);
        
                // If there are no errors, then complete the third query.
                } else {
        
                    // The third query removes the provider entity that
                    // the user selected from the "Part_Of" table.
                    database.query(removePartOfJoinSQL, [removeProvider], function(error, data, fields) {

                        // If there is an error, log the error.
                        if(error) {
                            console.log(error);
                
                        // If there are no errors, then complete the fourth query.
                        } else {

                            // The fourth query removes the provider entity that
                            // the user selected from the "Provider" table.
                            database.query(removeProviderSQL, [removeProvider], function(error, data, fields) {

                                // If there is an error, log the error.
                                if(error) {
                                    console.log(error);

                                // Complete the final actions below.
                                } else {

                                    // Redirect the route back to the main providers page.
                                    // Add a flash message indicating that the provider was
                                    // successfully removed from the database.
                                    req.flash("providerChange", "Provider removed.");
                                    res.redirect("/providers");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

// Export the module for use in the main app.js file.
module.exports = providerRouter;
