const waitPort = require('wait-port');
const config = require('./config');
const pool = require('./pool');

async function init() {
  console.log('Connecting to MySQL at', config.host);
  console.log('Using MySQL user:', config.user);
  console.log('Using MySQL database:', config.database);
  console.log(process.env)
  await waitPort({
    host: config.host,
    port: 3306,
    timeout: 30000,
    waitForDns: true,
  });
  if (process.env.NODE_ENV === 'development') {
    console.log('🧨 Dropping tables (development mode)');
    await pool.promise().query('SET FOREIGN_KEY_CHECKS = 0');
    await pool.promise().query('DROP TABLE IF EXISTS per_minute_stats_all_time');
    await pool.promise().query('DROP TABLE IF EXISTS per_minute_stats_current_year');
    await pool.promise().query('DROP TABLE IF EXISTS game');
    await pool.promise().query('DROP TABLE IF EXISTS player_stats');
    await pool.promise().query('DROP TABLE IF EXISTS players');
    await pool.promise().query('DROP TABLE IF EXISTS player_stats_current_year');
    await pool.promise().query('DROP TABLE IF EXISTS defensive_context');
    await pool.promise().query('DROP TABLE IF EXISTS team_context');
    await pool.promise().query('SET FOREIGN_KEY_CHECKS = 1');
  }

  await pool.promise().query(`
CREATE TABLE IF NOT EXISTS players (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  all_time_epiq int DEFAULT 0,
  active BOOLEAN DEFAULT 1,
  games_played INT DEFAULT 0,
  player_image_url VARCHAR(255) DEFAULT NULL,
  team VARCHAR(100) DEFAULT NULL,
  position VARCHAR(50) DEFAULT NULL,
  height VARCHAR(10) DEFAULT NULL,
  weight VARCHAR(10) DEFAULT NULL,
  college VARCHAR(100) DEFAULT NULL,
  birth_date DATE DEFAULT NULL,
  all_time_efficiency_possession_impact_quotient int DEFAULT 0,
  all_time_points_per_game INT DEFAULT 0,
  all_time_rebounds_per_game INT DEFAULT 0,
  all_time_assists_per_game INT DEFAULT 0,
  all_time_steals_per_game INT DEFAULT 0,
  all_time_blocks_per_game INT DEFAULT 0,
  all_time_turnovers_per_game INT DEFAULT 0,
  all_time_fouls_per_game INT DEFAULT 0,
  all_time_field_goal_percentage FLOAT DEFAULT 0,
  all_time_three_point_percentage FLOAT DEFAULT 0,
  all_time_free_throw_percentage FLOAT DEFAULT 0,
  all_time_offensive_rebounds_per_game INT DEFAULT 0,
  all_time_defensive_rebounds_per_game INT DEFAULT 0,
  all_time_minutes_per_game INT DEFAULT 0,
  all_time_field_goals_made_per_game INT DEFAULT 0,
  all_time_field_goals_attempted_per_game INT DEFAULT 0,
  all_time_three_points_made_per_game INT DEFAULT 0,
  all_time_three_points_attempted_per_game INT DEFAULT 0,
  all_time_free_throws_made_per_game INT DEFAULT 0,
  all_time_free_throws_attempted_per_game INT DEFAULT 0,
  all_time_points_against_per_game INT DEFAULT 0 
) DEFAULT CHARSET=utf8mb4;
  `);
  await pool.promise().query(`
CREATE TABLE IF NOT EXISTS player_stats_current_year (
  id VARCHAR(36) PRIMARY KEY,
  player_id VARCHAR(36),
  efficiency_possession_impact_quotient int DEFAULT 0,
  season_year INT NOT NULL,
  points_per_game INT DEFAULT 10,
  rebounds_per_game INT DEFAULT 5,
  assists_per_game INT DEFAULT 7,
  steals_per_game INT DEFAULT 2,
  blocks_per_game INT DEFAULT 1,
  turnovers_per_game INT DEFAULT 3,
  fouls_per_game INT DEFAULT 4,
  field_goal_percentage FLOAT DEFAULT 45.0,
  three_point_percentage FLOAT DEFAULT 35.0,
  free_throw_percentage FLOAT DEFAULT 75.0,
  offensive_rebounds_per_game INT DEFAULT 2,
  defensive_rebounds_per_game INT DEFAULT 3,
  minutes_per_game INT DEFAULT 30,
  field_goals_made_per_game INT DEFAULT 5,
  field_goals_attempted_per_game INT DEFAULT 12,
  three_points_made_per_game INT DEFAULT 2,
  three_points_attempted_per_game INT DEFAULT 6,
  free_throws_made_per_game INT DEFAULT 3,
  free_throws_attempted_per_game INT DEFAULT 4,
  points_against_per_game INT DEFAULT 0,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4;
  `);
  await pool.promise().query(`CREATE TABLE IF NOT EXISTS game (
  id VARCHAR(36) PRIMARY KEY,
  player_id VARCHAR(36),
  efficiency_possession_impact_quotient int DEFAULT 0,
  date DATE NOT NULL,
  points INT DEFAULT 0,
  rebounds INT DEFAULT 0,
  assists INT DEFAULT 0,
  steals INT DEFAULT 0,
  blocks INT DEFAULT 0,
  turnovers INT DEFAULT 0,
  fouls INT DEFAULT 0,
  field_goals_made INT DEFAULT 0,
  field_goals_attempted INT DEFAULT 0,
  three_points_made INT DEFAULT 0,
  three_points_attempted INT DEFAULT 0,
  free_throws_made INT DEFAULT 0,
  free_throws_attempted INT DEFAULT 0,
  minutes_played INT DEFAULT 0,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4;
  `);
  await pool.promise().query(`CREATE TABLE IF NOT EXISTS per_minute_stats_current_year (
    id VARCHAR(36) PRIMARY KEY,
    player_id VARCHAR(36),
    points_per_minute INT DEFAULT 0,
    rebounds_per_minute INT DEFAULT 0,
    assists_per_minute INT DEFAULT 0,
    steals_per_minute INT DEFAULT 0,
    blocks_per_minute INT DEFAULT 0,
    turnovers_per_minute INT DEFAULT 0,
    fouls_per_minute INT DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4;
     `);
  const [playerStatsIndexes] = await pool.promise().query(`
  SELECT COUNT(*) AS count
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'player_stats_current_year'
    AND index_name = 'idx_player_season';
`);

  if (playerStatsIndexes[0].count === 0) {
    await pool.promise().query(`
    CREATE INDEX idx_player_season ON player_stats_current_year(player_id, season_year);
  `);
  }
  await pool.promise().query(`CREATE TABLE IF NOT EXISTS defensive_context (
  player_id VARCHAR(36),
  season_year INT,
  opp_ppp_on FLOAT DEFAULT 0,
  opp_ppp_off FLOAT DEFAULT 0,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);
`)
  await pool.promise().query(`CREATE TABLE IF NOT EXISTS team_context (
  team VARCHAR(100),
  season_year INT,
  second_chance_points_per_game INT DEFAULT 0,
  points_off_turnovers_per_game INT DEFAULT 0
);
`)
  await pool.promise().query(`CREATE TABLE IF NOT EXISTS per_minute_stats_all_time (
  id VARCHAR(36) PRIMARY KEY,
  player_id VARCHAR(36),
  all_time_points_per_minute INT DEFAULT 0,
  all_time_rebounds_per_minute INT DEFAULT 0,
  all_time_assists_per_minute INT DEFAULT 0,
  all_time_steals_per_minute INT DEFAULT 0,
  all_time_blocks_per_minute INT DEFAULT 0,
  all_time_turnovers_per_minute INT DEFAULT 0,
  all_time_fouls_per_minute INT DEFAULT 0,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4;
     `);


  const [indexes] = await pool.promise().query(`
  SELECT COUNT(*) AS count
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'player_stats'
    AND index_name = 'idx_player_season';
`);
  if (process.env.NODE_ENV === 'development') {
    await pool.promise().query(
      `INSERT INTO players (
    id, name, active, games_played,
    all_time_points_per_game, all_time_rebounds_per_game, all_time_assists_per_game,
    all_time_steals_per_game, all_time_blocks_per_game, all_time_turnovers_per_game, all_time_fouls_per_game,
    player_image_url, all_time_epiq
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'player-001',
        'Thomas Testerson',
        true,
        82,
        29.6,
        12.7,
        10.2,
        95,
        60,
        120,
        140,
        "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3112335.png&w=350&h=254",
        214.7
      ]
    );

    await pool.promise().query(
      `INSERT INTO player_stats_current_year (
    id, player_id, season_year,
    efficiency_possession_impact_quotient,
    points_per_game, rebounds_per_game, assists_per_game,
    steals_per_game, blocks_per_game, turnovers_per_game, fouls_per_game,
    field_goal_percentage, three_point_percentage, free_throw_percentage,
    offensive_rebounds_per_game, defensive_rebounds_per_game, minutes_per_game,
    field_goals_made_per_game, field_goals_attempted_per_game,
    three_points_made_per_game, three_points_attempted_per_game,
    free_throws_made_per_game, free_throws_attempted_per_game,
    points_against_per_game
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'stat-001',
        'player-001',
        2025,
        214,
        29, 12, 10,
        2, 1, 3, 4,
        45.0, 35.0, 75.0,
        2, 3, 30,
        5, 12,
        2, 6,
        3, 4,
        108
      ]
    );
    await pool.promise().query(
      `INSERT INTO game (
    id, player_id, date,
    efficiency_possession_impact_quotient,
    points, rebounds, assists, steals, blocks,
    turnovers, fouls, field_goals_made, field_goals_attempted,
    three_points_made, three_points_attempted,
    free_throws_made, free_throws_attempted, minutes_played
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'game-001',
        'player-001',
        '2025-10-28',
        12,
        30, 10, 8, 2, 1,
        3, 4, 11, 22,
        3, 8,
        5, 6, 34
      ]
    );
    await pool.promise().query(
      `INSERT INTO per_minute_stats_current_year (
    id, player_id,
    points_per_minute, rebounds_per_minute, assists_per_minute,
    steals_per_minute, blocks_per_minute, turnovers_per_minute, fouls_per_minute
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'pm-001',
        'player-001',
        0.98, 0.42, 0.33,
        0.07, 0.03, 0.10, 0.13
      ]
    );
    await pool.promise().query(
      `INSERT INTO per_minute_stats_all_time (
    id, player_id,
    all_time_points_per_minute, all_time_rebounds_per_minute, all_time_assists_per_minute,
    all_time_steals_per_minute, all_time_blocks_per_minute, all_time_turnovers_per_minute,
    all_time_fouls_per_minute
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'pma-001',
        'player-001',
        0.96, 0.41, 0.31,
        0.06, 0.02, 0.09,
        0.12
      ]
    );
    await pool.promise().query(
      `INSERT INTO defensive_context (
    player_id, season_year,
    opp_ppp_on, opp_ppp_off
  ) VALUES (?, ?, ?, ?)`,
      [
        'player-001',
        2025,
        1.18,
        0.88
      ]
    );
    await pool.promise().query(
      `INSERT INTO team_context (
    team, season_year,
    second_chance_points_per_game, points_off_turnovers_per_game
  ) VALUES (?, ?, ?, ?)`,
      [
        'DAL',
        2025,
        13,
        17
      ]
    );
  }



  console.log('✅ Tables initialized');
}

module.exports = init;
