const db = require('../persistence');

async function insertPlayerGameLog(req, res) {
    const stat = req.body;

    try {
        const game_id = await db.players.insertGameLog(stat);
        console.log(`✅ Player game log inserted: ${game_id}`);
        res.status(201).json({ message: 'Player game log inserted', game_id });
    } catch (err) {
        console.error(`❌ Error inserting player game log:`, err);
        res.status(500).json({ error: 'Failed to insert player game log' });
    }
}

async function insertFullGameLog(req, res) {
    const { game, players, players_clutch } = req.body;

    try {
        const game_id = await db.players.insertGameMetadata(game);

        if (players && players.length > 0) {
            await db.players.insertPlayerEntries(game_id, players);
        }

        if (players_clutch && players_clutch.length > 0) {
            await db.players.insertClutchEntries(game_id, players_clutch);
        }

        await db.players.syncSeasonTotals(game_id);

        console.log(`✅ Game log inserted: ${game_id}`);
        res.status(201).json({
            message: 'Full game log inserted and season totals synced',
            game_id
        });
    } catch (err) {
        console.error(`❌ Error inserting full game log:`, err);
        res.status(500).json({ error: 'Failed to insert full game log' });
    }
}

async function updateFullGameLog(req, res) {
    const gameId = req.params.gameId;
    const { game, players, players_clutch } = req.body;

    try {
        await db.players.updateGameLogById(gameId, game);

        if (players && players.length > 0) {
            await db.players.updatePlayerEntriesByGameId(gameId, players);
        }

        if (players_clutch && players_clutch.length > 0) {
            await db.players.updateClutchEntriesByGameId(gameId, players_clutch);
        }

        console.log(`✅ Game log updated: ${gameId}`);
        res.status(200).json({
            message: 'Full game log updated successfully',
            game_id: gameId
        });
    } catch (err) {
        console.error(`❌ Error updating full game log for ${gameId}:`, err);
        res.status(500).json({ error: 'Failed to update full game log' });
    }
}

module.exports = {
    insertPlayerGameLog,
    insertFullGameLog,
    updateFullGameLog
};
