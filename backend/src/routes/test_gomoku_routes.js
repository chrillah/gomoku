const express = require('express')
const router = express.Router()
let gameState = {
    minInRow: 5,
    cols: 16,
    rows: 16,
    tiles: Array.from({ length: 16 }, () => Array(16).fill(0)),
    currentPlayer: 1
}

let gomokuWinner = null
let winners = []

router.get('/play', (req, res) => {
    res.json({
        minInRow: 5,
        cols: 16,
        rows: 16,
        tiles: Array.from({ length: 16 }, () => Array(16).fill(0)),
        currentPlayer: 1
    })
})

router.get('/winner', (req, res) => {
    if (gomokuWinner) {
        res.json(gomokuWinner)
        winners.push(gomokuWinner)
        gomokuWinner = null
        gameState = {
            minInRow: 5,
            cols: 16,
            rows: 16,
            tiles: Array.from({ length: 16 }, () => Array(16).fill(0)),
            currentPlayer: 1
        };
    } else {
        res.json(null)
    }
})

router.get('/winners',(req, res) =>{
    res.json(winners);
})

router.post('/make_move', (req, res) => {
    const { row, col } = req.body
    if (
        row >= 0 &&
        row < gameState.rows &&
        col >= 0 &&
        col < gameState.cols &&
        gameState.tiles[row][col] === 0
    ) {
        checkForWinner(gameState.tiles, gameState.minInRow)
        gameState.tiles[row][col] = gameState.currentPlayer

        const winner = checkForWinner(gameState.tiles, gameState.minInRow)
        if (winner !== 0) {
            gomokuWinner = winner
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

function checkForWinner(board, minInRow) {
    const dirs = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1]
    ]

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
    return 0
}

function isTie(board) {
    for (let row of board) {
        for (let cell of row) {
            if (cell === 0) {
                return false
            }
        }
    }
    return true
}

module.exports = router
