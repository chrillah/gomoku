const express = require('express');
const router = express.Router();
const gameData = require('./game.json');

router.get('/create_game', (req, res) => {
    res.json(gameData);
});

router.get('/add_player', (req, res) => {
    res.json(gameData);
});

router.get('/play', (req, res) => {
    res.json(gameData);
});

module.exports = router;
