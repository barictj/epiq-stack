const { getBySeason } = require('../index.js');

module.exports = async (req, res) => {
    try {
        const season = await getBySeason(req.params.year);
        if (!season) return res.status(404).send({ error: 'No data for that season' });
        res.status(200).send(season);
    } catch (err) {
        console.error('Error fetching season data:', err);
        res.status(500).send({ error: 'Failed to fetch season data' });
    }
};
