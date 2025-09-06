const db = require('../persistence');

module.exports = async (req, res) => {
    try {
        const item = await db.players.getItem(req.params.id);
        res.json(item);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
