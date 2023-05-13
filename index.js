//call required packages
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

//global constructor classes to make my code cleaner in the functions
class CreateDepartment {
  constructor(name) {
    this.name = name;
  }
}

class CreateRole {
  constructor(title, salary, department_id) {
    this.title = title,
      this.salary = salary,
      this.department_id = department_id
  }
}

class CreateEmployee {
  constructor(first_name, last_name, rolee_id, manager_id) {
    this.first_name = first_name,
      this.last_name = last_name,
      this.rolee_id = rolee_id,
      this.manager_id = manager_id
  }
}

// async function that calls the database, all actions done on the database happen in this function 
const getDataBase = async () => {
  // connects to sql using using the await async keyword
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'my_company_db',
    password: ''
  });

  //Pulls all the data from the three tables and then stores them in arrays
  const [department] = await connection.query('SELECT * FROM department');
  const [rolee] = await connection.query('SELECT * FROM rolee');
  const [employee] = await connection.query('SELECT * FROM employee');

  //one function that updates different tables and can even update, all based on the paramiters passed into the function
  const addData = async (sqlQuery, data) => {
    //runs the sqlQuery with the data that is passed to in an object, the object is turned into an array with just the values in it
    const [rows, fields] = await connection.execute(sqlQuery, [...Object.values(data)]); 
    console.log(rows)
    console.log(fields)
  }
  
  // a function that ends the connection once the funtion is done running 
  const endConnection = async () => {
    await connection.end();
  }
  
  //lets all the varibles made in this function avalible in other places
  return { department, rolee, employee, addData, endConnection };
}

//This is the function that asks the user questions then runs various functions based on that input
const promptUser = async () => {
  //creates variables with easier names to make the code more readable
  const db = await getDataBase();
  const department = db.department;
  const rolee = db.rolee;
  const employee = db.employee;

  //creates all the arrays that will be used in the prompts, 
  const departmentPrompt = department.map(row => row.name);
  const rolePrompt = rolee.map(row => row.title);
  const employeePrompt = employee.map(row => `${row.first_name} ${row.last_name}`);
  const introList = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']

  //The function that runs the questions
  const promptAnswers = await inquirer.prompt([
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
      type: 'list',
      name: 'addRoleDepartment',
      message: 'What department does this role fall under',
      choices: departmentPrompt,
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
      type: 'list',
      name: 'addEmployeeRole',
      message: 'What is the role of this employee',
      choices: rolePrompt,
      when: (answers) => answers.intro === 'Add an employee'
    },
    {
      type: 'list',
      name: 'addEmployeeManager',
      message: 'Who is this employees manager',
      choices: employeePrompt,
      when: (answers) => answers.intro === 'Add an employee'
    },
    //Update an employee role
    {
      type: 'list',
      name: 'updateEmployeeSelect',
      message: `Which employee's role do you want to update`,
      choices: employeePrompt,
      when: (answers) => answers.intro === 'Update an employee role'
    },
    {
      type: 'list',
      name: 'updateEmployeeRole',
      message: `what is this employee's new role`,
      choices: rolePrompt,
      when: (answers) => answers.intro === 'Update an employee role'
    },
  ]);

  //A switch case that runs different funtions based on the intro question
  switch (promptAnswers.intro) {
    //All these just console.log a table
    case 'View all departments':
      console.log(department)
      break;
    case 'View all roles':
      console.log(rolee)
      break;
    case 'View all employees':
      console.log(employee)
      break;
    case 'Add a department':
      //Creates a new object then runs the sql command passing in the new object as the value to be added
      const newDepartment = new CreateDepartment(promptAnswers.addDepartment);
      db.addData('INSERT INTO department (name) VALUES (?)', newDepartment)
      break;
    case 'Add a role':
      //because the prompt answer is just a string from an array I need to run a filter to select the correct department from the database
      const roleDepartment = department.filter(dep => dep.name === promptAnswers.addRoleDepartment)
      const newRole = new CreateRole(promptAnswers.addRoleName, promptAnswers.addRoleSalary, roleDepartment[0].id)
      db.addData('INSERT INTO rolee (title, salary, department_id) VALUES (?, ?, ?)', newRole)
      break;
    case 'Add an employee':
      const employeeRole = rolee.filter(rol => rol.title === promptAnswers.addEmployeeRole)
      const employeeManager = employee.filter(emp => emp.first_name === promptAnswers.addEmployeeManager.split(' ')[0])
      const newEmployee = new CreateEmployee(promptAnswers.addEmployeeFirst, promptAnswers.addEmployeeLast, employeeRole[0].id, employeeManager[0].id)
      db.addData('INSERT INTO employee (first_name, last_name, rolee_id, manager_id) VALUES (?, ?, ?, ?)', newEmployee)
      break;
    case 'Update an employee role':
      const updateEmployee = employee.filter(emp => emp.first_name === promptAnswers.updateEmployeeSelect.split(' ')[0])
      const employeeNewRole = rolee.filter(rol => rol.title === promptAnswers.updateEmployeeRole)
      //This still works even though it is different from the othe "addData" functions because all you need to pass into this function is a sql command and values
      db.addData('UPDATE employee SET rolee_id = ? WHERE id = ?', [employeeNewRole[0].id, updateEmployee[0].id])
      break;
  }
  //after everything is completely ran then connection to the data base is stopped
  db.endConnection()
}

promptUser();
