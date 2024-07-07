const inquirer = require('inquirer');
const { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db/queries');

const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            promptAddDepartment();
            break;
        case 'Add a role':
            promptAddRole();
            break;
        case 'Add an employee':
            promptAddEmployee();
            break;
        case 'Update an employee role':
            promptUpdateEmployeeRole();
            break;
        case 'Exit':
            process.exit();
    }
};

const viewDepartments = async () => {
    try {
        const departments = await getDepartments();
        console.table(departments);
        mainMenu();
    } catch (error) {
        console.error('Error viewing departments:', error);
        mainMenu();
    }
};

const viewRoles = async () => {
    try {
        const roles = await getRoles();
        console.table(roles);
        mainMenu();
    } catch (error) {
        console.error('Error viewing roles:', error);
        mainMenu();
    }
};

const viewEmployees = async () => {
    try {
        const employees = await getEmployees();
        console.table(employees);
        mainMenu();
    } catch (error) {
        console.error('Error viewing employees:', error);
        mainMenu();
    }
};

const promptAddDepartment = async () => {
    try {
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        });

        await addDepartment(name);
        console.log('Department added successfully.');
        mainMenu();
    } catch (error) {
        console.error('Error adding department:', error);
        mainMenu();
    }
};

const promptAddRole = async () => {
    try {
        const departments = await getDepartments();
        const departmentChoices = departments.map(department => ({ name: department.name, value: department.id }));

        const { title, salary, department_id } = await inquirer.prompt([
            { type: 'input', name: 'title', message: 'Enter the title of the role:' },
            { type: 'input', name: 'salary', message: 'Enter the salary of the role:' },
            { type: 'list', name: 'department_id', message: 'Select the department for the role:', choices: departmentChoices }
        ]);

        await addRole(title, salary, department_id);
        console.log('Role added successfully.');
        mainMenu();
    } catch (error) {
        console.error('Error adding role:', error);
        mainMenu();
    }
};

const promptAddEmployee = async () => {
    try {
        const roles = await getRoles();
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

        const employees = await getEmployees();
        const managerChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
        managerChoices.unshift({ name: 'None', value: null });

        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            { type: 'input', name: 'first_name', message: 'Enter the first name of the employee:' },
            { type: 'input', name: 'last_name', message: 'Enter the last name of the employee:' },
            { type: 'list', name: 'role_id', message: 'Select the role for the employee:', choices: roleChoices },
            { type: 'list', name: 'manager_id', message: 'Select the manager for the employee:', choices: managerChoices }
        ]);

        await addEmployee(first_name, last_name, role_id, manager_id);
        console.log('Employee added successfully.');
        mainMenu();
    } catch (error) {
        console.error('Error adding employee:', error);
        mainMenu();
    }
};

const promptUpdateEmployeeRole = async () => {
    try {
        const employees = await getEmployees();
        const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

        const roles = await getRoles();
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

        const { employee_id, role_id } = await inquirer.prompt([
            { type: 'list', name: 'employee_id', message: 'Select the employee to update:', choices: employeeChoices },
            { type: 'list', name: 'role_id', message: 'Select the new role for the employee:', choices: roleChoices }
        ]);

        await updateEmployeeRole(employee_id, role_id);
        console.log('Employee role updated successfully.');
        mainMenu();
    } catch (error) {
        console.error('Error updating employee role:', error);
        mainMenu();
    }
};

mainMenu();
