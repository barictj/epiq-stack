const pool = require('../pool');

function normalize(row) {
    return { ...row, completed: row.completed === 1 };
}

async function getItems() {
    const [rows] = await pool.promise().query('SELECT * FROM players');
    return rows.map(normalize);
}

async function getItem(id) {
    const [rows] = await pool.promise().query('SELECT * FROM players  WHERE id = ?', [id]);

    return rows.length ? normalize(rows[0]) : null;
}

async function storeItem(item) {
    await pool.promise().query(
        'INSERT INTO players  (id, name, active) VALUES (?, ?, ?)',
        [item.id, item.name, item.completed ? 1 : 0]
    );
}

async function updateItem(id, item) {
    await pool.promise().query(
        'UPDATE players  SET name = ?, active = ? WHERE id = ?',
        [item.name, item.completed ? 1 : 0, id]
    );
}

async function removeItem(id) {
    await pool.promise().query('DELETE FROM players  WHERE id = ?', [id]);
}

module.exports = {
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
};
