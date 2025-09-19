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
    await pool.promise().query('DROP TABLE IF EXISTS players');
    await pool.promise().query('DROP TABLE IF EXISTS player_stats_by_year');
    await pool.promise().query('DROP TABLE IF EXISTS player_stats_all_time');
    await pool.promise().query('DROP TABLE IF EXISTS player_game_stats');
    await pool.promise().query('DROP TABLE IF EXISTS average_for_centers_by_year');
    await pool.promise().query('DROP TABLE IF EXISTS average_for_forwards_by_year');
    await pool.promise().query('DROP TABLE IF EXISTS average_for_point_guards_by_year');
    await pool.promise().query('DROP TABLE IF EXISTS average_for_shooting_guards_by_year');
    await pool.promise().query('DROP TABLE IF EXISTS average_for_all_players');
    await pool.promise().query('DROP TABLE IF EXISTS awards');
    await pool.promise().query('DROP TABLE IF EXISTS teams');
    await pool.promise().query('DROP TABLE IF EXISTS team_stats_by_year');
    await pool.promise().query('DROP TABLE IF EXISTS game_log');
    await pool.promise().query('DROP TABLE IF EXISTS game_log_player_entries');
    await pool.promise().query('DROP TABLE IF EXISTS game_log_player_entries_clutch');
    await pool.promise().query('SET FOREIGN_KEY_CHECKS = 1');
  }


  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS players (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  team VARCHAR(100),
  position VARCHAR(50),
  player_image_url VARCHAR(255),
  active BOOLEAN DEFAULT 1,
  total_points_all_time INT DEFAULT 0,
  seasons_played INT DEFAULT 0,
  career_epiq FLOAT DEFAULT 0,
  league VARCHAR(10) DEFAULT 'NBA'
) DEFAULT CHARSET=utf8mb4;
`);

  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS player_stats_by_year (
    id VARCHAR(64) PRIMARY KEY,
    player_id VARCHAR(64),
    season_year INT NOT NULL,
    games_played INT DEFAULT 0,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,
    total_points INT DEFAULT 0,
    total_rebounds INT DEFAULT 0,
    total_assists INT DEFAULT 0,
    total_steals INT DEFAULT 0,
    total_blocks INT DEFAULT 0,
    total_turnovers INT DEFAULT 0,
    total_fouls INT DEFAULT 0,
    field_goals_made INT DEFAULT 0,
    field_goals_attempted INT DEFAULT 0,
    three_points_made INT DEFAULT 0,
    three_points_attempted INT DEFAULT 0,
    free_throws_made INT DEFAULT 0,
    free_throws_attempted INT DEFAULT 0,
    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions FLOAT DEFAULT 0,
    seasonal_epiq FLOAT DEFAULT 0,
    epiq_per_game FLOAT DEFAULT 0,
    team VARCHAR (100) DEFAULT '',
    position VARCHAR(50) DEFAULT '',
    league VARCHAR(10) DEFAULT 'NBA',
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    UNIQUE KEY unique_player_season (player_id, season_year)
);
`);


  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS player_stats_all_time (
    player_id VARCHAR(50) PRIMARY KEY,
    all_time_efficiency_possession_impact_quotient FLOAT DEFAULT 0,
    total_points INT DEFAULT 0,
    total_rebounds INT DEFAULT 0,
    total_assists INT DEFAULT 0,
    total_steals INT DEFAULT 0,
    total_blocks INT DEFAULT 0,
    total_turnovers INT DEFAULT 0,
    total_fouls INT DEFAULT 0,
    field_goals_made INT DEFAULT 0,
    field_goals_attempted INT DEFAULT 0,
    three_points_made INT DEFAULT 0,
    three_points_attempted INT DEFAULT 0,
    free_throws_made INT DEFAULT 0,
    free_throws_attempted INT DEFAULT 0,
    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions INT DEFAULT 0,
    team VARCHAR(100) DEFAULT '',
      position VARCHAR(50) DEFAULT '',
      league VARCHAR(10) DEFAULT 'NBA',

    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
  ) DEFAULT CHARSET=utf8mb4;
`);


  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS player_game_stats (
    id VARCHAR(64) PRIMARY KEY,
    player_id VARCHAR(64),
    game_date DATE NOT NULL,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,
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
    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    possession INT DEFAULT 0,
    points_against INT DEFAULT 0,
    team VARCHAR(100) DEFAULT '',
        position VARCHAR(50) DEFAULT '',
        league VARCHAR(10) DEFAULT 'NBA',
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
  ) DEFAULT CHARSET=utf8mb4;
`);
  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS average_for_centers_by_year (
    id VARCHAR(64) PRIMARY KEY,
    player_id VARCHAR(64),
    season_year INT NOT NULL,
    games_played INT DEFAULT 0,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,
    total_points INT DEFAULT 0,
    total_rebounds INT DEFAULT 0,
    total_assists INT DEFAULT 0,
    total_steals INT DEFAULT 0,
    total_blocks INT DEFAULT 0,
    total_turnovers INT DEFAULT 0,
    total_fouls INT DEFAULT 0,
    field_goals_made INT DEFAULT 0,
    field_goals_attempted INT DEFAULT 0,
    three_points_made INT DEFAULT 0,
    three_points_attempted INT DEFAULT 0,
    free_throws_made INT DEFAULT 0,
    free_throws_attempted INT DEFAULT 0,
    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions FLOAT DEFAULT 0,
    seasonal_epiq FLOAT DEFAULT 0,
    epiq_per_game FLOAT DEFAULT 0,
    team VARCHAR (100) DEFAULT '',
    position VARCHAR(50) DEFAULT '',
      league VARCHAR(10) DEFAULT 'NBA',
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    UNIQUE KEY unique_player_season (player_id, season_year)
);
`);
  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS average_for_forwards_by_year (
    id VARCHAR(64) PRIMARY KEY,
    player_id VARCHAR(64),
    season_year INT NOT NULL,
    games_played INT DEFAULT 0,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,
    total_points INT DEFAULT 0,
    total_rebounds INT DEFAULT 0,
    total_assists INT DEFAULT 0,
    total_steals INT DEFAULT 0,
    total_blocks INT DEFAULT 0,
    total_turnovers INT DEFAULT 0,
    total_fouls INT DEFAULT 0,
    field_goals_made INT DEFAULT 0,
    field_goals_attempted INT DEFAULT 0,
    three_points_made INT DEFAULT 0,
    three_points_attempted INT DEFAULT 0,
    free_throws_made INT DEFAULT 0,
    free_throws_attempted INT DEFAULT 0,
    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions FLOAT DEFAULT 0,
    seasonal_epiq FLOAT DEFAULT 0,
    epiq_per_game FLOAT DEFAULT 0,
    team VARCHAR (100) DEFAULT '',
    position VARCHAR(50) DEFAULT '',
      league VARCHAR(10) DEFAULT 'NBA',
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    UNIQUE KEY unique_player_season (player_id, season_year)
);
`);
  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS average_for_shooting_guards_by_year (
    id VARCHAR(64) PRIMARY KEY,
    player_id VARCHAR(64),
    season_year INT NOT NULL,
    games_played INT DEFAULT 0,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,
    total_points INT DEFAULT 0,
    total_rebounds INT DEFAULT 0,
    total_assists INT DEFAULT 0,
    total_steals INT DEFAULT 0,
    total_blocks INT DEFAULT 0,
    total_turnovers INT DEFAULT 0,
    total_fouls INT DEFAULT 0,
    field_goals_made INT DEFAULT 0,
    field_goals_attempted INT DEFAULT 0,
    three_points_made INT DEFAULT 0,
    three_points_attempted INT DEFAULT 0,
    free_throws_made INT DEFAULT 0,
    free_throws_attempted INT DEFAULT 0,
    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions FLOAT DEFAULT 0,
    seasonal_epiq FLOAT DEFAULT 0,
    epiq_per_game FLOAT DEFAULT 0,
    team VARCHAR (100) DEFAULT '',
    position VARCHAR(50) DEFAULT '',
      league VARCHAR(10) DEFAULT 'NBA',
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    UNIQUE KEY unique_player_season (player_id, season_year)
);
`);
  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS average_for_point_guards_by_year (
    id VARCHAR(64) PRIMARY KEY,
    player_id VARCHAR(64),
    season_year INT NOT NULL,
    games_played INT DEFAULT 0,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,
    total_points INT DEFAULT 0,
    total_rebounds INT DEFAULT 0,
    total_assists INT DEFAULT 0,
    total_steals INT DEFAULT 0,
    total_blocks INT DEFAULT 0,
    total_turnovers INT DEFAULT 0,
    total_fouls INT DEFAULT 0,
    field_goals_made INT DEFAULT 0,
    field_goals_attempted INT DEFAULT 0,
    three_points_made INT DEFAULT 0,
    three_points_attempted INT DEFAULT 0,
    free_throws_made INT DEFAULT 0,
    free_throws_attempted INT DEFAULT 0,
    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions FLOAT DEFAULT 0,
    seasonal_epiq FLOAT DEFAULT 0,
    epiq_per_game FLOAT DEFAULT 0,
    team VARCHAR (100) DEFAULT '',
    position VARCHAR(50) DEFAULT '',
      league VARCHAR(10) DEFAULT 'NBA',
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    UNIQUE KEY unique_player_season (player_id, season_year)
);
`);
  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS average_for_all_players (
    id VARCHAR(64) PRIMARY KEY,
    player_id VARCHAR(64),
    season_year INT NOT NULL,
    games_played INT DEFAULT 0,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,
    total_points INT DEFAULT 0,
    total_rebounds INT DEFAULT 0,
    total_assists INT DEFAULT 0,
    total_steals INT DEFAULT 0,
    total_blocks INT DEFAULT 0,
    total_turnovers INT DEFAULT 0,
    total_fouls INT DEFAULT 0,
    field_goals_made INT DEFAULT 0,
    field_goals_attempted INT DEFAULT 0,
    three_points_made INT DEFAULT 0,
    three_points_attempted INT DEFAULT 0,
    free_throws_made INT DEFAULT 0,
    free_throws_attempted INT DEFAULT 0,
    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions FLOAT DEFAULT 0,
    seasonal_epiq FLOAT DEFAULT 0,
    epiq_per_game FLOAT DEFAULT 0,
    team VARCHAR (100) DEFAULT '',
    league VARCHAR(10) DEFAULT 'NBA',
    UNIQUE KEY unique_season_year (season_year)
);
`);
  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS awards (
    id VARCHAR(64) PRIMARY KEY,
    season_year INT NOT NULL,
    award_type VARCHAR(20) NOT NULL,
    metric VARCHAR(30) NOT NULL,
    league VARCHAR(30) DEFAULT 'nba',
    position VARCHAR(30) DEFAULT 'NA',
    player_id VARCHAR(64) NOT NULL,
    \`rank\` INT NOT NULL,
    epiq_value FLOAT DEFAULT 0,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_award (season_year, award_type, position, player_id),
    UNIQUE KEY unique_award_metric_rank (season_year, metric, position, \`rank\`, player_id)
  );
`);
  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    abbreviation VARCHAR(10) NOT NULL,
    league VARCHAR(10) DEFAULT 'NBA',
    team_logo_url VARCHAR(255),
    active BOOLEAN DEFAULT 1
  ) DEFAULT CHARSET=utf8mb4;
`);
  await pool.promise().query(`
  CREATE TABLE IF NOT EXISTS team_stats_by_year (
    id VARCHAR(64) PRIMARY KEY,
    team_id VARCHAR(64),
    team_name VARCHAR(100) DEFAULT '',
    season_year INT NOT NULL,
    games_played INT DEFAULT 0,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    total_points INT DEFAULT 0,
    total_rebounds INT DEFAULT 0,
    total_assists INT DEFAULT 0,
    total_steals INT DEFAULT 0,
    total_blocks INT DEFAULT 0,
    total_turnovers INT DEFAULT 0,
    total_fouls INT DEFAULT 0,
    field_goals_made INT DEFAULT 0,
    field_goals_attempted INT DEFAULT 0,
    three_points_made INT DEFAULT 0,
    three_points_attempted INT DEFAULT 0,
    free_throws_made INT DEFAULT 0,
    free_throws_attempted INT DEFAULT 0,
    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions FLOAT DEFAULT 0,
    seasonal_epiq FLOAT DEFAULT 0,
    epiq_per_game FLOAT DEFAULT 0,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,
    league VARCHAR(10) DEFAULT 'NBA',
    season_type VARCHAR(20) DEFAULT 'regular',
    offensive_rating FLOAT DEFAULT 0,
    defensive_rating FLOAT DEFAULT 0,
    net_rating FLOAT DEFAULT 0,
    pace FLOAT DEFAULT 0,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    UNIQUE KEY unique_team_season (team_id, season_year)
) DEFAULT CHARSET=utf8mb4;
`);
  await pool.promise().query(`
   CREATE TABLE game_log (
    game_id VARCHAR(50) PRIMARY KEY,
    date DATE NOT NULL,
    season_year INT NOT NULL,
    league VARCHAR(10) DEFAULT 'NBA',
    is_playoff BOOLEAN DEFAULT FALSE,
    winner VARCHAR(50),
    home_team VARCHAR(50),
    away_team VARCHAR(50),
    final_score VARCHAR(20)
);
`);
  await pool.promise().query(`
  CREATE TABLE game_log_player_entries (
    game_id VARCHAR(50),
    player_id VARCHAR(64),
    player_name VARCHAR(100),
    team VARCHAR(50),

    minutes INT DEFAULT 0,
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

    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions FLOAT DEFAULT 0,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,

    PRIMARY KEY (game_id, player_id),
    FOREIGN KEY (game_id) REFERENCES game_log(game_id)
);
`);
  await pool.promise().query(`
  CREATE TABLE game_log_player_entries_clutch (
    game_id VARCHAR(50),
    player_id VARCHAR(64),
    player_name VARCHAR(100),
    team VARCHAR(50),

    minutes INT DEFAULT 0,
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

    offensive_rebounds INT DEFAULT 0,
    defensive_rebounds INT DEFAULT 0,
    points_against INT DEFAULT 0,
    possessions FLOAT DEFAULT 0,
    efficiency_possession_impact_quotient FLOAT DEFAULT 0,

    PRIMARY KEY (game_id, player_id),
    FOREIGN KEY (game_id) REFERENCES game_log(game_id)
);
`);
  const [existingIndexes] = await pool.promise().query(`
  SELECT COUNT(*) AS count
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'player_stats_by_year'
    AND index_name = 'idx_player_season';
`);
  await pool.promise().query(
    'CREATE INDEX idx_player_season ON player_stats_by_year(player_id, season_year)'
  );
  await pool.promise().query(
    'CREATE INDEX idx_players_name ON players(name)'
  );
  await pool.promise().query(
    'CREATE INDEX idx_team_position ON player_stats_by_year (team, position);'
  );
  await pool.promise().query(
    'CREATE INDEX idx_season_year_on_average ON average_for_all_players(season_year)'
  );
  await pool.promise().query(
    'CREATE INDEX idx_team_season ON team_stats_by_year(team_id, season_year)'
  );
  await pool.promise().query(
    'CREATE INDEX idx_awards_player ON awards(player_id)'
  );
  await pool.promise().query(
    'CREATE INDEX idx_teams ON teams(name)'
  );





  console.log('✅ Tables initialized');
}

module.exports = init;
