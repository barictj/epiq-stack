const waitPort = require('wait-port');
const config = require('./config');
const pool = require('./pool');

async function init() {
  console.log('Connecting to MySQL at', config.host);
  console.log('Using MySQL user:', config.user);
  console.log('Using MySQL database:', config.database);

  await waitPort({
    host: config.host,
    port: 3306,
    timeout: 10000,
    waitForDns: true,
  });
  await pool.promise().query('SET FOREIGN_KEY_CHECKS = 0');

  await pool.promise().query('DROP TABLE IF EXISTS per_minute_stats_all_time');
  await pool.promise().query('DROP TABLE IF EXISTS per_minute_stats_current_year');
  await pool.promise().query('DROP TABLE IF EXISTS game');
  await pool.promise().query('DROP TABLE IF EXISTS player_stats');
  await pool.promise().query('DROP TABLE IF EXISTS players');

  await pool.promise().query('SET FOREIGN_KEY_CHECKS = 1');

  await pool.promise().query(`
CREATE TABLE IF NOT EXISTS players (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  active BOOLEAN DEFAULT 1,
  games_played INT DEFAULT 0,
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
  await pool.promise().query(
    `INSERT INTO players (
    id, name, active, games_played,
    all_time_points_per_game, all_time_rebounds_per_game, all_time_assists_per_game,
    all_time_steals_per_game, all_time_blocks_per_game, all_time_turnovers_per_game, all_time_fouls_per_game
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'player-001',
      'Thomas Testerson',
      true,
      82,
      1840,
      520,
      410,
      95,
      60,
      120,
      140
    ]
  );



  console.log('✅ Tables initialized');
}

module.exports = init;
