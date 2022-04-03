/**
 * The file contains the setup for the Patient
 * Care Manager (PCM) database project. The 
 * project was created as the final semester
 * assignment for databases (CS 364) at UWL.
 * In this file, SQL code for creating the
 * tables in the database as well as the 
 * three complex queries for the project are
 * provided.
 *
 * NOTE: When you are testing, updating, and 
 * working with your database, you can simply
 * copy and paste all or parts of the code in
 * this file into SQLiteStudio or whatever else
 * you are working with.
 *
 * Author: Andrew Krause
 * Date: 05/01/2022
 */

/*
    ========================================================
    SECTION: CREATE THE PATIENT CARE MANAGER (PCM) DATABASE
    ========================================================
*/

/*
    Simple code for creating the PCM database.
*/
CREATE DATABASE PCM;

/* 
    Code for making the database the DEFAULT database.
*/
--> WORRY ABOUT/MAYBE ADD LATER!!!

/*
    Simple code for removing the ENTIRE database.
    --> WARNING: This action cannot be undone.
*/
DROP DATABASE PCM;

/*
    Simple code for removing an ENTIRE table
    in the database. 
    --> WARNING: This action cannot be undone.
*/
DROP TABLE Table_Name_Goes_Here

/*
    ========================================================
    SECTION: CREATE THE TABLES FOR THE PCM DATABASE PROJECT
    ========================================================
*/

/* 
    Create the PATIENT table for the database. 
    <-- The RED color in your ER diagram. -->
*/
CREATE TABLE Patient (
    PatientID INTEGER PRIMARY KEY AUTO_INCREMENT, /* The unique identifier of each Patient entity. */
    PatientNotes NVARCHAR(255) NOT NULL, /* Description of patient condition/visit. */
    PatientFirstName NVARCHAR NOT NULL, /* First name of patient. */
    PatientMiddleName NVARCHAR NOT NULL, /* Middle name of patient. */
    PatientLastName NVARCHAR NOT NULL, /* Last name of patient. */
    PatientBirtdate NVARCHAR(10) NOT NULL, /* Birthdate of patient. */
    PatientWeight INTEGER NOT NULL, /* Weight of patient. */
    PatientPhone NVARCHAR(12) NOT NULL, /* Phone number of patient. */
    PatientEmail NVARCHAR NOT NULL, /* Email address of patient. */
    PatientHeight NUMERIC(2, 1) NOT NULL, /* Height of patient. */
    PatientStartDate NVARCHAR(10) NOT NULL, /* Date patient was admitted to the hospital. */
    PatientEndDate NVARCHAR(10) /* Date patient was discharged from hospital - can be NULL. */
    /* PatientAge SMALLINT AS (TIMESTAMPDIFF(YEAR, PatientBirthdate, CURDATE())) */
    /* 
        The PatientAge is a derived attribute that is calculated from the 
        difference between the current year and the patient's birthdate -
        specifically their birth year. // --> ASK SAUPPE ABOUT THIS!!!
    */
);

/* 
    Create the TREATMENT table for the database. 
    <-- The GREEN color in your ER diagram. -->
*/
CREATE TABLE Treatment (
    TreatmentID INTEGER PRIMARY KEY AUTOINCREMENT, /* The unique identifier of each Treatment entity. */
    TreatmentName NVARCHAR NOT NULL, /* Name of the treatment. */  
    TreatmentRequirements NVARCHAR NOT NULL, /* The patient state of health and other factors listed here. */
    TreatmentDescription NVARCHAR NOT NULL, /* Description of the treatment procedure. */
    TreatmentTools NVARCHAR NOT NULL, /* This attribute is a list of tools used in the treatment. */
    TreatmentRiskIndex INTEGER NOT NULL /* The risk index is out of 0-10 with ten as most serious. */
);

/* 
    Create the PROVIDER table for the database. 
    <-- The BLUE color in your ER diagram. -->
*/
CREATE TABLE ProviderM (
    ProviderID INTEGER PRIMARY KEY AUTOINCREMENT, /* The unique identifier of each ProviderM entity. */
    ProviderEmail NVARCHAR NOT NULL, /* Email address of the provider. */  
    ProviderFirstName NVARCHAR NOT NULL, /* First name of provider. */
    ProviderMiddleName NVARCHAR NOT NULL, /* Middle name of provider. */
    ProviderLastName NVARCHAR NOT NULL, /* Last name of provider. */
    ProviderTitle NVARCHAR NOT NULL, /* Title of provider - like 'Doctor'. */
    ProviderStartDate NVARCHAR(10) NOT NULL, /* Date provider started working at hospital. */
    ProviderEndDate NVARCHAR(10), /* Date provider stopped working at hospital -  can be NULL. */
    ProviderPhone NVARCHAR(12) NOT NULL /* Phone number of provider. */
    /* ProviderYearsAtHospital SMALLINT AS (TIMESTAMPDIFF(YEAR, PatientBirthdate, CURDATE())) */
    /* 
        The ProviderYearsAtHospital is a derived attribute that is calculated from the 
        difference between the current year and the provider's start date at the hospital.
    */
);

/* --> REMEMBER THAT THE URGENT VIEW WILL BE CREATED VIA A COMPLEX QUERY!!! */

/* 
    Create the DEPARTMENT table for the database. 
    <-- The ORANGE color in your ER diagram. -->
*/
CREATE TABLE Department (
    DepartmentID INTEGER PRIMARY KEY AUTOINCREMENT, /* The unique identifier of each Department entity. */
    DepartmentName NVARCHAR NOT NULL, /* Name of the department. */
    DepartmentLocation NVARCHAR NOT NULL, /* Location of department. */
    DepartmentDescription NVARCHAR NOT NULL /* Description of department. */
    /*  
        The number of department members is one of the 
        queries that you are writing for the database. 
        Though not a direct attribute, the number of
        members in each department will be displayed
        in the interface for the project as a result 
        from one of the three queries you have to write.
    */
);

/* 
    Create the RECEIVES table that describes the relationship
    between the PATIENT table and the TREATMENT table in the 
    database. 
    <-- Think the PURPLE color between the PATIENT and -->
    <-- TREATMENT tables in your ER diagram. -->
*/
CREATE TABLE Receives (
    PatientReceivesID INTEGER NOT NULL, /* Create an variable to store the patient ID. */
    TreatmentRecevivesID INTEGER NOT NULL, /* Create a variable to store the treatment ID. */
    TreatmentStartDate NVARCHAR(11), /* The date the treatment started being administered. */
    TreatmentEndDate NVARCHAR(11), /* The date the treatment stopped being administered. */
    CONSTRAINT fk_patient_id FOREIGN KEY (PatientReceivesID) REFERENCES Patient(PatientID), /* Foreign key. */
    CONSTRAINT fk_treatment_id FOREIGN KEY (TreatmentRecevivesID) REFERENCES Treatment(TreatmentID) /* Foreign key. */
);

/* 
    Create the CARES_FOR table that describes the relationship
    between the PROVIDER table and the PATIENT table in the 
    database. 
    <-- Think the PURPLE color between the PROVIDER and -->
    <-- PATIENT tables in your ER diagram. -->
*/
CREATE TABLE Cares_For (
    ProviderCareID INTEGER NOT NULL,
    PatientCareID INTEGER NOT NULL,
    BeganSeeing NVARCHAR(11),
    StoppedSeeing NVARCHAR(11),
    CONSTRAINT fk_provider_id FOREIGN KEY (ProviderCareID) REFERENCES ProviderM(ProviderID),
    CONSTRAINT fk_patient_id FOREIGN KEY (PatientCareID) REFERENCES Patient(PatientID) /* CAN YOU HAVE THE SAME FOREIGN KEY NAME HERE AS ABOVE??? */
);

/* 
    Create the ADMINISTERS table that describes the relationship
    between the PROVIDER table and the TREATMENT table in the 
    database. 
    <-- Think the PURPLE color between the PROVIDER and -->
    <-- TREATMENT tables in your ER diagram. -->
*/
CREATE TABLE Administers (
    ProviderAdministerID INTEGER NOT NULL,
    TreatmentAdministerID INTEGER NOT NULL,
    CONSTRAINT fk_provider_id FOREIGN KEY (ProviderAdministerID) REFERENCES ProviderM(ProviderID),
    CONSTRAINT fk_treatment_id FOREIGN KEY (TreatmentAdministerID) REFERENCES Treatment(TreatmentID)
);

/* 
    Create the PART_OF table that describes the relationship
    between the PROVIDER table and the DEPARTMENT table in the 
    database. 
    <-- Think the PURPLE color between the PROVIDER and -->
    <-- DEPARTMENT tables in your ER diagram. -->
*/
CREATE TABLE Part_Of (
    ProviderPartOfID INTEGER NOT NULL,
    DepartmentPartOfID INTEGER NOT NULL,
    CONSTRAINT fk_provider_id FOREIGN KEY (ProviderPartOfID) REFERENCES ProviderM(ProviderID),
    CONSTRAINT fk_department_id FOREIGN KEY (DepartmentPartOfID) REFERENCES Department(DepartmentID)
);

/*
    ========================================================
    SECTION: INSERT DATA INTO ALL OF THE TABLES OF THE PCM
    ========================================================
*/
/* --> FOR NOW WORK WITH SMALLER DATA SETS. WHEN YOU GET THE PROJECT UP AND RUNNING, YOU CAN ALWAYS AD MORE!!! */

/* INSERT into the PATIENT table. */
-- Entry 1/10 --> <WAS ALREADY INSERTED INTO DATABASE>
INSERT INTO Patient(PatientNotes, PatientFirstName, PatientMiddleName, PatientLastName, 
                    PatientBirtdate, PatientWeight, PatientPhone, PatientEmail, PatientHeight,
                    PatientStartDate) 
             VALUES('Patient is here for a tonsillectomy.', 'Jeremy', 'Andrew', 'Carter', '05/27/2016',
                    80, '507-943-1497', 'jcarter@gmail.com', 5.3, '06/17/2022');

-- Entry 2/10 --> <WAS ALREADY INSERTED INTO DATABASE>
INSERT INTO Patient(PatientNotes, PatientFirstName, PatientMiddleName, PatientLastName, 
                    PatientBirtdate, PatientWeight, PatientPhone, PatientEmail, PatientHeight,
                    PatientStartDate) 
             VALUES('Patient is here for a chemotherapy.', 'Ryan', 'McCarther', 'Johnson', '09/03/1970',
                    170, '608-195-0174', 'ryanM@gmail.com', 5.11, '01/12/2022');

-- Entry 3/10 --> <WAS ALREADY INSERTED INTO DATABASE>
INSERT INTO Patient(PatientNotes, PatientFirstName, PatientMiddleName, PatientLastName, 
                    PatientBirtdate, PatientWeight, PatientPhone, PatientEmail, PatientHeight,
                    PatientStartDate) 
             VALUES('Patient is here for a caesarean section.', 'Jennifer', 'Helen', 'Krasinski', '09/03/1983',
                    165, '608-273-0982', 'jhelen@gmail.com', 5.6, '07/24/2022');

-- Entry 4/10 --> <WAS ALREADY INSERTED INTO DATABASE>
INSERT INTO Patient(PatientNotes, PatientFirstName, PatientMiddleName, PatientLastName, 
                    PatientBirtdate, PatientWeight, PatientPhone, PatientEmail, PatientHeight,
                    PatientStartDate) 
             VALUES('Patient is here for a hip fracture.', 'Dan', 'Anderson', 'Hinckley', '04/24/1980',
                    195, '507-345-9031', 'jhelen@gmail.com', 6.1, '05/18/2022');

-- Entry 5/10 --> <WAS ALREADY INSERTED INTO DATABASE>
INSERT INTO Patient(PatientNotes, PatientFirstName, PatientMiddleName, PatientLastName, 
                    PatientBirtdate, PatientWeight, PatientPhone, PatientEmail, PatientHeight,
                    PatientStartDate) 
             VALUES('Patient is here for a lung cancer screening.', 'Erika', 'Brown', 'Nelson', '12/15/1995',
                    210, '608-273-0982', 'erika-brown@gmail.com', 5.8, '06/30/2022');

-- Entry 6/10 --> <WAS ALREADY INSERTED INTO DATABASE>
INSERT INTO Patient(PatientNotes, PatientFirstName, PatientMiddleName, PatientLastName, 
                    PatientBirtdate, PatientWeight, PatientPhone, PatientEmail, PatientHeight,
                    PatientStartDate) 
             VALUES('Patient is here for cardiac arrhythmia.', 'Adrian', 'Chris', 'Jackson', '8/09/2000',
                    258, '507-801-9005', 'acjackson@gmail.com', 6.3, '02/21/2022');

-- Entry 7/10 --> <WAS ALREADY INSERTED INTO DATABASE>
INSERT INTO Patient(PatientNotes, PatientFirstName, PatientMiddleName, PatientLastName, 
                    PatientBirtdate, PatientWeight, PatientPhone, PatientEmail, PatientHeight,
                    PatientStartDate) 
             VALUES('Patient is here for wisdom teeth removal.', 'Braxton', 'Jay', 'Feldonworth', '10/11/2002',
                    155, '507-438-9823', 'bfeldonworth.com', 4.11, '09/24/2022');

/*
    ========================================================
    SECTION: CREATE THE QUERIES FOR THE PCM DATABASE PROJECT
    ========================================================
*/








