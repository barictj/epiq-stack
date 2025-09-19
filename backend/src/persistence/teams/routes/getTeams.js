const { getTeams } = require('../index.js');
module.exports = async (req, res) => {
    try {
        const teams = await getTeams();
        res.status(200).send(teams);
    } catch (err) {
        console.error('Error fetching teams:', err);
        res.status(500).send({ error: 'Failed to fetch teams' });
    }
};
