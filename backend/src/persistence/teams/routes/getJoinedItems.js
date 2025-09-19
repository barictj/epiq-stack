const { getJoinedItems } = require('../index.js');

module.exports = async (req, res) => {
    try {
        const team = await getJoinedItems(req.params.id);
        if (!team) return res.status(404).send({ error: 'Team not found' });
        res.status(200).send(team);
    } catch (err) {
        console.error('Error fetching joined items:', err);
        res.status(500).send({ error: 'Failed to fetch joined items' });
    }
};
