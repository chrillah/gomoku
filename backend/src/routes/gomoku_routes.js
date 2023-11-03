const express = require('express')
const router = express.Router()
// const gameData = require('./game.json');

// router.get('/create_game', (req, res) => {
//     res.json(gameData);
// });

// router.get('/add_player', (req, res) => {
//     res.json(gameData);
// });

// router.get('/play', (req, res) => {
//     res.json(gameData);
// });


// Store the current state of the game, initially empty
let gameState = {
    minInRow: 5,
    cols: 16,
    rows: 16,
    tiles: Array.from({ length: 16 }, () => Array(16).fill(0)), // Representerar en tom 19x19 tavla
    currentPlayer: 1, // Player 1 startar
    //winner: 0 // 0 för ingen vinnare, 1 eller 2 för att representera spelare, -1 för oavgjort
}

let gomokuWinner = null;
let winners = [];

router.get('/play', (req, res) => {

    res.json({
        minInRow: 5,
        cols: 16,
        rows: 16,
        tiles: Array.from({ length: 16 }, () => Array(16).fill(0)), // Representerar en tom 19x19 tavla
        currentPlayer: 1, // Player 1 startar
        //winner: 0 // 0 för ingen vinnare, 1 eller 2 för att representera spelare, -1 för oavgjort
    })

})

router.get('/winner', (req, res)=>{
    console.log(gomokuWinner)
    if(gomokuWinner){
        res.json({gomokuWinner})
    } else{
        res.json(null)
    }
})

router.post('/make_move', (req, res) => {
    const { row, col } = req.body


    // Kontrollera om de angivna koordinaterna finns inom brädet och att den valda brickan är tom
    if (
        row >= 0 &&
        row < gameState.rows &&
        col >= 0 &&
        col < gameState.cols &&
        gameState.tiles[row][col] === 0

    ) {
        checkForWinner(gameState.tiles, gameState.minInRow)
        gameState.tiles[row][col] = gameState.currentPlayer

        //Kolla efter en vinnare eller oavgjort
        const winner = checkForWinner(gameState.tiles, gameState.minInRow)
        if (winner !== 0) {
            gomokuWinner = winner // Updatera vinnare
            winners.push(gomokuWinner)
        } else if (isTie(gameState.tiles)) {
            gomokuWinner = -1
        } else {
            gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1
        }
        res.json(gameState)
    } else {
        res.json({ message: 'Invalid move. Please try again.' })
    }

})

router.post('/winner', (req, res)=>{

})

console.log('numbers of '+ winners.length)

for(let i = 0; i < winners.length; i++){
    console.log('winners index '+ winners[i])
}

// Funktion för att kontrollera om det finns en vinnare
function checkForWinner(board, minInRow) {
    // Logik för att leta efter vinnaren horisontellt, vertikalt, diagonalt
    const dirs = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1] // directions: horizontal, vertical, diagonal (down-right), diagonal (down-left)
    ]
    // Implementera logik för att kontrollera minInRow antal på varandra följande bitar.
    function isSequence(row, col, dr, dc, player) {
        let count = 0
        while (
            row >= 0 &&
            row < gameState.rows &&
            col >= 0 &&
            col < gameState.cols &&
            board[row][col] === player
        ) {
            count++
            row += dr
            col += dc
        }
        return count
    }
    // Returnera 0 för ingen vinnare, 1 eller 2 för att representera spelare som vinnare
    for (let r = 0; r < gameState.rows; r++) {
        for (let c = 0; c < gameState.cols; c++) {
            const currentPlayer = board[r][c]
            if (currentPlayer !== 0) {
                for (const [dr, dc] of dirs) {
                    if (
                        isSequence(r, c, dr, dc, currentPlayer) +
                            isSequence(r, c, -dr, -dc, currentPlayer) -
                            1 >=
                        minInRow
                    ) {
                        return currentPlayer
                    }
                }
            }
        }
    }
    return 0 // Ingen vinnare hittades
}

// Funktion för att kontrollera om spelet är oavgjort
function isTie(board) {
    // Logik för att kontrollera om tavlan är full utan en vinnare för att förklara oavgjort
    for (let row of board) {
        for (let cell of row) {
            if (cell === 0) {
                return false // Det finns en tom cell, spelet är inte oavgjort
            }
        }
    }
    return true // Tavlan är full, och ingen vinnare utses, det är oavgjort
}

module.exports = router
