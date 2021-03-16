const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
        message: 'What would you like to do?',
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

  const addRole = () => {
    connection.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the name of this new role?',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the hourly salary?',
        },
        {
          name: 'department',
          type: 'rawlist',
          choices() {
            const choiceArray = [];
            results.forEach(({ name }) => {
              choiceArray.push(name);
            });
            return choiceArray;
          },
          message: 'What department is this role in?',
        },
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO role SET ?',
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department,
          },
          (err) => {
            if (err) throw err;
            console.log('New role was created successfully!');
            start();
          }
        );
      });
    });
  };

  const viewDepartments = () => {
    
        connection.query('SELECT * FROM department',(err,res) => {
            if (err) throw err;
            const table = cTable.getTable(res);
            console.log(table);
            start();
          }
        );
      };
  

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
  });