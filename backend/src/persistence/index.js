if (process.env.MYSQL_HOST) {
    module.exports = {
        init: require('./init'),
        teardown: require('./teardown'),
        players: require('./players/index.js'), // or './players/index.js' if needed
    };
} else {
    module.exports = require('./sqlite');
}
