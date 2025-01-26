INSERT INTO department (name)
VALUES 
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 85000, 1),
    ('Sales Lead', 75000, 2),
    ('Accountant', 65000, 3),
    ('Legal Team Lead', 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Sarah', 'Smith', 3, 1),
    ('Tom', 'Allen', 4, 1);