const pool = require('../pool');

function normalize(row) {
    return { ...row };
}

function normalizeStats(row) {
    return { ...row };
}

async function updatePlayer(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    // Ensure league is present and defaulted
    if (!keys.includes('league')) {
        keys.push('league');
        values.push('nba');
    }

    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const sql = `UPDATE players SET ${setClause} WHERE id = ?`;

    await pool.promise().query(sql, [...values, id]);
}

async function getItem(id, league = 'nba') {
    const [rows] = await pool.promise().query(
        'SELECT * FROM players WHERE id = ? AND league = ?',
        [id, league]
    );
    return rows.length ? normalize(rows[0]) : null;
}

async function getItems(league = 'nba') {
    const [rows] = await pool.promise().query(
        'SELECT * FROM players WHERE league = ?',
        [league]
    );
    return rows.map(normalize);
}

async function getJoinedItems(id, league = 'nba') {
    const player = await getItem(id, league);
    if (!player) return null;

    const [stats] = await pool.promise().query(
        'SELECT * FROM player_stats_by_year WHERE player_id = ? AND league = ? ORDER BY season_year ASC',
        [id, league]
    );

    return {
        ...player,
        yearStats: stats.map(normalizeStats)
    };
}

async function getBySeason(year, league = 'nba') {
    const [year_stats] = await pool.promise().query(
        'SELECT * FROM player_stats_by_year WHERE season_year = ? AND league = ?',
        [year, league]
    );

    if (!year_stats || year_stats.length === 0) return null;

    const playerIds = year_stats.map(stat => stat.player_id);
    const [players] = await pool.promise().query(
        'SELECT * FROM players WHERE id IN (?) AND league = ?',
        [playerIds, league]
    );

    const playerMap = new Map(players.map(p => [p.id, normalize(p)]));

    const merged = year_stats.map(stat => ({
        player: playerMap.get(stat.player_id),
        yearStats: stat
    }));

    return merged;
}

const allowedSortFields = [
    'epiq_per_game',
    'seasonal_epiq',
    'efficiency_possession_impact_quotient',
    'total_points',
    'total_rebounds',
    'total_assists',
    'total_steals',
    'total_blocks',
    'total_turnovers',
    'total_fouls',
    'games_played',
    'possessions',
    'field_goals_made',
    'field_goals_attempted',
    'free_throws_made',
    'free_throws_attempted',
    'three_points_made',
    'three_points_attempted',
    'offensive_rebounds',
    'defensive_rebounds',
];

async function getTopPlayersByYear({
    year,
    startAt = 0,
    endBy = 24,
    sortBy = 'seasonal_epiq',
    direction = 'DESC',
    league = 'nba'
}) {
    if (!allowedSortFields.includes(sortBy)) {
        throw new Error(`Invalid sort field: ${sortBy}`);
    }

    const safeYear = Number(year);
    const safeStart = Math.max(0, Number(startAt));
    const safeEnd = Math.max(safeStart, Number(endBy));
    const safeLimit = safeEnd - safeStart + 1;
    const safeOffset = safeStart;
    const safeDirection = direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const query = `
    SELECT * 
    FROM player_stats_by_year 
    WHERE season_year = ? AND league = ?
    ORDER BY ${sortBy} ${safeDirection}
    LIMIT ? OFFSET ?
  `;

    const [rows] = await pool.promise().query(query, [safeYear, league, safeLimit, safeOffset]);
    const normalizedStats = rows.map(normalize);

    const enriched = await Promise.all(
        normalizedStats.map(async (stat) => {
            const player = await getItem(stat.player_id, league);
            return {
                ...stat,
                player,
            };
        })
    );

    return enriched;
}

async function storeItem(item) {
    const league = item.league || 'nba';

    await pool.promise().query(
        `INSERT INTO players (
    id, name, team, position, player_image_url, active, total_points_all_time, seasons_played, career_epiq, league
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            item.id,
            item.name,
            item.team || '',
            item.position || '',
            item.player_image_url || '',
            item.active !== undefined ? item.active : 1,
            item.total_points_all_time || 0,
            item.seasons_played || 0,
            item.career_epiq || 0,
            league
        ]
    );
}

async function removeItem(id) {
    await pool.promise().query('DELETE FROM players WHERE id = ?', [id]);
}

module.exports = {
    getItem,
    getItems,
    getJoinedItems,
    getBySeason,
    getTopPlayersByYear,
    storeItem,
    updatePlayer,
    removeItem
};
