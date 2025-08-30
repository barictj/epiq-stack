const db = require('../persistence/');

module.exports = async (req, res) => {
    console.log('Received request for item');
    console.log(db)
    const items = await db.players.getItems();
    console.log('Sending items:', items);
    res.send(items);
};
