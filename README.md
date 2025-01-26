# employee-tracker

Employee Tracker
Description
Employee Tracker is a command-line application built to manage a company's employee database. It allows business owners to easily view and manage departments, roles, and employees. This application uses Node.js, Inquirer, and PostgreSQL to interact with the database and provides an intuitive interface for non-developers to view and modify employee data.

The goal of this application is to streamline the process of organizing and planning business operations by offering easy-to-use tools for managing employees, roles, and departments.

Table of Contents
User Story
Acceptance Criteria
Technologies Used
Installation Instructions
Usage Instructions
Video Walkthrough
Contributing
License
Contact Information
User Story
AS a business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

Acceptance Criteria
The application must meet the following criteria:

View all departments – Show a formatted table with department names and department IDs.
View all roles – Display a table with job titles, role IDs, the department each role belongs to, and the salary.
View all employees – Present a formatted table showing employee IDs, first names, last names, job titles, departments, salaries, and managers.
Add a department – Allow the user to add a new department to the database by entering the department name.
Add a role – Prompt the user to enter the role name, salary, and department to add a new role to the database.
Add an employee – Allow the user to add a new employee by entering their first name, last name, role, and manager.
Update an employee role – Enable the user to update an employee’s role by selecting the employee and assigning them a new role.
Technologies Used
Node.js: JavaScript runtime environment used to run the application.
Inquirer.js: Used for prompting user input via the command line.
PostgreSQL: Relational database management system used to store employee, role, and department data.
Installation Instructions
Clone the repository to your local machine:



git clone https://github.com/Myrmecology/employee-tracker.git
Navigate into the project directory:



cd employee-tracker
Install dependencies using npm:


npm install
Set up PostgreSQL on your machine (if you don't already have it installed). You'll need to create a database to store the employee data. You can do so with the following commands:



CREATE DATABASE employee_db;
Configure the database connection in your project’s configuration file (e.g., db.js).

Usage Instructions
Start the application by running:


node index.js
The command-line interface will provide options to:

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role
Follow the prompts to interact with the application.

Video Walkthrough
Please watch the video below to see a demonstration of how the application works and how it meets the project requirements:

Video Walkthrough Link https://drive.google.com/file/d/1jZtbOeuiWdox7zyId-Rg9-uSsmDRYJiK/view

Contributing
Contributions to this project are welcome. If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch for your feature (git checkout -b feature-name).
Make your changes and commit them (git commit -am 'Add new feature').
Push to the branch (git push origin feature-name).
Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact Information
For any questions or issues, feel free to contact me at:

Email: zooecostudy@yahoo.com
GitHub: https://github.com/Myrmecology/employee-tracker/edit/main/README.md
This README should give users all the information they need to understand, set up, and use your Employee Tracker application. If you want to add or modify any details, feel free to do so!



