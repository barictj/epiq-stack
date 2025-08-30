const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    charset: 'utf8mb4',
});

module.exports = pool;
