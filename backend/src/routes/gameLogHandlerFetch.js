const db = require('../persistence');

async function getGameLogs(req, res) {
    const { date, is_playoff, league } = req.query;
    try {
        const logs = await db.players.fetchGameLogs(date, is_playoff, league);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch game logs' });
    }
}

async function getPlayerEntries(req, res) {
    const { date, is_playoff, league } = req.query;
    try {
        const entries = await db.players.fetchPlayerEntries(date, is_playoff, league);
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch player entries' });
    }
}

async function getClutchEntries(req, res) {
    const { date, is_playoff, league } = req.query;
    try {
        const entries = await db.players.fetchClutchEntries(date, is_playoff, league);
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch clutch entries' });
    }
}

async function getGameLogById(req, res) {
    try {
        const log = await db.players.fetchGameLogById(req.params.gameId);
        res.json(log);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch game log' });
    }
}

async function getPlayerEntriesByGameId(req, res) {
    try {
        const entries = await db.players.fetchPlayerEntriesByGameId(req.params.gameId);
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch player entries' });
    }
}

async function getClutchEntriesByGameId(req, res) {
    try {
        const entries = await db.players.fetchClutchEntriesByGameId(req.params.gameId);
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch clutch entries' });
    }
}

module.exports = {
    getGameLogs,
    getPlayerEntries,
    getClutchEntries,
    getGameLogById,
    getPlayerEntriesByGameId,
    getClutchEntriesByGameId
};
