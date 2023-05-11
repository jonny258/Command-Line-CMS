DROP DATABASE IF EXISTS my_company_db;

CREATE DATABASE my_company_db;

USE my_company_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE rolee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    rolee_id INT,
    manager_id INT,
    FOREIGN KEY (rolee_id)
    REFERENCES rolee(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);

-- Checks test to see if it works
SHOW TABLES;
DESCRIBE department;
DESCRIBE rolee;
DESCRIBE employee;