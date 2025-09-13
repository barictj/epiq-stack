const pool = require('../pool');

function normalize(row) {
    return { ...row };
}

async function addAverageStatsBySeason(year) {
    const league = year.league || 'nba';

    await pool.promise().query(
        `INSERT INTO average_for_all_players (
      id,
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
      league
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            year.id,
            year.season_year,
            year.games_played,
            year.efficiency_possession_impact_quotient,
            year.total_points,
            year.total_rebounds,
            year.total_assists,
            year.total_steals,
            year.total_blocks,
            year.total_turnovers,
            year.total_fouls,
            year.field_goals_made,
            year.field_goals_attempted,
            year.three_points_made,
            year.three_points_attempted,
            year.free_throws_made,
            year.free_throws_attempted,
            year.offensive_rebounds,
            year.defensive_rebounds,
            year.possessions,
            year.points_against,
            year.seasonal_epiq,
            year.epiq_per_game,
            league
        ]
    );
}

async function updateAverageStatsBySeason(year) {
    const league = year.league || 'nba';

    await pool.promise().query(
        `UPDATE average_for_all_players SET
      games_played = ?,
      efficiency_possession_impact_quotient = ?,
      total_points = ?,
      total_rebounds = ?,
      total_assists = ?,
      total_steals = ?,
      total_blocks = ?,
      total_turnovers = ?,
      total_fouls = ?,
      field_goals_made = ?,
      field_goals_attempted = ?,
      three_points_made = ?,
      three_points_attempted = ?,
      free_throws_made = ?,
      free_throws_attempted = ?,
      offensive_rebounds = ?,
      defensive_rebounds = ?,
      possessions = ?,
      points_against = ?,
      seasonal_epiq = ?,
      epiq_per_game = ?
    WHERE season_year = ? AND league = ?`,
        [
            year.games_played,
            year.efficiency_possession_impact_quotient,
            year.total_points,
            year.total_rebounds,
            year.total_assists,
            year.total_steals,
            year.total_blocks,
            year.total_turnovers,
            year.total_fouls,
            year.field_goals_made,
            year.field_goals_attempted,
            year.three_points_made,
            year.three_points_attempted,
            year.free_throws_made,
            year.free_throws_attempted,
            year.offensive_rebounds,
            year.defensive_rebounds,
            year.possessions,
            year.points_against,
            year.seasonal_epiq,
            year.epiq_per_game,
            year.season_year,
            league
        ]
    );
}

async function getAverageStatsBySeason(year, league = 'nba') {
    const [stats] = await pool.promise().query(
        'SELECT * FROM average_for_all_players WHERE season_year = ? AND league = ? ORDER BY season_year DESC',
        [year, league]
    );

    return {
        averageYearStats: stats.map(normalize)
    };
}

async function getAllAverageStatsBySeason() {
    const [stats] = await pool.promise().query(
        'SELECT * FROM average_for_all_players ORDER BY season_year DESC'
    );
    return stats.map(normalize);
}

module.exports = {
    updateAverageStatsBySeason,
    addAverageStatsBySeason,
    getAverageStatsBySeason,
    getAllAverageStatsBySeason
};
