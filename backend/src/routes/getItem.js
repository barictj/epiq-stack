const db = require('../persistence');

module.exports = async (req, res) => {
    const { id } = req.params;
    const league = req.query.league || 'nba'; // ✅ Default to NBA

    try {
        const item = await db.players.getJoinedItems(id, league); // ✅ Pass league to backend
        if (!item) {
            return res.status(404).json({ error: 'Player not found' });
        }
        res.json(item);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
