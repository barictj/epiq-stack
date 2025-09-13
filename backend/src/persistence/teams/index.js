const { get } = require('http');
const {
    getItems,
    getItem,
    storeItem,
    removeItem,
    getJoinedItems,
    getBySeason,
    getTopPlayersByYear
} = require('./players');
const {
    searchPlayersByName
} = require('./player_search');
const {
    updatePlayerStats, addPlayerStats
} = require('./player_stats');
const { addAverageStatsBySeason, updateAverageStatsBySeason, getAverageStatsBySeason, getAllAverageStatsBySeason } = require('./average_stats_by_year.js');
module.exports = {
    getItems,
    getItem,
    storeItem,
    removeItem,
    getJoinedItems,
    updatePlayerStats,
    getBySeason,
    searchPlayersByName,
    getTopPlayersByYear,
    addAverageStatsBySeason,
    updateAverageStatsBySeason,
    getAverageStatsBySeason,
    getAllAverageStatsBySeason,
    addPlayerStats
};

