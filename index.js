const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

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
    inquirer
      .prompt([
        {
          name: 'department',
          type: 'input',
          message: 'What is the name of the new department?',
        },
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO department SET ?',
          {
            name: answer.department,
          },
          (err) => {
            if (err) throw err;
            console.log('New department was created successfully!');
            start();
          }
        );
      });
  };

  const viewDepartments = () => {
    
        connection.query('SELECT * FROM department',(err,res) => {
            if (err) throw err;
            console.log(res);
            start();
          }
        );
      };
  

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
  });