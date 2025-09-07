const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./persistence');
const getGreeting = require('./routes/getGreeting');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');
const getJoinedItems = require('./routes/getJoinedItems')
const updatePlayerStats = require('./routes/updatePlayerStats')
const getBySeason = require('./routes/getBySeason')
const searchPlayersByName = require('./routes/searchPlayersByName')
const getItem = require('./routes/getItem');
const { get } = require('http');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use(express.static(__dirname + '/static'));

app.get('/api/greeting', getGreeting);
app.get('/api/items', getItems);
app.post('/api/items', addItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);
app.get('/api/getJoinedItems/:id', getJoinedItems);
app.post('/api/addPlayerStats', updatePlayerStats);
app.put('/api/updatePlayerStats/:id', updatePlayerStats);
app.get('/api/getBySeason/:year', getBySeason);
app.get('/api/searchPlayersByName/:name', searchPlayersByName);
app.get('/api/items/:id', getItem);
// Allow requests from frontend

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
