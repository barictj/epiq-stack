const db = require('../persistence/');

module.exports = async (req, res) => {

    const items = await db.players.getItems();
    res.send(items);
};
