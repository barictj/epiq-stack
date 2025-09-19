const pool = require('../../pool');
function normalize(row) {
    return { ...row, completed: row.completed === 1 };
}

async function getAwards() {
    return await pool.promise().query(`SELECT * FROM awards`);
}
module.exports = {
    getAwards
};