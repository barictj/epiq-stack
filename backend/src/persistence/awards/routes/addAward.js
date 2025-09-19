const db = require('../../index');
const { v4: uuid } = require('uuid');
const pool = require('../../pool');
const { addAward } = require('../backend/addAward');
function normalize(row) {
  return { ...row, completed: row.completed === 1 };
}
module.exports = async (req, res) => {
  const item = {
    id: uuid(),
    season_year: req.body.season_year,
    award_type: req.body.award_type, // '1st', '2nd', 'top_5', etc.
    metric: req.body.metric,         // 'seasonal_epiq', 'epiq', 'epiq_per_game'
    league: req.body.league || 'nba',
    position: req.body.position || 'NA',
    player_id: req.body.player_id,
    rank: req.body.rank,
    epiq_value: req.body.epiq_value || 0,
    name: req.body.name // e.g. '2024 Mens Top 5 Center'
  };

  try {
    await addAward(item); // ✅ Insert into awards table
    res.status(201).send(item);
  } catch (error) {
    console.error('Error inserting award:', error);
    res.status(500).send({ error: 'Failed to insert award' });
  }
};
