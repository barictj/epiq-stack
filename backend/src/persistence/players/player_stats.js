const pool = require('../pool');

async function addPlayerStats(item) {
    const league = item.league || 'nba';

    await pool.promise().query(
        `INSERT INTO player_stats_by_year (
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
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    games_played = VALUES(games_played),
    efficiency_possession_impact_quotient = VALUES(efficiency_possession_impact_quotient),
    total_points = VALUES(total_points),
    total_rebounds = VALUES(total_rebounds),
    total_assists = VALUES(total_assists),
    total_steals = VALUES(total_steals),
    total_blocks = VALUES(total_blocks),
    total_turnovers = VALUES(total_turnovers),
    total_fouls = VALUES(total_fouls),
    field_goals_made = VALUES(field_goals_made),
    field_goals_attempted = VALUES(field_goals_attempted),
    three_points_made = VALUES(three_points_made),
    three_points_attempted = VALUES(three_points_attempted),
    free_throws_made = VALUES(free_throws_made),
    free_throws_attempted = VALUES(free_throws_attempted),
    offensive_rebounds = VALUES(offensive_rebounds),
    defensive_rebounds = VALUES(defensive_rebounds),
    possessions = VALUES(possessions),
    points_against = VALUES(points_against),
    seasonal_epiq = VALUES(seasonal_epiq),
    epiq_per_game = VALUES(epiq_per_game),
    team = VALUES(team),
    position = VALUES(position),
    league = VALUES(league)
  `,
        [
            item.id,
            item.player_id,
            item.season_year,
            item.games_played,
            item.efficiency_possession_impact_quotient,
            item.total_points,
            item.total_rebounds,
            item.total_assists,
            item.total_steals,
            item.total_blocks,
            item.total_turnovers,
            item.total_fouls,
            item.field_goals_made,
            item.field_goals_attempted,
            item.three_points_made,
            item.three_points_attempted,
            item.free_throws_made,
            item.free_throws_attempted,
            item.offensive_rebounds,
            item.defensive_rebounds,
            item.possessions,
            item.points_against,
            item.seasonal_epiq,
            item.epiq_per_game,
            item.team,
            item.position,
            item.league || 'nba'
        ]
    );

}

async function updatePlayerStats(id, item) {
    const league = item.league || 'nba';

    await pool.promise().query(
        `UPDATE player_stats_by_year SET
      player_id = ?,
      season_year = ?,
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
      epiq_per_game = ?,
      team = ?,
      position = ?,
      league = ?
    WHERE id = ?`,
        [
            item.player_id,
            item.season_year,
            item.games_played,
            item.efficiency_possession_impact_quotient,
            item.total_points,
            item.total_rebounds,
            item.total_assists,
            item.total_steals,
            item.total_blocks,
            item.total_turnovers,
            item.total_fouls,
            item.field_goals_made,
            item.field_goals_attempted,
            item.three_points_made,
            item.three_points_attempted,
            item.free_throws_made,
            item.free_throws_attempted,
            item.offensive_rebounds,
            item.defensive_rebounds,
            item.possessions,
            item.points_against,
            item.seasonal_epiq,
            item.epiq_per_game,
            item.team,
            item.position,
            league,
            id
        ]
    );
}

module.exports = {
    addPlayerStats,
    updatePlayerStats
};
