/**
 * The MYSQL-PCM-Setup.sql file contains the
 * BACKUP scripts used to create the tables in
 * the Patient Care Manager database. The scripts
 * that exist in this file are used primarily
 * for reference and backup. However, they can
 * also be run using a script to create the
* tables in the database if needed. This is 
* useful in cases where the database tables
* have not loaded or do not yet exist.
* 
* Project: Mayo Clinic (PCM) Web Application
* Author: Andrew Krause
* Class: CS 364
* Date: 5/10/2022
* 
*/

/*
    Create the Patient Table using MYSQL. 
    NOTE: The AUTO_INCREMENT field is set to 1 by default!
*/
CREATE TABLE `Patient` (
  `PatientID` int NOT NULL AUTO_INCREMENT,
  `PatientNotes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PatientFirstName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PatientMiddleName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PatientLastName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PatientBirthdate` date NOT NULL,
  `PatientSex` varchar(6) NOT NULL,
  `PatientWeight` decimal(6,2) NOT NULL,
  `PatientRiskIndex` int NOT NULL,
  `PatientPhone` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PatientEmail` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PatientHeight` decimal(4,2) NOT NULL,
  `PatientStartDate` date NOT NULL,
  `PatientEndDate` date DEFAULT NULL,
  PRIMARY KEY (`PatientID`),
  UNIQUE KEY `PatientID_UNIQUE` (`PatientID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/* =========================================================================================== */

/*
  Create the Treatment Table using MySQL.
  NOTE: The AUTO_INCREMENT field is set to 1 by default!
*/
CREATE TABLE `Treatment` (
  `TreatmentID` int NOT NULL AUTO_INCREMENT,
  `TreatmentName` varchar(60) NOT NULL,
  `TreatmentRequirements` varchar(255) NOT NULL,
  `TreatmentDescription` varchar(255) NOT NULL,
  `TreatmentRiskIndex` int NOT NULL,
  `TreatmentTools` varchar(255) NOT NULL,
  PRIMARY KEY (`TreatmentID`),
  UNIQUE KEY `idTreatment_UNIQUE` (`TreatmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/* =========================================================================================== */

/*
  Create the Provider Table using MySQL.
  NOTE: The AUTO_INCREMENT field is set to 1 by default!
*/
CREATE TABLE `Provider` (
  `ProviderID` int NOT NULL AUTO_INCREMENT,
  `ProviderFirstName` varchar(50) NOT NULL,
  `ProviderMiddleName` varchar(50) NOT NULL,
  `ProviderLastName` varchar(50) NOT NULL,
  `ProviderTitle` varchar(50) NOT NULL,
  `ProviderDescription` varchar(255) NOT NULL,
  `ProviderPhone` varchar(50) NOT NULL,
  `ProviderEmail` varchar(50) NOT NULL,
  `ProviderStartDate` date NOT NULL,
  `ProviderEndDate` date DEFAULT NULL,
  PRIMARY KEY (`ProviderID`),
  UNIQUE KEY `ProviderID_UNIQUE` (`ProviderID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/* =========================================================================================== */

/*
  Create the Department Table using MySQL.
  NOTE: The AUTO_INCREMENT field is set to 1 by default!
*/
CREATE TABLE `Department` (
  `DepartmentID` int NOT NULL AUTO_INCREMENT,
  `DepartmentName` varchar(60) NOT NULL,
  `DepartmentLocation` varchar(60) NOT NULL,
  `DepartmentMembers` int NOT NULL,
  `DepartmentDescription` varchar(255) NOT NULL,
  PRIMARY KEY (`DepartmentID`),
  UNIQUE KEY `idDepartment_UNIQUE` (`DepartmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/* =========================================================================================== */

/*
  Create the Cares_For Table using MySQL.
  This table is a join relationship between the "Provider"
  and "Patient" tables.
*/
CREATE TABLE `Cares_For` (
  `Cares_PatientID` int NOT NULL,
  `Cares_ProviderID` int NOT NULL,
  PRIMARY KEY (`Cares_PatientID`,`Cares_ProviderID`),
  KEY `Cares_ProviderID_idx` (`Cares_ProviderID`),
  CONSTRAINT `Cares_PatientID` FOREIGN KEY (`Cares_PatientID`) REFERENCES `Patient` (`PatientID`),
  CONSTRAINT `Cares_ProviderID` FOREIGN KEY (`Cares_ProviderID`) REFERENCES `Provider` (`ProviderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/* =========================================================================================== */

/*
  Create the Receives_Treatment Table using MySQL.
  This table is a join relationship between the "Treatment"
  and "Patient" tables.
*/
CREATE TABLE `Receives_Treatment` (
  `Recieves_PatientID` int NOT NULL,
  `Receives_TreatmentID` int NOT NULL,
  PRIMARY KEY (`Recieves_PatientID`,`Receives_TreatmentID`),
  KEY `Receives_TreatmentID_idx` (`Receives_TreatmentID`),
  CONSTRAINT `Receives_PatientID` FOREIGN KEY (`Recieves_PatientID`) REFERENCES `Patient` (`PatientID`),
  CONSTRAINT `Receives_TreatmentID` FOREIGN KEY (`Receives_TreatmentID`) REFERENCES `Treatment` (`TreatmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/* =========================================================================================== */

/*
  Create the Administers_Treatment Table using MySQL.
  This table is a join relationship between the "Provider"
  and "Treatment" tables.
*/
CREATE TABLE `Administers_Treatment` (
  `Administer_ProviderID` int NOT NULL,
  `Administer_TreatmentID` int NOT NULL,
  PRIMARY KEY (`Administer_ProviderID`,`Administer_TreatmentID`),
  KEY `Administer_TreatmentID_idx` (`Administer_TreatmentID`),
  CONSTRAINT `Administer_ProviderID` FOREIGN KEY (`Administer_ProviderID`) REFERENCES `Provider` (`ProviderID`),
  CONSTRAINT `Administer_TreatmentID` FOREIGN KEY (`Administer_TreatmentID`) REFERENCES `Treatment` (`TreatmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/* =========================================================================================== */

/*
  Create the Part_Of Table using MySQL.
  This table is a join relationship between the "Provider"
  and "Department" tables.
*/
CREATE TABLE `Part_Of` (
  `Part_ProviderID` int NOT NULL,
  `Part_DepartmentID` int NOT NULL,
  PRIMARY KEY (`Part_ProviderID`,`Part_DepartmentID`),
  KEY `Part_DepartmentID_idx` (`Part_DepartmentID`),
  CONSTRAINT `Part_DepartmentID` FOREIGN KEY (`Part_DepartmentID`) REFERENCES `Department` (`DepartmentID`),
  CONSTRAINT `Part_ProviderID` FOREIGN KEY (`Part_ProviderID`) REFERENCES `Provider` (`ProviderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/* =========================================================================================== */
