const inquirer = require('inquirer');
const pool = require('./db/connection');
require('console.table');

const promptUser = async () => {
  try {
      const { choice } = await inquirer.prompt([
          {
              name: 'choice',
              type: 'list',
              message: 'What would you like to do?',
              choices: [
                  'View All Departments',
                  'View All Roles',
                  'View All Employees',
                  'Add Department',
                  'Add Role',
                  'Add Employee',
                  'Update Employee Role',
                  'Exit'
              ]
          }
      ]);

      switch (choice) {
          case 'View All Departments':
              await viewDepartments();
              break;
          case 'View All Roles':
              await viewRoles();
              break;
          case 'View All Employees':
              await viewEmployees();
              break;
          case 'Add Department':
              await addDepartment();
              break;
          case 'Add Role':
              await addRole();
              break;
          case 'Add Employee':
              await addEmployee();
              break;
          case 'Update Employee Role':
              await updateEmployeeRole();
              break;
          case 'Exit':
              console.log('Goodbye!');
              pool.end();
              process.exit(0);
      }
  } catch (err) {
      console.error('Error in promptUser:', err);
  }
};

const viewDepartments = async () => {
  try {
      console.log('Attempting to query departments...');
      const { rows } = await pool.query('SELECT * FROM department');
      console.log('Query results:', rows);
      console.table(rows);
      await promptUser();
  } catch (err) {
      console.error('Error in viewDepartments:', err);
      await promptUser();
  }
};

const viewRoles = async () => {
  try {
      console.log('Querying roles...');
      const { rows } = await pool.query(`
          SELECT role.id, role.title, department.name AS department, role.salary 
          FROM role 
          JOIN department ON role.department_id = department.id`);
      console.table(rows);
      await promptUser();
  } catch (err) {
      console.error('Error in viewRoles:', err);
      await promptUser();
  }
};

const viewEmployees = async () => {
  try {
      console.log('Querying employees...');
      const { rows } = await pool.query(`
          SELECT 
              e.id,
              e.first_name,
              e.last_name,
              role.title,
              department.name AS department,
              role.salary,
              CONCAT(m.first_name, ' ', m.last_name) AS manager
          FROM employee e
          LEFT JOIN role ON e.role_id = role.id
          LEFT JOIN department ON role.department_id = department.id
          LEFT JOIN employee m ON e.manager_id = m.id`);
      console.table(rows);
      await promptUser();
  } catch (err) {
      console.error('Error in viewEmployees:', err);
      await promptUser();
  }
};

const addDepartment = async () => {
  try {
      const { departmentName } = await inquirer.prompt([
          {
              name: 'departmentName',
              type: 'input',
              message: 'What is the name of the department?'
          }
      ]);

      await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentName]);
      console.log(`Added ${departmentName} to departments!`);
      await promptUser();
  } catch (err) {
      console.error('Error in addDepartment:', err);
      await promptUser();
  }
};

const addRole = async () => {
  try {
      const { rows: departments } = await pool.query('SELECT * FROM department');
      
      const { title, salary, departmentId } = await inquirer.prompt([
          {
              name: 'title',
              type: 'input',
              message: 'What is the name of the role?'
          },
          {
              name: 'salary',
              type: 'input',
              message: 'What is the salary for this role?',
              validate: input => !isNaN(input) || 'Please enter a valid number'
          },
          {
              name: 'departmentId',
              type: 'list',
              message: 'Which department does this role belong to?',
              choices: departments.map(dept => ({
                  name: dept.name,
                  value: dept.id
              }))
          }
      ]);

      await pool.query(
          'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
          [title, salary, departmentId]
      );
      console.log(`Added ${title} role!`);
      await promptUser();
  } catch (err) {
      console.error('Error in addRole:', err);
      await promptUser();
  }
};

const addEmployee = async () => {
  try {
      const { rows: roles } = await pool.query('SELECT * FROM role');
      const { rows: employees } = await pool.query('SELECT * FROM employee');

      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
          {
              name: 'firstName',
              type: 'input',
              message: "What is the employee's first name?"
          },
          {
              name: 'lastName',
              type: 'input',
              message: "What is the employee's last name?"
          },
          {
              name: 'roleId',
              type: 'list',
              message: "What is the employee's role?",
              choices: roles.map(role => ({
                  name: role.title,
                  value: role.id
              }))
          },
          {
              name: 'managerId',
              type: 'list',
              message: "Who is the employee's manager?",
              choices: [
                  { name: 'None', value: null },
                  ...employees.map(emp => ({
                      name: `${emp.first_name} ${emp.last_name}`,
                      value: emp.id
                  }))
              ]
          }
      ]);

      await pool.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
          [firstName, lastName, roleId, managerId]
      );
      console.log(`Added ${firstName} ${lastName} to employees!`);
      await promptUser();
  } catch (err) {
      console.error('Error in addEmployee:', err);
      await promptUser();
  }
};

const updateEmployeeRole = async () => {
  try {
      const { rows: employees } = await pool.query('SELECT * FROM employee');
      const { rows: roles } = await pool.query('SELECT * FROM role');

      const { employeeId, roleId } = await inquirer.prompt([
          {
              name: 'employeeId',
              type: 'list',
              message: 'Which employee\'s role do you want to update?',
              choices: employees.map(emp => ({
                  name: `${emp.first_name} ${emp.last_name}`,
                  value: emp.id
              }))
          },
          {
              name: 'roleId',
              type: 'list',
              message: 'Which role do you want to assign to the selected employee?',
              choices: roles.map(role => ({
                  name: role.title,
                  value: role.id
              }))
          }
      ]);

      await pool.query(
          'UPDATE employee SET role_id = $1 WHERE id = $2',
          [roleId, employeeId]
      );
      console.log('Updated employee\'s role!');
      await promptUser();
  } catch (err) {
      console.error('Error in updateEmployeeRole:', err);
      await promptUser();
  }
};

const init = async () => {
  try {
      console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║         EMPLOYEE MANAGER              ║
║                                       ║
╚═══════════════════════════════════════╝
      `);
      await promptUser();
  } catch (err) {
      console.error('Initialization error:', err);
  }
};

init();