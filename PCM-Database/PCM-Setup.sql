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
    Here we creat and use the database if the
    database does not already exist.
*/
CREATE DATABASE IF NOT EXISTS PCM;
USE PCM;

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
    PatientID int NOT NULL AUTO_INCREMENT,
    PatientNotes varchar(255) NOT NULL,
    PatientFirstName varchar(50) NOT NULL,
    PatientMiddleName varchar(50) NOT NULL,
    PatientLastName varchar(50) NOT NULL,
    PatientBirthdate date NOT NULL,
    PatientSex varchar(6) NOT NULL,
    PatientWeight decimal(6,2) NOT NULL,
    PatientRiskIndex int NOT NULL,
    PatientPhone varchar(12) NOT NULL,
    PatientEmail varchar(50) NOT NULL,
    PatientHeight decimal(4,2) NOT NULL,
    PatientStartDate date NOT NULL,
    PatientEndDate date DEFAULT NULL,
    PRIMARY KEY (PatientID),
    UNIQUE KEY PatientID_UNIQUE (PatientID)
);

/* 
    Create the TREATMENT table for the database. 
    <-- The GREEN color in your ER diagram. -->
*/
CREATE TABLE Treatment (
    TreatmentID int NOT NULL AUTO_INCREMENT,
    TreatmentName varchar(60) NOT NULL,
    TreatmentRequirements varchar(255) NOT NULL,
    TreatmentDescription varchar(255) NOT NULL,
    TreatmentRiskIndex int NOT NULL,
    TreatmentTools varchar(255) NOT NULL,
    PRIMARY KEY (TreatmentID),
    UNIQUE KEY idTreatment_UNIQUE (TreatmentID)
);

/* 
    Create the PROVIDER table for the database. 
    <-- The BLUE color in your ER diagram. -->
*/
CREATE TABLE Provider (
    ProviderID int NOT NULL AUTO_INCREMENT,
    ProviderFirstName varchar(50) NOT NULL,
    ProviderMiddleName varchar(50) NOT NULL,
    ProviderLastName varchar(50) NOT NULL,
    ProviderTitle varchar(50) NOT NULL,
    ProviderDescription varchar(255) NOT NULL,
    ProviderPhone varchar(50) NOT NULL,
    ProviderEmail varchar(50) NOT NULL,
    ProviderStartDate date NOT NULL,
    ProviderEndDate date DEFAULT NULL,
    PRIMARY KEY (ProviderID),
    UNIQUE KEY ProviderID_UNIQUE (ProviderID)
);

/* --> REMEMBER THAT THE URGENT VIEW WILL BE CREATED VIA A COMPLEX QUERY!!! */

/* 
    Create the DEPARTMENT table for the database. 
    <-- The ORANGE color in your ER diagram. -->
*/
CREATE TABLE Department (
    DepartmentID int NOT NULL AUTO_INCREMENT,
    DepartmentName varchar(60) NOT NULL,
    DepartmentLocation varchar(60) NOT NULL,
    DepartmentDescription varchar(255) NOT NULL,
    PRIMARY KEY (DepartmentID),
    UNIQUE KEY idDepartment_UNIQUE (DepartmentID)
);

/* 
    Create the RECEIVES table that describes the relationship
    between the PATIENT table and the TREATMENT table in the 
    database. 
    <-- Think the PURPLE color between the PATIENT and -->
    <-- TREATMENT tables in your ER diagram. -->
*/
CREATE TABLE Receives_Treatment (
    Receives_PatientID int NOT NULL,
    Receives_TreatmentID int NOT NULL,
    PRIMARY KEY (Receives_PatientID, Receives_TreatmentID),
    KEY Receives_TreatmentID_idx (Receives_TreatmentID),
    CONSTRAINT Receives_PatientID FOREIGN KEY (Receives_PatientID) REFERENCES Patient (PatientID),
    CONSTRAINT Receives_TreatmentID FOREIGN KEY (Receives_TreatmentID) REFERENCES Treatment (TreatmentID)
);

/* 
    Create the CARES_FOR table that describes the relationship
    between the PROVIDER table and the PATIENT table in the 
    database. 
    <-- Think the PURPLE color between the PROVIDER and -->
    <-- PATIENT tables in your ER diagram. -->
*/
CREATE TABLE Cares_For (
    Cares_PatientID int NOT NULL,
    Cares_ProviderID int NOT NULL,
    PRIMARY KEY (Cares_PatientID, Cares_ProviderID),
    KEY Cares_ProviderID_idx (Cares_ProviderID),
    CONSTRAINT Cares_PatientID FOREIGN KEY (Cares_PatientID) REFERENCES Patient (PatientID),
    CONSTRAINT Cares_ProviderID FOREIGN KEY (Cares_ProviderID) REFERENCES Provider (ProviderID)
);

/* 
    Create the ADMINISTERS table that describes the relationship
    between the PROVIDER table and the TREATMENT table in the 
    database. 
    <-- Think the PURPLE color between the PROVIDER and -->
    <-- TREATMENT tables in your ER diagram. -->
*/
CREATE TABLE Administers_Treatment (
    Administers_ProviderID int NOT NULL,
    Administers_TreatmentID int NOT NULL,
    PRIMARY KEY (Administers_ProviderID, Administers_TreatmentID),
    KEY Administer_TreatmentID_idx (Administers_TreatmentID),
    CONSTRAINT Administer_ProviderID FOREIGN KEY (Administers_ProviderID) REFERENCES Provider (ProviderID),
    CONSTRAINT Administer_TreatmentID FOREIGN KEY (Administers_TreatmentID) REFERENCES Treatment (TreatmentID)
);

/* 
    Create the PART_OF table that describes the relationship
    between the PROVIDER table and the DEPARTMENT table in the 
    database. 
    <-- Think the PURPLE color between the PROVIDER and -->
    <-- DEPARTMENT tables in your ER diagram. -->
*/
CREATE TABLE Part_Of (
    Part_ProviderID int NOT NULL,
    Part_DepartmentID int NOT NULL,
    PRIMARY KEY (Part_ProviderID, Part_DepartmentID),
    KEY Part_DepartmentID_idx (Part_DepartmentID),
    CONSTRAINT Part_DepartmentID FOREIGN KEY (Part_DepartmentID) REFERENCES Department (DepartmentID),
    CONSTRAINT Part_ProviderID FOREIGN KEY (Part_ProviderID) REFERENCES Provider (ProviderID)
);

/*
    ========================================================
    SECTION: CREATE THE 3 QUERIES FOR THE PCM DATABASE PROJECT
    ========================================================
*/

-- /* Complex Query <1> - Top 5 Highest Risk Patients */

-- SELECT * FROM Patient
--     WHERE Patient.PatientRiskIndex >= 6
--     ORDER BY Patient.PatientRiskIndex DESC
--     LIMIT 5;

-- /* Complex Query <2> - Providers Caring for 5 or More Patients */
-- SELECT Provider.ProviderFirstName, Provider.ProviderLastName, Provider.ProviderTitle, count(*) AS NumPatients 
--     FROM Provider
--     JOIN Cares_For
--         ON Provider.ProviderID = Cares_For.Cares_ProviderID
--     JOIN Patient
--         ON Cares_For.Cares_PatientID = Patient.PatientID
--     GROUP BY Provider.ProviderID
--     HAVING count(*) >= 5;

-- /* Complex Query <3> - What Providers Administered What Treatments 5 */
-- SELECT Provider.ProviderID, Provider.ProviderFirstName, Provider.ProviderLastName, Provider.ProviderTitle, Treatment.TreatmentName
--     FROM Provider
--     JOIN Administers_Treatment
--         ON Provider.ProviderID = Administers_Treatment.Administers_ProviderID
--     JOIN Treatment
--         ON Administers_Treatment.Administers_TreatmentID = Treatment.TreatmentID
--     WHERE Treatment.TreatmentName IN ('Chemotherapy', 'Immunotherapy', 'Heart Surgery', 'Brain Surgery'); 
