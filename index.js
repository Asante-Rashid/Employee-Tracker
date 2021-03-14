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
        choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Role'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.start === 'POST') {
          postAuction();
        } else if (answer.start === 'BID') {
          bidAuction();
        } else {
          connection.end();
        }
      });
  };


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
  });