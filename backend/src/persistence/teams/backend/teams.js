const { get } = require('http');
const pool = require('../../pool');

function normalize(row) {
    return { ...row };
}

function normalizeStats(row) {
    return { ...row };
}

async function getTeams() {
    const [rows] = await pool.promise().query('SELECT * FROM teams');
    return rows.map(normalize);
}

async function getTeam(id) {
    const [rows] = await pool.promise().query('SELECT * FROM teams WHERE id = ?', [id]);
    return rows.length ? normalize(rows[0]) : null;
}
const allowedSortFields = [
    'games_played',
    'possessions',
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
    'field_goals_made',
    'field_goals_attempted',
    'three_points_made',
    'three_points_attempted',
    'free_throws_made',
    'free_throws_attempted',
    'offensive_rebounds',
    'defensive_rebounds'
];

async function getTopTeamsByYear({
    year,
    startAt = 0,
    endBy = 24,
    sortBy = 'efficiency_possession_impact_quotient',
    direction = 'DESC',
    league = 'NBA',
}) {
    if (!allowedSortFields.includes(sortBy)) {
        throw new Error(`Invalid sort field: ${sortBy}`);
    }

    const safeYear = Number(year);
    const safeStart = Math.max(0, Number(startAt));
    const safeEnd = Math.max(safeStart, Number(endBy));
    const safeLimit = safeEnd - safeStart + 1;
    const safeOffset = safeStart;
    const safeDirection = direction === 'ASC' ? 'ASC' : 'DESC';

    const query = `
    SELECT * 
    FROM team_stats_by_year 
    WHERE season_year = ? AND league = ?
    ORDER BY ${sortBy} ${safeDirection}
    LIMIT ? OFFSET ?
  `;

    console.log(`[SQL] ${query} — [${safeYear}, ${league}, ${safeLimit}, ${safeOffset}]`);

    const [rows] = await pool.promise().query(query, [
        safeYear,
        league,
        safeLimit,
        safeOffset
    ]);

    const normalizedStats = rows.map(normalize);

    const enriched = await Promise.all(
        normalizedStats.map(async (stat) => {
            const team = await getTeam(stat.team_id);
            return {
                ...stat,
                team,
            };
        })
    );

    return enriched;
}


async function getJoinedItems(id) {
    // Fetch player core info
    const [[team]] = await pool.promise().query(
        'SELECT * FROM teams WHERE id = ?',
        [id]
    );

    if (!team) return null;

    // Fetch all stat rows for that player
    const [stats] = await pool.promise().query(
        'SELECT * FROM team_stats_by_year WHERE team_id = ? ORDER BY season_year DESC',
        [id]
    );

    return {
        ...team,
        yearStats: stats.map(normalizeStats)
    };
}
async function getBySeason(year) {
    const [year_stats] = await pool.promise().query(
        'SELECT * FROM team_stats_by_year WHERE season_year = ?',
        [year]
    );

    if (!year_stats || year_stats.length === 0) return null;

    // Fetch all matching players
    const teamIds = year_stats.map(stat => stat.team_id);
    const [teams] = await pool.promise().query(
        'SELECT * FROM teams WHERE id IN (?)',
        [teamIds]
    );

    const teamMap = new Map(teams.map(t => [t.id, normalize(t)]));

    // Merge stats with player info
    const merged = year_stats.map(stat => ({
        team: teamMap.get(stat.team_id),
        yearStats: stat
    }));

    return merged;
}



async function storeTeam(item) {
    await pool.promise().query(
        `INSERT INTO teams (
            id, name, abbreviation, league, team_logo_url, active
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
            item.id,
            item.name,
            item.abbreviation || '',
            item.league || '',
            item.team_logo_url || '',
            item.active !== undefined ? item.active : 1
        ]
    );
}
async function updateTeam(item) {
    await pool.promise().query(
        `UPDATE teams SET
            name = ?,
            abbreviation = ?,
            league = ?,
            team_logo_url = ?,
            active = ?
        WHERE id = ?`,
        [
            item.name,
            item.abbreviation || '',
            item.league || '',
            item.team_logo_url || '',
            item.active !== undefined ? item.active : 1,
            item.id
        ]
    );
}


module.exports = {
    getTeams,
    getTeam,
    storeTeam,
    getJoinedItems,
    getBySeason,
    getTopTeamsByYear,
    updateTeam
};
