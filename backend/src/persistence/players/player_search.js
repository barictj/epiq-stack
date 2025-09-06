const pool = require('../pool');
function normalize(row) {
    return { ...row, completed: row.completed === 1 };
}

async function searchPlayersByName(name) {
    const searchTerm = `%${name}%`; // Enables partial match
    const [rows] = await pool
        .promise()
        .query('SELECT * FROM players WHERE LOWER(name) LIKE LOWER(?)', [searchTerm]);
    return rows.map(normalize);
}
module.exports = {
    searchPlayersByName
};