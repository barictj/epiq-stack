const db = require('../persistence');

module.exports = async (req, res) => {
    try {
        console.log('Received request for items');
        const items = await db.players.getItems();
        console.log('Sending items:', items);
        res.json(items);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
