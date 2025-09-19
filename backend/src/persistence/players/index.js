const {
    getItems,
    getItem,
    storeItem,
    removeItem,
    getJoinedItems,
    getBySeason,
    getTopPlayersByYear,
    updatePlayer
} = require('./players');
const {
    insertGameLog,
    insertPlayerEntries,
    insertClutchEntries,
    updateGameLogById,
    updatePlayerEntriesByGameId,
    updateClutchEntriesByGameId,
    fetchGameLogs,
    fetchPlayerEntries,
    fetchClutchEntries,
    fetchGameLogById,
    fetchPlayerEntriesByGameId,
    fetchClutchEntriesByGameId,
    insertGameMetadata

} = require('./player_game_stats');
const { syncSeasonTotals } = require('./syncSeasonTotals');
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
    addPlayerStats,
    updatePlayer,
    insertGameLog,
    insertPlayerEntries,
    insertClutchEntries,
    updateGameLogById,
    updatePlayerEntriesByGameId,
    updateClutchEntriesByGameId,
    fetchGameLogs,
    fetchPlayerEntries,
    fetchClutchEntries,
    fetchGameLogById,
    fetchPlayerEntriesByGameId,
    fetchClutchEntriesByGameId,
    syncSeasonTotals,
    addPlayerStats,
    insertGameMetadata


};

