const db = require('../persistence/players/average_stats_by_year');

module.exports = async (req, res) => {
    const season_year = parseInt(req.params.season_year);

    try {
        const result = await db.getAverageStatsBySeason(season_year);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error fetching season average:', error);
        res.status(500).send({ error: 'Failed to fetch season average' });
    }
};
