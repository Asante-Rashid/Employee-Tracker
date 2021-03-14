const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'root',
  database: 'company',
});

const start = () => {
    inquirer
      .prompt({
        name: 'start',
        type: 'list',
        message: 'What would youi like to do?',
        choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Role', 'Exit'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.start === 'Add Department') {
          addDepartment();
        } else if (answer.start === 'Add Role') {
          addRole();
        } else if (answer.start === 'Add Employee') {
          addEmployee();
        } else if (answer.start === 'View Departments') {
          viewDepartments();
        } else if (answer.start === 'View Roles') {
          viewRoles();
        } else if (answer.start === 'View Employees') {
          viewEmployees();
        } else if (answer.start === 'Update Employee Role') {
          updateEmployee();
        } else {
          connection.end();
        }
      });
  };

  const addDepartment = () => {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: 'department',
          type: 'input',
          message: 'What is the name of the new department?',
        },
      ])
      .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          'INSERT INTO department SET ?',
          // QUESTION: What does the || 0 do?
          {
            name: answer.department,
          },
          (err) => {
            if (err) throw err;
            console.log('New department was created successfully!');
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  };

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
  });