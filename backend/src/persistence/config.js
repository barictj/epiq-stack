const fs = require('fs');

function readEnvOrFile(env, file) {
    return file ? fs.readFileSync(file, 'utf8').trim() : env;
}
console.log('Using MySQL database:', process.env.MYSQL_DATABASE);

module.exports = {
    host: readEnvOrFile(process.env.MYSQL_HOST, process.env.MYSQL_HOST_FILE),
    user: readEnvOrFile(process.env.MYSQL_USER, process.env.MYSQL_USER_FILE),
    password: readEnvOrFile(process.env.MYSQL_PASSWORD, process.env.MYSQL_PASSWORD_FILE),
    database: readEnvOrFile(process.env.MYSQL_DATABASE, process.env.MYSQL_DB_FILE),
};