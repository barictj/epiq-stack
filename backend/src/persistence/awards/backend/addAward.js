const pool = require('../../pool');

// Define award type limits
const awardLimits = {
  top_5: 5,
  top_3: 3,
  top_10: 10,
  first: 1,
  second: 1,
  third: 1
};

async function addAward(item) {
  const league = item.league || 'nba';
  const position = item.position || 'NA';
  const limit = awardLimits[item.award_type] || 5;

  // Check how many awards already exist for this context
  const [existing] = await pool.promise().query(
    `SELECT COUNT(*) AS count FROM awards
     WHERE season_year = ? AND award_type = ? AND position = ?`,
    [item.season_year, item.award_type, position]
  );

  if (existing[0].count >= limit) {
    throw new Error(`Award limit reached for ${item.award_type} ${position}`);
  }

  // Check for duplicate award for this player in this context
  const [duplicate] = await pool.promise().query(
    `SELECT id FROM awards
     WHERE season_year = ? AND award_type = ? AND position = ? AND player_id = ?`,
    [item.season_year, item.award_type, position, item.player_id]
  );

  if (duplicate.length > 0) {
    throw new Error('Award already exists for this player in this context');
  }

  // Proceed with insert
  await pool.promise().query(
    `INSERT INTO awards (
      id, season_year, award_type, metric, league, position, player_id, \`rank\`, epiq_value, name
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      item.id,
      item.season_year,
      item.award_type,
      item.metric,
      league,
      position,
      item.player_id,
      item.rank,
      item.epiq_value || 0,
      item.name
    ]
  );
}

async function getAwards() {
  const [rows] = await pool.promise().query(`SELECT * FROM awards`);
  return rows;
}

module.exports = {
  addAward,
  getAwards
};
