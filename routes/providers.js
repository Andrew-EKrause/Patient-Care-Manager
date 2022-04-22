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
    var sql = `SELECT * FROM Provider`;

    // Get all of the providers from the providers table.
    database.query(sql, function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Otherwise, send the data to the
            // providers.ejs page in order to 
            // display that data.
            res.render("providers", {
                title: "Provider List", 
                providerData: data,
                providerChange: req.flash("providerChange")
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
    var sql = `SELECT * FROM Provider 
                WHERE Provider.ProviderID = ?`;

    // Complete the query in the database and display the provider
    // data that the user wants to edit on a page for that provider.
    database.query(sql, [requestedProviderId], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Otherwise, send the data to the
            // provider-edit.ejs page in order to 
            // allow the user to edit that data.
            res.render("provider-edit", {title: "Provider Edit", providerEdit: data});
        }
    });
});

// Create a get request for when the user wants to 
// create a new provider.
providerRouter.get("/provider-new", function(req, res) {

    // Render the "provider-new" page to allow the user to 
    // create a new provider entity and add it to the database.
    res.render("provider-new");
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
    var sql = `INSERT INTO Provider (ProviderFirstName,
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
    database.query(sql, [providerFirstName, 
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

    // Include the SQL query that will remove the selected
    // provider entity from the provider table in the database.
    var sql = `DELETE FROM Provider WHERE ProviderID = ?;`;

    // Complete the query in the database and remove the provider
    // that the user selected from the database. 
    database.query(sql, [removeProvider], function(error, data, fields) {

        // If there is an error, log the error.
        if(error) {
            console.log(error);
        } else {

            // Redirect the route back to the main providers page.
            // Add a flash message indicating that the provider was
            // successfully removed from the database.
            req.flash("providerChange", "Provider removed.");
            res.redirect("/providers");
        }
    });
});

// Export the module for use in the main app.js file.
module.exports = providerRouter;
