const pool = require('../pool');

function normalize(row) {
    return { ...row, completed: row.completed === 1 };
}

function normalizeStats(row) {
    return { ...row };
}

async function getItems() {
    const [rows] = await pool.promise().query('SELECT * FROM players');
    return rows.map(normalize);
}

async function getItem(id) {
    const [rows] = await pool.promise().query('SELECT * FROM players WHERE id = ?', [id]);
    return rows.length ? normalize(rows[0]) : null;
}

async function getJoinedItems(id) {
    const [rows] = await pool.promise().query(
        'SELECT * FROM player_stats_by_year WHERE player_id = ?',
        [id]
    );
    console.log(rows);
    return rows.length ? rows.map(normalizeStats) : [];
}

async function storeItem(item) {
    await pool.promise().query(
        `INSERT INTO players (
            id, name, team, position, player_image_url, active
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
            item.id,
            item.name,
            item.team || '',
            item.position || '',
            item.player_image_url || '',
            item.active !== undefined ? item.active : 1
        ]
    );
}

async function updateItem(id, item) {
    await pool.promise().query(
        `UPDATE player_stats SET
            player_id = ?,
            season_year = ?,
            games_played = ?,
            efficiency_possession_impact_quotient = ?,
            total_points = ?,
            total_rebounds = ?,
            total_assists = ?,
            total_steals = ?,
            total_blocks = ?,
            total_turnovers = ?,
            total_fouls = ?,
            field_goals_made = ?,
            field_goals_attempted = ?,
            three_points_made = ?,
            three_points_attempted = ?,
            free_throws_made = ?,
            free_throws_attempted = ?,
            offensive_rebounds = ?,
            defensive_rebounds = ?,
            points_against = ?
        WHERE id = ?`,
        [
            item.player_id,
            item.season_year,
            item.games_played,
            item.efficiency_possession_impact_quotient,
            item.total_points,
            item.total_rebounds,
            item.total_assists,
            item.total_steals,
            item.total_blocks,
            item.total_turnovers,
            item.total_fouls,
            item.field_goals_made,
            item.field_goals_attempted,
            item.three_points_made,
            item.three_points_attempted,
            item.free_throws_made,
            item.free_throws_attempted,
            item.offensive_rebounds,
            item.defensive_rebounds,
            item.points_against,
            id
        ]
    );
}

async function removeItem(id) {
    await pool.promise().query('DELETE FROM players WHERE id = ?', [id]);
}

module.exports = {
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
    getJoinedItems,
};
