/* ADD MORE...YOU WILL WANT TO COPY SOME THINGS OVER FROM THE PCM-Setup.sql FILE!!! */


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
  `PatientPhone` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PatientEmail` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PatientHeight` decimal(4,2) NOT NULL,
  `PatientStartDate` date NOT NULL,
  `PatientEndDate` date DEFAULT NULL,
  PRIMARY KEY (`PatientID`),
  UNIQUE KEY `PatientID_UNIQUE` (`PatientID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

