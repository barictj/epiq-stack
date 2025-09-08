const db = require('../persistence');

module.exports = async (req, res) => {
    const { year, limit = 25, sortBy = 'efficiency_possession_impact_quotient' } = req.query;

    if (!year) {
        return res.status(400).json({ error: 'Missing required parameter: year' });
    }

    try {
        const topPlayers = await db.players.getTopPlayersByYear({
            year: parseInt(year, 10),
            limit: parseInt(limit, 10),
            sortBy
        });

        res.json(topPlayers);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
