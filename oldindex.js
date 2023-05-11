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

// const init = async () => {
//     // Departments
//     db.query('SELECT * FROM department', (err, results) => {
//         if (err) {
//             console.log(err)
//         } else {
//             departmentsArr = ['yoyo']
//             console.log(departmentsArr)
//         }
//     })
//     // Roles
//     db.query('SELECT * FROM rolee', (err, results) => {
//         if (err) {
//             console.log(err)
//         } else {
//             roleArr = Array.from(results).map((role) => {
//                 return role.title;
//             })
//         }
//     })
//     // Employees
//     db.query('SELECT * FROM employee', (err, results) => {
//         if (err) {
//             console.log(err)
//         } else {
//             employeeArr = Array.from(results).map((employee) => {
//                 return `${employee.first_name} ${employee.last_name}`
//             })
//         }
//     })
// }





const introList = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']


const viewDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log(results)
        }
    })
};

const viewRoles = () => {
    db.query('SELECT * FROM rolee', (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log(results)
        }
    })
};

const viewEmployees = () => {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log(results)
        }
    })
};

const addDepartment = (department) => {
    const newDepartment = {
        name: department
    }

    db.query('INSERT INTO department SET ?', newDepartment, (err, results) => {
        if (err) {
            console.error(err)
        } else {
            console.log(`Inserted ${results.affectedRows} row(s).`)
        }
    })
};

const addRole = (roleName, roleSalary, roleDepartment) => {
    const newRole = {
        title: roleName,
        salary: roleSalary,
        department_id: roleDepartment //change and add validation
    }

    console.log(newRole)
};

const addEmployee = (first, last, role, manager) => {
    const newEmployee = {
        first_name: first,
        last_name: last,
        rolee_id: role, //change and add validation
        manager_id: manager //change and add validation
    }

    console.log(newEmployee)
};

const updateEmployee = (parameter1, parameter2) => {
    // function body
};

const getChoices = async (query) => {
    let choiceArr;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            choiceArr = Array.from(results).map((item) =>{
                return item.title;
            })
        }
    })
    return choiceArr;
}

const run = async () => {
    const choices = await getChoices();
    console.log(choices)
    return choices;
}

const questions = async () => {
    
    const departments = await db.query('SELECT name FROM department');

    console.log(departments)
    
    const answer = await inquirer.prompt([
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
            choices: getChoices('SELECT * FROM employee'),
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

    console.log(answer)

    // .then((res) => {
    //     switch (res.intro) {
    //         case 'View all departments':
    //             viewDepartments()
    //             break;
    //         case 'View all roles':
    //             viewRoles()
    //             break;
    //         case 'View all employees':
    //             viewEmployees()
    //             break;
    //         case 'Add a department':
    //             addDepartment(res.addDepartment)
    //             break;
    //         case 'Add a role':
    //             addRole(res.addRoleName, res.addRoleSalary, res.addRoleDepartment)
    //             break;
    //         case 'Add an employee':
    //             addEmployee(res.addEmployeeFirst, res.addEmployeeLast, res.addEmployeeRole, res.addEmployeeManager)
    //             break;
    //         case 'Update an employee role':
    //             updateEmployee()
    //             break;
    //     }
    //     console.log('end of then')
    // })
}

questions()

console.log('end of page')