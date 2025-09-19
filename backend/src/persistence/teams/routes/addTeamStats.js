const { v4: uuid } = require('uuid');
const { addTeamStats } = require('../index.js');

module.exports = async (req, res) => {
    const item = {
        id: uuid(),
        team_id: req.body.team_id,
        team_name: req.body.team_name,
        season_year: req.body.season_year,
        league: req.body.league || 'nba',
        wins: req.body.wins || 0,
        losses: req.body.losses || 0,
        games_played: req.body.games_played || 0,
        efficiency_possession_impact_quotient: req.body.efficiency_possession_impact_quotient || 0,
        total_points: req.body.total_points || 0,
        total_rebounds: req.body.total_rebounds || 0,
        total_assists: req.body.total_assists || 0,
        total_steals: req.body.total_steals || 0,
        total_blocks: req.body.total_blocks || 0,
        total_turnovers: req.body.total_turnovers || 0,
        total_fouls: req.body.total_fouls || 0,
        field_goals_made: req.body.field_goals_made || 0,
        field_goals_attempted: req.body.field_goals_attempted || 0,
        three_points_made: req.body.three_points_made || 0,
        three_points_attempted: req.body.three_points_attempted || 0,
        free_throws_made: req.body.free_throws_made || 0,
        free_throws_attempted: req.body.free_throws_attempted || 0,
        offensive_rebounds: req.body.offensive_rebounds || 0,
        defensive_rebounds: req.body.defensive_rebounds || 0,
        possessions: req.body.possessions || 0,
        points_against: req.body.points_against || 0,
        seasonal_epiq: req.body.seasonal_epiq || 0,
        epiq_per_game: req.body.epiq_per_game || 0
    };

    try {
        await addTeamStats(item); // ✅ Insert or update team stats
        res.status(201).send(item);
    } catch (error) {
        console.error('Error inserting team stats:', error);
        res.status(500).send({ error: 'Failed to insert team stats' });
    }
};
