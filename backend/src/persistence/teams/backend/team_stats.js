const pool = require('../../pool');

async function addTeamStats(item) {
    console.log(item)
    await pool.promise().query(
        `INSERT INTO team_stats_by_year (
            id,
            team_id,
            team_name,
            season_year,
            league,
            wins,
            losses,
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
            epiq_per_game           
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            team_id = VALUES(team_id),
            team_name = VALUES(team_name),
            season_year = VALUES(season_year),
            league = VALUES(league),
            wins = VALUES(wins),
            losses = VALUES(losses),
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
            epiq_per_game = VALUES(epiq_per_game)
        `,
        [
            item.id,
            item.team_id,
            item.team_name,
            item.season_year,
            item.league,
            item.wins || 0,
            item.losses || 0,
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
            item.epiq_per_game
        ]

    );
}
async function updateTeamStats(id, item) {
    console.log(item)

    await pool.promise().query(
        `UPDATE team_stats_by_year SET
            team_id = ?,
            team_name = ?,
            season_year = ?,
            league = ?,
            wins = ?,
            losses = ?,
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
        WHERE id = ?`,
        [
            item.team_id,
            item.team_name,
            item.season_year,
            item.league,
            item.wins || 0,
            item.losses || 0,
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


            id // ← used in WHERE clause
        ]
    );
}


module.exports = {

    addTeamStats,
    updateTeamStats
};
