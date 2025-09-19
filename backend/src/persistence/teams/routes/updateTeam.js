const { updateTeam } = require('../index.js');

module.exports = async (req, res) => {
    const item = {
        id: req.params.id,
        name: req.body.name,
        abbreviation: req.body.abbreviation || '',
        league: req.body.league || '',
        team_logo_url: req.body.team_logo_url || '',
        active: req.body.active !== undefined ? req.body.active : 1
    };

    try {
        await updateTeam(item);
        res.status(200).send({ message: 'Team updated', id: item.id });
    } catch (err) {
        console.error('Error updating team:', err);
        res.status(500).send({ error: 'Failed to update team' });
    }
};
