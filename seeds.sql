
-- Let's me delete the tables
SET FOREIGN_KEY_CHECKS=0;

-- Deletes data from all tables
TRUNCATE TABLE employee;
TRUNCATE TABLE rolee;
TRUNCATE TABLE department;

-- Re-enables the foreign key check
SET FOREIGN_KEY_CHECKS=1;





-- Insert data into the department table
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Finance');

-- Insert data into the rolee table
INSERT INTO rolee (title, salary, department_id) VALUES ('Sales Manager', 60000, 1);
INSERT INTO rolee (title, salary, department_id) VALUES ('Sales Rep', 40000, 1);
INSERT INTO rolee (title, salary, department_id) VALUES ('Marketing Manager', 65000, 2);
INSERT INTO rolee (title, salary, department_id) VALUES ('Marketing Coordinator', 35000, 2);
INSERT INTO rolee (title, salary, department_id) VALUES ('Finance Manager', 75000, 3);
INSERT INTO rolee (title, salary, department_id) VALUES ('Accountant', 50000, 3);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, rolee_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, rolee_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, rolee_id, manager_id) VALUES ('Bob', 'Johnson', 2, 1);
INSERT INTO employee (first_name, last_name, rolee_id, manager_id) VALUES ('Alice', 'Lee', 3, 2);
INSERT INTO employee (first_name, last_name, rolee_id, manager_id) VALUES ('Tom', 'Brown', 4, 3);
INSERT INTO employee (first_name, last_name, rolee_id, manager_id) VALUES ('Sara', 'Davis', 5, 3);
INSERT INTO employee (first_name, last_name, rolee_id, manager_id) VALUES ('Mike', 'Clark', 6, 4);


SELECT * FROM department;
SELECT * FROM rolee;
SELECT * FROM employee;

