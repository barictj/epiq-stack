const db = require('../persistence');

module.exports = async (req, res) => {
    try {
        console.log(req.params.id);
        const items = await db.players.getJoinedItems(req.params.id);
        console.log(items);
        res.json(items);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
