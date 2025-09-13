const db = require('../persistence');

module.exports = async (req, res) => {
    const {
        id,
        name,
        team = '',
        position = '',
        player_image_url = '',
        active = 1,
        total_points_all_time = 0,
        seasons_played = 0,
        career_epiq = 0,
        league = 'nba' // ✅ lowercase default for consistency
    } = req.body;

    if (!id || !name) {
        return res.status(400).send({ error: 'Missing required fields: id and name' });
    }

    try {
        await db.players.updatePlayer(id, {
            name,
            team,
            position,
            player_image_url,
            active,
            total_points_all_time,
            seasons_played,
            career_epiq,
            league
        });

        res.status(200).send({ message: 'Player updated successfully' });
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).send({ error: 'Failed to update player' });
    }
};
