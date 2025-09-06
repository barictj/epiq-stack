const { get } = require('http');
const {
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
    getJoinedItems,
    getBySeason
} = require('./players');
const {
    searchPlayersByName
} = require('./player_search');
const {
    updatePlayerStats
} = require('./player_stats');
module.exports = {
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
    getJoinedItems,
    updatePlayerStats,
    getBySeason,
    searchPlayersByName
};
