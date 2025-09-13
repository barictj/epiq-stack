const db = require('../persistence/players/average_stats_by_year.js');

module.exports = async (req, res) => {
    const season_year = parseInt(req.params.season_year);
    const league = req.body.league || 'nba'; // ✅ Default to NBA

    const item = {
        season_year,
        games_played: req.body.games_played,
        efficiency_possession_impact_quotient: req.body.epiq,
        total_points: req.body.total_points,
        total_rebounds: req.body.total_rebounds,
        total_assists: req.body.total_assists,
        total_steals: req.body.total_steals,
        total_blocks: req.body.total_blocks,
        total_turnovers: req.body.total_turnovers,
        total_fouls: req.body.total_fouls,
        field_goals_made: req.body.field_goals_made,
        field_goals_attempted: req.body.field_goals_attempted,
        three_points_made: req.body.three_points_made,
        three_points_attempted: req.body.three_points_attempted,
        free_throws_made: req.body.free_throws_made,
        free_throws_attempted: req.body.free_throws_attempted,
        offensive_rebounds: req.body.offensive_rebounds,
        defensive_rebounds: req.body.defensive_rebounds,
        possessions: req.body.possessions,
        points_against: req.body.points_against,
        seasonal_epiq: req.body.seasonal_epiq,
        epiq_per_game: req.body.epiq_per_game,
        league // ✅ Injected into update payload
    };

    try {
        await db.updateAverageStatsBySeason(item);
        res.status(200).send({ message: 'Season average updated', item });
    } catch (error) {
        console.error('Error updating season average:', error);
        res.status(500).send({ error: 'Failed to update season average' });
    }
};
