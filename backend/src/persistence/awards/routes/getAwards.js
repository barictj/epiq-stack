const db = require('../../index');
const { getAwards } = require('../backend/getAwards');
module.exports = async (req, res) => {
    try {
        const [rows] = await getAwards();
        res.status(200).send(rows);
    } catch (error) {
        console.error('Error fetching awards:', error);
        res.status(500).send({ error: 'Failed to fetch awards' });
    }
};
