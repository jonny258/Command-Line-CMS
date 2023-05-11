const inquirer = require('inquirer');
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Qazee123!Jon183061',
      database: 'my_company_db'
    },
    console.log(`Connected to the my_company_db database.`)
  );


const introList = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']

const viewDepartments = (parameter1, parameter2) => {
    // function body
  };

  const viewRoles = (parameter1, parameter2) => {
    // function body
  };

  const viewEmployees = (parameter1, parameter2) => {
    // function body
  };

  const addDepartment = (parameter1, parameter2) => {
    // function body
  };

  const addRole = (parameter1, parameter2) => {
    // function body
  };

  const addEmployee = (parameter1, parameter2) => {
    // function body
  };

  const updateEmployee = (parameter1, parameter2) => {
    // function body
  };



inquirer
    .prompt([
        {
            type: 'list',
            name: 'intro',
            message: 'What would you like to do?',
            choices: introList
        },
        // Add Department
        {
            type: 'input',
            name: 'addDepartment',
            message: 'Enter the name of the department that you would like to add',
            when: (answers) => answers.intro === 'Add a department'
        },
        // Add Role
        {
            type: 'input',
            name: 'addRoleName',
            message: 'What is the name of the role you would like to add',
            when: (answers) => answers.intro === 'Add a role'
        },
        {
            type: 'input',
            name: 'addRoleSalary',
            message: 'What is the salary of the role',
            when: (answers) => answers.intro === 'Add a role'
        },
        {
            type: 'input',
            name: 'addRoleDepartment',
            message: 'What department does this role fall under',
            when: (answers) => answers.intro === 'Add a role'
        },
        //Add Employee
        {
            type: 'input',
            name: 'addEmployeeFirst',
            message: 'Please enter your employees first name',
            when: (answers) => answers.intro === 'Add an employee'
        },
        {
            type: 'input',
            name: 'addEmployeeLast',
            message: 'Please enter your employees lastname',
            when: (answers) => answers.intro === 'Add an employee'
        },
        {
            type: 'input',
            name: 'addEmployeeRole',
            message: 'What is the role of this employee',
            when: (answers) => answers.intro === 'Add an employee'
        },
        {
            type: 'input',
            name: 'addEmployeeManager',
            message: 'Who is this employees manager',
            when: (answers) => answers.intro === 'Add an employee'
        },
        //Update an employee role
        {
            type: 'list',
            name: 'updateEmployeeSelect',
            message: `Which employee's role do you want to update`,
            when: (answers) => answers.intro === 'Update an employee role'
        },
        {
            type: 'input',
            name: 'updateEmployeeRole',
            message: `what is this ${introList[0]} new role`,
            when: (answers) => answers.intro === 'Update an employee role'
        },
          
    ])
    .then((res) => {
        switch(res.intro) {
            case 'View all departments' : {
                viewDepartments()
            }
            case 'View all roles' : {
                viewRoles()
            }
            case 'View all employees' : {
                viewEmployees()
            }
            case 'Add a department' : {
                addDepartment()
            }
            case 'Add a role' : {
                addRole()
            }
            case 'Add an employee' : {
                addEmployee()
            }
            case 'Update an employee role' : {
                updateEmployee()
            }
        }
    })