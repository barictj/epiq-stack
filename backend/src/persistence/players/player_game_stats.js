const db = require('../pool');
function flattenGameMetadata(game) {
    return {
        game_id: game.game_id,               // required by PRIMARY KEY
        date: game.date,
        season_year: game.season_year,
        league: game.league || 'WNBA',
        is_playoff: game.is_playoff || false,
        winner: game.winner,
        home_team: game.home_team,
        away_team: game.away_team,
        final_score: game.final_score
    };
}

function flattenPlayerGameLog(stat) {
    if (!stat || !stat.player_id) {
        throw new Error("Missing required player_id");
    }

    return {
        player_id: stat.player_id,
        date: stat.date,
        team: stat.team,
        opponent: stat.opponent,
        home_team: stat.home_team,
        away_team: stat.away_team,
        home_pts: stat.home_pts,
        away_pts: stat.away_pts,
        box_score_url: stat.box_score_url,
        ...stat.raw_stats,
        is_playoff: stat.is_playoff || false,
        league: stat.league || 'WNBA'
    };
}

async function insertGameMetadata(game) {
    const flat = flattenGameMetadata(game);
    const sql = `INSERT INTO game_log (${Object.keys(flat).join(',')}) VALUES (${Object.keys(flat).map(() => '?').join(',')})`;
    const [result] = await db.promise().query(sql, Object.values(flat));
    return flat.game_id; // ← return the ID you inserted
}

async function insertGameLog(stat) {
    const flat = flattenPlayerGameLog(stat);
    const sql = `INSERT INTO game_log (${Object.keys(flat).join(',')}) VALUES (${Object.keys(flat).map(() => '?').join(',')})`;
    const [result] = await db.promise().query(sql, Object.values(flat));
    return result.insertId;
}

async function insertPlayerEntries(gameId, players) {
    if (!players || players.length === 0) return;
    const keys = Object.keys(players[0]);
    const sql = `INSERT INTO game_log_player_entries (${keys.join(',')}, game_id) VALUES (${keys.map(() => '?').join(',')}, ?)`;
    for (const player of players) {
        await db.promise().query(sql, [...Object.values(player), gameId]);
    }
}

async function insertClutchEntries(gameId, clutchPlayers) {
    if (!clutchPlayers || clutchPlayers.length === 0) return;
    const keys = Object.keys(clutchPlayers[0]);
    const sql = `INSERT INTO game_log_player_entries_clutch (${keys.join(',')}, game_id) VALUES (${keys.map(() => '?').join(',')}, ?)`;
    for (const player of clutchPlayers) {
        await db.promise().query(sql, [...Object.values(player), gameId]);
    }
}

async function updateGameLogById(gameId, game) {
    const flat = flattenGameMetadata(game);
    const sql = `UPDATE game_log SET ${Object.keys(flat).map(k => `${k} = ?`).join(', ')} WHERE game_id = ?`;
    await db.promise().query(sql, [...Object.values(flat), gameId]);
}

async function updatePlayerEntriesByGameId(gameId, players) {
    if (!players || players.length === 0) return;
    const keys = Object.keys(players[0]);
    const sql = `REPLACE INTO game_log_player_entries (${keys.join(',')}, game_id) VALUES (${keys.map(() => '?').join(',')}, ?)`;
    for (const player of players) {
        await db.promise().query(sql, [...Object.values(player), gameId]);
    }
}

async function updateClutchEntriesByGameId(gameId, clutchPlayers) {
    if (!clutchPlayers || clutchPlayers.length === 0) return;
    const keys = Object.keys(clutchPlayers[0]);
    const sql = `REPLACE INTO game_log_player_entries_clutch (${keys.join(',')}, game_id) VALUES (${keys.map(() => '?').join(',')}, ?)`;
    for (const player of clutchPlayers) {
        await db.promise().query(sql, [...Object.values(player), gameId]);
    }
}

async function fetchGameLogs(date, is_playoff, league) {
    const sql = `SELECT * FROM game_log WHERE date = ? AND is_playoff = ? AND league = ?`;
    const [rows] = await db.promise().query(sql, [date, is_playoff, league]);
    return rows;
}

async function fetchPlayerEntries(date, is_playoff, league) {
    const sql = `
    SELECT p.* FROM game_log_player_entries p
    JOIN game_log g ON p.game_id = g.game_id
    WHERE g.date = ? AND g.is_playoff = ? AND g.league = ?`;
    const [rows] = await db.promise().query(sql, [date, is_playoff, league]);
    return rows;
}

async function fetchClutchEntries(date, is_playoff, league) {
    const sql = `
    SELECT c.* FROM game_log_player_entries_clutch c
    JOIN game_log g ON c.game_id = g.game_id
    WHERE g.date = ? AND g.is_playoff = ? AND g.league = ?`;
    const [rows] = await db.promise().query(sql, [date, is_playoff, league]);
    return rows;
}

async function fetchGameLogById(gameId) {
    const sql = `SELECT * FROM game_log WHERE game_id = ?`;
    const [rows] = await db.promise().query(sql, [gameId]);
    return rows[0];
}

async function fetchPlayerEntriesByGameId(gameId) {
    const sql = `SELECT * FROM game_log_player_entries WHERE game_id = ?`;
    const [rows] = await db.promise().query(sql, [gameId]);
    return rows;
}

async function fetchClutchEntriesByGameId(gameId) {
    const sql = `SELECT * FROM game_log_player_entries_clutch WHERE game_id = ?`;
    const [rows] = await db.promise().query(sql, [gameId]);
    return rows;
}

module.exports = {
    insertGameMetadata,
    insertGameLog,
    insertPlayerEntries,
    insertClutchEntries,
    updateGameLogById,
    updatePlayerEntriesByGameId,
    updateClutchEntriesByGameId,
    fetchGameLogs,
    fetchPlayerEntries,
    fetchClutchEntries,
    fetchGameLogById,
    fetchPlayerEntriesByGameId,
    fetchClutchEntriesByGameId
};
