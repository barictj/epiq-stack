if (process.env.MYSQL_HOST) {
    module.exports = {
        init: require('./init'),
        teardown: require('./teardown'),
        players: require('./players/index.js'),
        player_stats: require('./players/player_stats.js'), // or './players/index.js' if needed,
        average_stats_by_year: require('./players/average_stats_by_year.js'),
    };
} else {
    module.exports = require('./sqlite');
}
