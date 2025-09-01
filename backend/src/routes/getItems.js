const db = require('../persistence');

module.exports = async (req, res) => {
    try {
        const items = await db.players.getItems();
        res.json(items);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
