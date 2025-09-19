const { getTeam, getTeams, updateTeam, getBySeason, getJoinedItems, getTopTeamsByYear, storeTeam } = require('./backend/teams.js');
const { updateTeamStats, addTeamStats } = require('./backend/team_stats.js');
const { addAverageStatsBySeason, updateAverageStatsBySeason, getAverageStatsBySeason, getAllAverageStatsBySeason } = require('./average_stats_by_year.js');
module.exports = {
    getTeam,
    getTeams,
    updateTeam,
    getBySeason,
    getJoinedItems,
    getTopTeamsByYear,
    storeTeam,
    addTeamStats,
    updateTeamStats,
    addAverageStatsBySeason,
    updateAverageStatsBySeason,
    getAverageStatsBySeason,
    getAllAverageStatsBySeason
};

