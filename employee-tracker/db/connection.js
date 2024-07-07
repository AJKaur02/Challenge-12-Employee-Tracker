const { Pool } = require('pg');

const pool = new Pool({
    user: 'amrinderjeetkaur',
    host: 'localhost',
    database: 'employee_tracker',
    password: 'your_password', // Replace with your actual PostgreSQL password
    port: 5432,
});

module.exports = pool;
