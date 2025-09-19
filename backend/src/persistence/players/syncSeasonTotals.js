const pool = require('../pool');
const { updatePlayerStats, addPlayerStats } = require('./player_stats');

// Calculate possessions
function calculatePossessions(row) {
    const fga = row.field_goals_attempted || 0;
    const fta = row.free_throws_attempted || 0;
    const oreb = row.offensive_rebounds || 0;
    const dreb = row.defensive_rebounds || 0;
    const fgm = row.field_goals_made || 0;
    const tov = row.total_turnovers || 0;
    const totalRebounds = oreb + dreb;

    if (totalRebounds === 0) return 0.0;

    const missedFg = fga - fgm;
    const reboundFactor = 1.07 * (oreb / totalRebounds);
    const possessions = fga + 0.4 * fta - reboundFactor * missedFg + tov;
    return parseFloat(possessions.toFixed(2));
}

// Calculate EPIQ
function calculateEpiq(row) {
    console.log(`Calculating EPIQ for ${row.name || row.player_id} in ${row.season_year}`);

    const possessions = parseFloat(row.possessions || 0);
    const gp = parseInt(row.games_played || 0);
    if (possessions === 0 || gp === 0) return [0.0, 0.0, 0.0];

    const pts = parseFloat(row.total_points || 0);
    const ast = parseFloat(row.total_assists || 0);
    const tov = parseFloat(row.total_turnovers || 0);
    const oreb = parseFloat(row.offensive_rebounds || 0);
    const fga = parseFloat(row.field_goals_attempted || 0);
    const fta = parseFloat(row.free_throws_attempted || 0);

    const SECOND_CHANCE_PTS_PER_OREB = 1.2;
    const ASSIST_VALUE = 2.0;
    const FTA_WEIGHT = 0.44;

    const possessionsUsed = fga + FTA_WEIGHT * fta + tov + ast;
    if (possessionsUsed === 0) return [0.0, 0.0, 0.0];

    const pointsPerPossessionUsed = pts / possessionsUsed;
    const scoringImpact = pointsPerPossessionUsed * possessionsUsed;
    const assistImpact = ast * ASSIST_VALUE;
    const reboundImpact = oreb * SECOND_CHANCE_PTS_PER_OREB;
    const totalImpact = scoringImpact + assistImpact + reboundImpact;

    const epiq = totalImpact / possessions;
    const seasonalEpiq = parseFloat((epiq * possessions).toFixed(3));
    const epiqPerGame = parseFloat((seasonalEpiq / gp).toFixed(3));

    return [parseFloat(epiq.toFixed(3)), seasonalEpiq, epiqPerGame];
}

// Sanitize incoming game stat
function sanitizePlayerStat(entry) {
    return {
        player_id: entry.player_id,
        season_year: entry.season_year || entry.season || entry.year,
        league: entry.league || 'WNBA',
        total_points: entry.points,
        total_rebounds: entry.rebounds,
        total_assists: entry.assists,
        total_steals: entry.steals,
        total_blocks: entry.blocks,
        total_turnovers: entry.turnovers,
        total_fouls: entry.fouls,
        field_goals_made: entry.field_goals_made,
        field_goals_attempted: entry.field_goals_attempted,
        three_points_made: entry.three_points_made,
        three_points_attempted: entry.three_points_attempted,
        free_throws_made: entry.free_throws_made,
        free_throws_attempted: entry.free_throws_attempted,
        offensive_rebounds: entry.offensive_rebounds,
        defensive_rebounds: entry.defensive_rebounds,
        points_against: entry.points_against,
        team: entry.team,
        position: entry.position || '',
    };
}

// Pull season totals
async function getPlayerSeasonStat(player_id, season_year, league) {
    const query = `
    SELECT *
    FROM player_stats_by_year
    WHERE player_id = ? AND season_year = ? AND league = ?
    LIMIT 1
  `;
    const [rows] = await pool.promise().query(query, [player_id, season_year, league]);
    return rows.length ? rows[0] : null;
}

// Pull game entries
async function getPlayerEntriesByGameId(gameId) {
    const [rows] = await pool.promise().query(
        `SELECT p.*, g.season_year, g.league
     FROM game_log_player_entries p
     JOIN game_log g ON p.game_id = g.game_id
     WHERE p.game_id = ?`,
        [gameId]
    );
    return rows;
}

// Main sync function
async function syncSeasonTotals(gameId) {
    console.log(`🔄 Syncing season totals for game ${gameId}...`);
    const entries = await getPlayerEntriesByGameId(gameId);

    for (const entry of entries) {
        const gameStat = sanitizePlayerStat(entry);
        gameStat.possessions = calculatePossessions(gameStat);

        if (!gameStat.player_id || !gameStat.season_year || !gameStat.league) {
            console.warn(`❌ Missing stat keys for entry:`, gameStat);
            continue;
        }

        const seasonStat = await getPlayerSeasonStat(gameStat.player_id, gameStat.season_year, gameStat.league);

        if (!seasonStat) {
            gameStat.games_played = 1;
            const [epiq, seasonalEpiq, epiqPerGame] = calculateEpiq({ ...gameStat, games_played: 1 });
            gameStat.efficiency_possession_impact_quotient = epiq;
            gameStat.seasonal_epiq = seasonalEpiq;
            gameStat.epiq_per_game = epiqPerGame;
            gameStat.id = `${gameStat.player_id}-${gameStat.season_year}-${gameStat.league}`;

            try {
                await addPlayerStats(gameStat);
            } catch (insertErr) {
                console.error(`❌ Failed to insert stat line for ${gameStat.id}:`, insertErr);
            }
            continue;
        }

        // Merge game into season totals
        seasonStat.games_played += 1;

        for (const key of [
            "total_points", "total_assists", "total_turnovers",
            "offensive_rebounds", "defensive_rebounds", "field_goals_attempted",
            "free_throws_attempted", "field_goals_made", "free_throws_made",
            "three_points_made", "three_points_attempted", "total_rebounds",
            "total_steals", "total_blocks", "total_fouls", "points_against", "possessions"
        ]) {
            seasonStat[key] = (seasonStat[key] || 0) + (gameStat[key] || 0);
        }

        const [epiq, seasonalEpiq, epiqPerGame] = calculateEpiq(seasonStat);
        seasonStat.efficiency_possession_impact_quotient = epiq;
        seasonStat.seasonal_epiq = seasonalEpiq;
        seasonStat.epiq_per_game = epiqPerGame;
        seasonStat.id = `${seasonStat.player_id}-${seasonStat.season_year}-${seasonStat.league}`;

        try {
            await updatePlayerStats(seasonStat);
        } catch (err) {
            console.error(`❌ Failed to update stat line for ${seasonStat.id}:`, err);
        }
    }

    console.log(`✅ Season totals synced for game ${gameId}`);
}

module.exports = { syncSeasonTotals };
