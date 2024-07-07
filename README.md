# Employee Tracker CLI Application

This Node.js Command Line Interface (CLI) application allows you to manage departments, roles, and employees in a company database.

## Features

- View all departments, roles, and employees
- Add departments, roles, and employees
- Update an employee's role

## Installation

1. Clone the repository
    ```bash
        git clone git@github.com:AJKaur02/Challenge-12-Employee-Tracker.git
    cd Challenge-12-Employee-Tracker

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your database:
   - Ensure you have PostgreSQL installed and running.
   - Create a `.env` file based on `.env.example` and configure your database connection.

4. Run the application:
   ```bash
   node index.js
   ```

## Usage

Follow the prompts in the terminal to navigate through the application's menu options.

## Dependencies

- [inquirer](https://www.npmjs.com/package/inquirer): For interactive command-line user interfaces.
- [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js.

## Database Schema

1. **Department Table:**
   - **Columns:**
     - `id`: Unique identifier for the department (primary key).
     - `name`: Name of the department.

2. **Role Table:**
   - **Columns:**
     - `id`: Unique identifier for the role (primary key).
     - `title`: Title of the role.
     - `salary`: Salary associated with the role.
     - `department_id`: Foreign key referencing the department the role belongs to.

3. **Employee Table:**
   - **Columns:**
     - `id`: Unique identifier for the employee (primary key).
     - `first_name`: First name of the employee.
     - `last_name`: Last name of the employee.
     - `role_id`: Foreign key referencing the role of the employee.
     - `manager_id`: Foreign key referencing another employee who is the manager of this employee (can be NULL).

### Relationships

- **Role to Department**: Each role belongs to one department. This is established through the `department_id` foreign key in the Role table.
- **Employee to Role**: Each employee is assigned to one role, which is established through the `role_id` foreign key in the Employee table.
- **Employee to Manager**: Each employee (except managers) may have a manager. This relationship is established through the `manager_id` foreign key in the Employee table, referencing another employee who is the manager.

### Functionality

Your application interacts with this database schema to perform operations such as:
- Viewing all departments, roles, and employees.
- Adding new departments, roles, and employees.
- Updating an employee's role.

This schema allows for organizing employees into departments, defining their roles within those departments, and establishing hierarchical relationships among employees.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Instructions:
1. **Title and Description:** Replace "Employee Tracker CLI Application" with your application's name and provide a brief description of what it does.
   
2. **Features:** List key features of your application.

3. **Installation:** Outline steps to clone, install dependencies, and set up the database.

4. **Usage:** Provide instructions on how to use the application.

5. **Dependencies:** List major dependencies and provide links to their npm pages.

6. **Database Schema:** If applicable, describe your database schema or provide a diagram.

7. **Contributing:** Guidelines for others who want to contribute to your project.

8. **License:** Mention the license under which your project is distributed.
