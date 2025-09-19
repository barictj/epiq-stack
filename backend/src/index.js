const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./persistence');
const getGreeting = require('./routes/getGreeting');
const addItem = require('./routes/addItem');
// const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');
const getJoinedItems = require('./routes/getJoinedItems')
const updatePlayerStats = require('./routes/updatePlayerStats')
const getBySeason = require('./routes/getBySeason')
const searchPlayersByName = require('./routes/searchPlayersByName')
const getItem = require('./routes/getItem');
const getTopPlayersByYear = require('./routes/getTopPlayersByYear');
const addPlayerStats = require('./routes/addPlayerStats');
const getItems = require('./routes/getItems');

// New routes for average stats by season
const updateAverageStats = require('./routes/updateAverageStats');
const addAverageStatsBySeason = require('./routes/addAverageStatsBySeason');
const getAverageStatsBySeason = require('./routes/getAverageStatsBySeason');
const getAllAverageStatsBySeason = require('./routes/getAllAverageStatsBySeason');
const updatePlayer = require('./routes/updatePlayer');

//Routes for awards
const addAward = require('./persistence/awards/routes/addAward');
const getAwards = require('./persistence/awards/routes/getAwards');


// Team routes
const getTeam = require('./persistence/teams/routes/getTeam');
const getTeams = require('./persistence/teams/routes/getTeams');
const updateTeam = require('./persistence/teams/routes/updateTeam');
const storeTeam = require('./persistence/teams/routes/storeTeam');
const addTeamStats = require('./persistence/teams/routes/addTeamStats');
const getTopTeamsByYear = require('./persistence/teams/routes/getTopTeamsByYear');
const getJoinedItemsTeams = require('./persistence/teams/routes/getJoinedItems');
const getBySeasonTeams = require('./persistence/teams/routes/getBySeason');
const updateTeamStats = require('./persistence/teams/routes/updateTeamStats');

const {
    getGameLogs,
    getPlayerEntries,
    getClutchEntries,
    getGameLogById,
    getPlayerEntriesByGameId,
    getClutchEntriesByGameId
} = require('./routes/gameLogHandlerFetch');
// Game log routes
const { insertFullGameLog, updateFullGameLog } = require('./routes/gameLogHandler');


// Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use(express.static(__dirname + '/static'));

app.get('/api/greeting', getGreeting);
app.post('/api/items', addItem);
// app.put('/api/items/:id', updateItem);
app.put('/api/updatePlayer/:id', updatePlayer);
app.delete('/api/items/:id', deleteItem);
app.get('/api/getJoinedItems/:id', getJoinedItems);
app.post('/api/addPlayerStats', addPlayerStats);
app.put('/api/updatePlayerStats/:id', updatePlayerStats);
app.get('/api/getBySeason/:year', getBySeason);
app.get('/api/searchPlayersByName/:name', searchPlayersByName);
app.get('/api/items/:id', getItem);
app.get('/api/items', getItems);
app.get('/api/getTopPlayersByYear', getTopPlayersByYear);


// Average Stats by Season routes
app.post('/api/addAverageStatsBySeason', addAverageStatsBySeason);
app.put('/api/updateAverageStats/:season_year', updateAverageStats);
app.get('/api/getAverageStatsBySeason/:season_year', getAverageStatsBySeason);
app.get('/api/getAverageStatsBySeason', getAllAverageStatsBySeason);


// Awards routes
app.post('/api/awards', addAward);
app.get('/api/awards/', getAwards);
// Allow requests from frontend


// Team routes
app.get('/api/team/:id', getTeam);
app.get('/api/teams', getTeams);
app.put('/api/team/:id', updateTeam);
app.post('/api/team', storeTeam);
app.post('/api/addTeamStats', addTeamStats);
app.put('/api/updateTeamStats/:id', updateTeamStats);
app.get('/api/getTopTeamsByYear', getTopTeamsByYear);
app.get('/api/getJoinedItemsTeams/:id', getJoinedItemsTeams);
app.get('/api/getBySeasonTeams/:year', getBySeasonTeams);

// Game log routes
app.post('/api/gameLog/full', insertFullGameLog);
app.put('/api/gameLog/:gameId/full', updateFullGameLog);

// Fetch game logs and related entries
app.get('/api/gameLogs', getGameLogs);
app.get('/api/playerEntries', getPlayerEntries);
app.get('/api/clutchEntries', getClutchEntries);
app.get('/api/gameLog/:gameId', getGameLogById);
app.get('/api/playerEntries/:gameId', getPlayerEntriesByGameId);
app.get('/api/clutchEntries/:gameId', getClutchEntriesByGameId);



db.init()
    .then(() => {
        app.listen(3001, () => console.log('Listening on port 3001'));
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => { })
        .then(() => process.exit());
};


process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
