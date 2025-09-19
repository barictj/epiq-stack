if (process.env.MYSQL_HOST) {
    module.exports = {
        init: require('./init'),
        teardown: require('./teardown'),
        players: require('./players/index.js'),
        player_stats: require('./players/player_stats.js'), // or './players/index.js' if needed,
        average_stats_by_year: require('./players/average_stats_by_year.js'),
        awards: require('./awards/index.js'),
        teams: require('./teams/index.js'),
        team_stats_by_year: require('./teams/index.js'),
        game_log: require('./players/index.js'),



    };
} else {
    module.exports = require('./sqlite');
}
