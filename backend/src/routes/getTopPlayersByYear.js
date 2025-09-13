const db = require('../persistence');

module.exports = async (req, res) => {
    const {
        year,
        startAt = 0,
        endBy = 24,
        sortBy = 'efficiency_possession_impact_quotient',
        direction = 'DESC',
        league = 'nba' // ✅ Default to NBA
    } = req.query;

    if (!year) {
        return res.status(400).json({ error: 'Missing required parameter: year' });
    }

    try {
        const topPlayers = await db.players.getTopPlayersByYear({
            year: parseInt(year, 10),
            startAt: parseInt(startAt, 10),
            endBy: parseInt(endBy, 10),
            sortBy,
            direction,
            league // ✅ Pass league to backend
        });

        res.json(topPlayers);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
