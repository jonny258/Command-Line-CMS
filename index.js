const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

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

  const departmentArr = department.map(row => row.name);
  const roleeArr = rolee.map(row => row.title);
  const employeeArr = employee.map(row => `${row.first_name} ${row.last_name}`);
  
  return {departmentArr, roleeArr, employeeArr};
 
}


const promptUser = async () => {
  const departments = (await getDataBase()).departmentArr;
  const roles = (await getDataBase()).roleeArr;
  const employees = (await getDataBase()).employeeArr;

  console.log(departments)
  console.log(roles)
  console.log(employees)

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: 'Select a department:',
      choices: departments
    }
  ]);

  console.log(`You selected ${answers.department}.`);
}

promptUser();
