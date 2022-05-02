-- /* 
--     Code for making the database the DEFAULT database.
-- */
-- --> WORRY ABOUT/MAYBE ADD LATER!!!

-- /*
--     Simple code for removing the ENTIRE database.
--     --> WARNING: This action cannot be undone.
-- */
-- DROP DATABASE PCM;

-- /*
--     Simple code for removing an ENTIRE table
--     in the database. 
--     --> WARNING: This action cannot be undone.
-- */
-- DROP TABLE Table_Name_Goes_Here




-- CREATE TABLE EmployeeTest (
--     SSN NVARCHAR(11) PRIMARY KEY NOT NULL,
--     Salary NUMERIC(8, 2) NOT NULL,
--     FirstName NVARCHAR(10) NOT NULL,
--     MiddleName NVARCHAR(10) NOT NULL,
--     LastName NVARCHAR(10) NOT NULL -- To have an attribute be optional, omit the 'NOT NULL'.
-- );

-- CREATE TABLE Project (
--     ID INTEGER PRIMARY KEY AUTOINCREMENT, -- This ensures that the database fills in the values for us.
--     Description NVARCHAR(255)
-- );

-- CREATE TABLE Works_On (
--     ID INTEGER NOT NULL,
--     SSN NVARCHAR(11) NOT NULL,
--     Hours INTEGER NOT NULL,            -- First attribute is attribute in this table. Second attribute is attribute in other table.
--     CONSTRAINT fk_project_id FOREIGN KEY (ID) REFERENCES Project(ID),
--     CONSTRAINT fk_employee_ssn FOREIGN KEY (SSN) REFERENCES Employee(SSN)
-- );

-- -- Insert into the Employee table.
-- INSERT INTO EmployeeTest(SSN, Salary, FirstName, MiddleName, LastName) VALUES ('123-45-6789', 12345.00, 'John', 'Carton', 'Smith');
-- INSERT INTO EmployeeTest(SSN, Salary, FirstName, MiddleName, LastName) VALUES ('421-64-6888', 54321.00, 'James', 'Tom', 'Lee');

-- -- Insert into the Project table.
-- INSERT INTO Project(Description) VALUES ('A test project.');
-- INSERT INTO Project(Description) VALUES ('Another test project.');

-- -- Insert into the Works_On table
-- INSERT INTO Works_On(ID, SSN, Hours) VALUES (4, '123-45-6789', 3);

/**
 * CHECKLIST FOR CREATING A WEB APPLICATION WITH SQL:
 * 
 * 1. Load a SQL driver. You are using MySQL with Node.js. Look up videos on this!
 *    Make sure you have the write connector to handle connecting the language with
 *    the database!
 *
 * 2. Make sure you add the build path (MAYBE) for the .jar file (IF YOU HAVE ONE).
 *
 * 3. Set up our database (script)
 *    - Create database
 *    - Create tables
 *    - Populate with data
 *    - Connect to the database
 *    - Be able to insert/modify/delete data
 *    - Be able to query the data
 *    - Disconnect from the database
 */
