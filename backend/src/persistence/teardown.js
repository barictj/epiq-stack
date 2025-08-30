const pool = require('./pool');

async function teardown() {
    await new Promise((resolve, reject) => {
        pool.end(err => (err ? reject(err) : resolve()));
    });
    console.log('🧼 MySQL pool closed');
}

module.exports = teardown;
