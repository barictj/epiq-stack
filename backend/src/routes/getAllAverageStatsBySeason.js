const db = require('../persistence');

module.exports = async (req, res) => {
    const league = req.query.league || 'nba'; // ✅ Default to NBA

    try {
        const items = await db.players.getAllAverageStatsBySeason(league); // ✅ Pass league to backend
        res.json(items);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
