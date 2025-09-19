const { getTopTeamsByYear } = require('../index.js');

module.exports = async (req, res) => {
    try {
        const { year, startAt, endBy, sortBy, direction, league } = req.query;
        const teams = await getTopTeamsByYear({ year, startAt, endBy, sortBy, direction, league });
        res.status(200).send(teams);
    } catch (err) {
        console.error('Error fetching top teams:', err);
        res.status(500).send({ error: 'Failed to fetch top teams' });
    }
};
