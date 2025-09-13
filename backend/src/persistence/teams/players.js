const pool = require('../pool');

function normalize(row) {
    return { ...row };
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
    sortBy = 'efficiency_possession_impact_quotient',
}) {
    if (!allowedSortFields.includes(sortBy)) {
        throw new Error(`Invalid sort field: ${sortBy}`);
    }

    const safeYear = Number(year);
    const safeStart = Math.max(0, Number(startAt));
    const safeEnd = Math.max(safeStart, Number(endBy));
    const safeLimit = safeEnd - safeStart + 1;
    const safeOffset = safeStart;

    const query = `
    SELECT * 
    FROM player_stats_by_year 
    WHERE season_year = ?
    ORDER BY ${sortBy} DESC 
    LIMIT ? OFFSET ?
  `;

    console.log(`[SQL] ${query} — [${safeYear}, ${safeLimit}, ${safeOffset}]`);

    const [rows] = await pool.promise().query(query, [safeYear, safeLimit, safeOffset]);
    const normalizedStats = rows.map(normalize);

    const enriched = await Promise.all(
        normalizedStats.map(async (stat) => {
            const player = await getItem(stat.player_id);
            return {
                ...stat,
                player,
            };
        })
    );

    return enriched;
}



async function getJoinedItems(id) {
    // Fetch player core info
    const [[player]] = await pool.promise().query(
        'SELECT * FROM players WHERE id = ?',
        [id]
    );

    if (!player) return null;

    // Fetch all stat rows for that player
    const [stats] = await pool.promise().query(
        'SELECT * FROM player_stats_by_year WHERE player_id = ? ORDER BY season_year ASC',
        [id]
    );

    return {
        ...player,
        yearStats: stats.map(normalizeStats)
    };
}
async function getBySeason(year) {
    const [year_stats] = await pool.promise().query(
        'SELECT * FROM player_stats_by_year WHERE season_year = ?',
        [year]
    );

    if (!year_stats || year_stats.length === 0) return null;

    // Fetch all matching players
    const playerIds = year_stats.map(stat => stat.player_id);
    const [players] = await pool.promise().query(
        'SELECT * FROM players WHERE id IN (?)',
        [playerIds]
    );

    const playerMap = new Map(players.map(p => [p.id, normalize(p)]));

    // Merge stats with player info
    const merged = year_stats.map(stat => ({
        player: playerMap.get(stat.player_id),
        yearStats: stat
    }));

    return merged;
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


async function removeItem(id) {
    await pool.promise().query('DELETE FROM players WHERE id = ?', [id]);
}

module.exports = {
    getItems,
    getItem,
    storeItem,
    removeItem,
    getJoinedItems,
    getBySeason,
    getTopPlayersByYear
};
