const { v4: uuid } = require('uuid');
const { storeTeam } = require('../index.js');

module.exports = async (req, res) => {
    const item = {
        id: uuid(),
        name: req.body.name,
        abbreviation: req.body.abbreviation || '',
        league: req.body.league || '',
        team_logo_url: req.body.team_logo_url || '',
        active: req.body.active !== undefined ? req.body.active : 1
    };

    try {
        await storeTeam(item);
        res.status(201).send(item);
    } catch (err) {
        console.error('Error storing team:', err);
        res.status(500).send({ error: 'Failed to store team' });
    }
};
