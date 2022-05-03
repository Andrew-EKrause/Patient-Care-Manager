# **_Patient Care Manager (PCM)_**
## **[View the PCM Project Here](https://patient-care-manager.herokuapp.com/)**

<p>&nbsp;</p>

## **Description**

**_Web Application with SQL Database Created for Mayo Clinic in CS 364 Course_** <br/>
The web application was designed for the organization of Mayo Clinic, a leading provider of health care in the world. The website was part of an assignment in my CS 364 (Databases) class at the University of Wisconsin - La Crosse. In the project, I was required to create a basic graphical user interface (GUI), connect that interface to a SQL database, and create functionality to filter how the data was displayed. Other requirements included adding the ability for users to view, manage, and manipulate data. This project was designed for easy navigation of the website and contains an attached project document on the "About" page for users to read additional details regarding the scope of this assignment. 

The web application is called "Patient Care Manager" or "PCM". Through the website, users can view a SQL database that was designed to store and manage patient information. There are a total of eight tables in the database. Four of the tables are the main entity types: Patient, Provider, Treatment, and Department (all providers belong to a department). The other four tables show relationships between the four main entity types. Users can observe the relationships among tables in action when they create, read, update, or destroy data. The four main entity types can all be edited, deleted, and viewed. Users also have the ability to create new data for any Patients, Providers, Treatments, and Departments.

The Patient Care Manager (PCM) site is hosted on a Heroku server and is accessible by anyone on the world wide web. The JawsDB add-on is used along with Heroku to provide a functional SQL database on the web. The basic idea behind the creation of this project is that it could be deployed to a hospital to help improve the current care system. By organizing the data in the database and displaying it on the website interface, users can easily interact with and change information to reflect the current state of the hospital care. With this project, the goal is that hospitals would be able to manage patient information more effectively as well as optimize the treatments they administer to individuals seeking medical assistance. A list of resources used for the website, functionalities, and future add-ons are listed below:


###### Picture of the PCM Database ER Diagram
<img width="1069" alt="PCM-ER-Diagram" src="https://user-images.githubusercontent.com/57727121/166434710-7ba58ad7-adf7-47c2-9c9c-6ab58b85160e.png">


**Resources for Project:**

- HTML
- CSS
- JavaScript
- EJS
- Node.js
- MySQL
- MySQL Workbench
- Draw.io (Flowcharts, UML Diagrams): https://app.diagrams.net/
- Heroku: https://www.heroku.com/
- Udemy: https://www.udemy.com/
- Code with Mosh: https://codewithmosh.com/
- MDN Web Docs: https://developer.mozilla.org/en-US/
- W3Schools: https://www.w3schools.com/
- Stack Overflow: https://stackoverflow.com/

<p>&nbsp;</p>

## **NOTE:**

The data used in this project is fake (dummy data). There is no personal information contained within this database application. Do not add any personal data to this project if you decide to create new entries in this database. Currently, there are no login/authentication and security protocols for the SQL database application. Login/authentication and security features are planned for future updates.

<p>&nbsp;</p>

**Functionalities:**

- **Please Note:** Creating an account/logging in are **not** yet available functionalities. Login features may be implemented in future updates for this project.
- The user can view all of the four main entity types in the database: Patient, Provider, Department, and Treatment.
- The user can perform basic CRUD (Create, Read, Update, Destroy) operations on each main entity type in the database. 
- Although the user cannot see the relationship tables between each entity type in the database, they can interact with the relationship tables whenever they perform operations such as assigning a provider to care for a patient.
- Users can view the "About" page of the web application to view more information about the project as well as download a project document with additional details.
- When users navigate to the "Statistics" page of the project, they can view data that is displayed as a result of executing three complex SQL queries. The queries obtain information pertaining to patient health, provider, and treatment data.
- The web application is responsive to different screen sizes, and can be viewed on a mobile device. The responsiveness of the website was made possible through different media queries in CSS. Future add-ons may improve upon the resizing and reformatting featuers of the website to maintain a clean format on varying screen sizes.

<p>&nbsp;</p>

**Future Add-Ons:**

- Account creation, login, and logout functionalities will be added to the project in future updates. Users will be given an option simply view the data but may be restricted in how much they can view and what data they can change.
- Users will be able to navigate to their account page and view their account status when user features are added later on.
- A "Forgot Password" feature that allows user to retrieve their forgotten password or create a new one may be implemented in other updates.
- A "Change my Password" feature that allows a user to change their password if they feel the need to do so will be part of future add-ons.
- Feature that allows administrator accounts to be created.
- Features that allows administrators to remove, deactivate and monitor certain users.
- Handling for the case when user attempts to sign up for an event that conflicts with a cancelled event. 
- An improved mobile-friendly view for the website so that it can be better viewed on smaller screen sizes such as a mobile device screen.

<p>&nbsp;</p>

**Important Assumptions for Project:**

- All of the individuals listed in the data for this project are fake. Dummy data was used for this project in order to allow users to observe the structure of the database as well as interact with the web application.
- Although I say that this website with a SQL database was designed for Mayo Clinic, I am not affiliated with the health organization as of the time of this project. I simply chose Mayo Clinic as the organization that I was designing the database assignment for in my Databases (CS 364) class.
- The project was designed in order to demonstrate basic knowledge in SQL, which is a declarative query language. Therefore, anyone can access the database online, view the data, and manipulate the data. Future updates may include login and security features in order to simulate a protected database. However, with the dummy data in the databse, the project is currently accessible to anyone.

<p>&nbsp;</p>

**_@Author: Andrew Krause_** <br/>
*LinkedIn:* https://www.linkedin.com/in/andrew-krause-b6aa21179/ <br/>
*Portfolio:* https://andrewkrause.dev/ <br/>
*Instagram:* https://www.instagram.com/aek.krause/ <br/>
*Facebook:* https://www.facebook.com/andrew.krause.35325 <br/>
