if (process.env.MYSQL_HOST) {
    console.log('Using MySQL persistence layer');
    module.exports = {
        init: require('./init'),
        teardown: require('./teardown'),
        players: require('./players/index.js'), // or './players/index.js' if needed
    };
} else {
    console.log('Using SQLite persistence layer');
    module.exports = require('./sqlite');
}
