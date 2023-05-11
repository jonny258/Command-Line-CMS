const inquirer = require('inquirer');
const mysql = require('mysql2/promise');


class CreateDepartment{
  constructor(name){
    this.name = name;
  }
}

class CreateRole{
  constructor(title, salary, department_id){
    this.title = title,
    this.salary = salary,
    this.department_id = department_id
  }
}

class CreateEmployee{
  constructor(first_name, last_name, rolee_id, manager_id){
    this.first_name = first_name,
    this.last_name = last_name,
    this.rolee_id = rolee_id,
    this.manager_id = manager_id
  }
}


const getDataBase = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'my_company_db',
    password: 'Qazee123!Jon183061'
  });

  const [department] = await connection.query('SELECT * FROM department');
  const [rolee] = await connection.query('SELECT * FROM rolee');
  const [employee] = await connection.query('SELECT * FROM employee');

  await connection.end();

  return { department, rolee, employee};
}


const promptUser = async () => {
  const department = (await getDataBase()).department;
  const rolee = (await getDataBase()).rolee;
  const employee = (await getDataBase()).employee;


  const departmentPrompt = department.map(row => row.name);
  const rolePrompt = rolee.map(row => row.title);
  const employeePrompt = employee.map(row => `${row.first_name} ${row.last_name}`);
  const introList = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']

  // console.log(departmentPrompt)
  // console.log(rolePrompt)
  // console.log(employeePrompt)

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


  switch (promptAnswers.intro) {
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
        const newDepartment = new CreateDepartment(promptAnswers.addDepartment);
        console.log(newDepartment);
        break;
    case 'Add a role':
        const roleDepartment = department.filter(dep => dep.name === promptAnswers.addRoleDepartment)
        const newRole = new CreateRole(promptAnswers.addRoleName, promptAnswers.addRoleSalary, roleDepartment[0].id)
        console.log(newRole)
        break;
    case 'Add an employee':
        const employeeRole = rolee.filter(rol => rol.title === promptAnswers.addEmployeeRole)
        const employeeManager = employee.filter(emp => emp.first_name === promptAnswers.addEmployeeManager.split(' ')[0])
        const newEmployee = new CreateEmployee(promptAnswers.addEmployeeFirst, promptAnswers.addEmployeeLast, employeeRole[0].id, employeeManager[0].id)
        console.log(newEmployee)
        break;
    case 'Update an employee role':
        const updateEmployee = employee.filter(emp => emp.first_name === promptAnswers.updateEmployeeSelect.split(' ')[0])
        const employeeNewRole = rolee.filter(rol => rol.title === promptAnswers.updateEmployeeRole)
        
        console.log(updateEmployee)
        console.log(employeeNewRole)
        break;
}



  



}

promptUser();
