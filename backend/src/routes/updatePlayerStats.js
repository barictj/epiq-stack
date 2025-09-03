const db = require('../persistence');

module.exports = async (req, res) => {
    const {
        id,
        player_id,
        season_year,
        games_played,
        efficiency_possession_impact_quotient,
        total_points,
        total_rebounds,
        total_assists,
        total_steals,
        total_blocks,
        total_turnovers,
        total_fouls,
        field_goals_made,
        field_goals_attempted,
        three_points_made,
        three_points_attempted,
        free_throws_made,
        free_throws_attempted,
        offensive_rebounds,
        defensive_rebounds,
        points_against
    } = req.body;

    const item = {
        id,
        player_id,
        season_year,
        games_played,
        efficiency_possession_impact_quotient,
        total_points,
        total_rebounds,
        total_assists,
        total_steals,
        total_blocks,
        total_turnovers,
        total_fouls,
        field_goals_made,
        field_goals_attempted,
        three_points_made,
        three_points_attempted,
        free_throws_made,
        free_throws_attempted,
        offensive_rebounds,
        defensive_rebounds,
        points_against
    };

    try {
        await db.player_stats.updatePlayerStats(item); // Assumes you have an updateItem method
        res.status(200).send({ message: 'Player stats updated', item });
    } catch (error) {
        console.error('Error updating player stats:', error);
        res.status(500).send({ error: 'Failed to update player stats' });
    }
};
