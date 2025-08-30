const db = require('../persistence');

module.exports = async (req, res) => {
    await db.players.removeItem(req.params.id);
    res.sendStatus(200);
};
