const db = require('../persistence');

// 🔒 Hardened sanitizer
const sanitize = (val) => {
    if (val === null || val === undefined) return 0;
    const v = String(val).trim().toLowerCase();
    if (
        v === "" ||
        v.includes("nan") ||
        v.includes("inf") ||
        v.includes("undefined") ||
        v === "∞"
    ) return 0;
    const parsed = parseFloat(v);
    return isFinite(parsed) ? parsed : 0;
};

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
        possessions,
        points_against,
        seasonal_epiq,
        epiq_per_game,
        team,
        position,
        league
    } = req.body;

    const item = {
        player_id,
        season_year: sanitize(season_year),
        games_played: sanitize(games_played),
        efficiency_possession_impact_quotient: sanitize(efficiency_possession_impact_quotient),
        total_points: sanitize(total_points),
        total_rebounds: sanitize(total_rebounds),
        total_assists: sanitize(total_assists),
        total_steals: sanitize(total_steals),
        total_blocks: sanitize(total_blocks),
        total_turnovers: sanitize(total_turnovers),
        total_fouls: sanitize(total_fouls),
        field_goals_made: sanitize(field_goals_made),
        field_goals_attempted: sanitize(field_goals_attempted),
        three_points_made: sanitize(three_points_made),
        three_points_attempted: sanitize(three_points_attempted),
        free_throws_made: sanitize(free_throws_made),
        free_throws_attempted: sanitize(free_throws_attempted),
        offensive_rebounds: sanitize(offensive_rebounds),
        defensive_rebounds: sanitize(defensive_rebounds),
        possessions: sanitize(possessions),
        points_against: sanitize(points_against),
        seasonal_epiq: sanitize(seasonal_epiq),
        epiq_per_game: sanitize(epiq_per_game),
        team,
        position,
        league: league || 'nba'
    };

    try {
        await db.player_stats.updatePlayerStats(id, item);
        res.status(200).send({ message: 'Player stats updated', item: { id, ...item } });
    } catch (error) {
        console.error('Error updating player stats:', error);
        res.status(500).send({ error: 'Failed to update player stats' });
    }
};
