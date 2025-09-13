const db = require('../persistence');
const { v4: uuid } = require('uuid');

module.exports = async (req, res) => {
    const item = {
        id: uuid(),
        name: req.body.name,
        team: req.body.team || '',
        position: req.body.position || '',
        player_image_url: req.body.player_image_url || '',
        active: req.body.active !== undefined ? req.body.active : 1,
        league: req.body.league || 'nba' // ✅ Default to NBA
    };

    try {
        await db.players.storeItem(item); // ✅ Pass league to backend
        res.status(201).send(item);
    } catch (error) {
        console.error('Error inserting player:', error);
        res.status(500).send({ error: 'Failed to insert player' });
    }
};
