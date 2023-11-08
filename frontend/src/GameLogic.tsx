import { db } from './firebase';
import { ref, set, get, push } from 'firebase/database';

interface GameState {
    minInRow: number;
    cols: number;
    rows: number;
    tiles: number[][];
    currentPlayer: number;
    gomokuWinner?: number;
}

const gameStateRef = ref(db, 'gameState');
const winnersRef = ref(db, 'winners');

let gameState: GameState = {
    minInRow: 5,
    cols: 16,
    rows: 16,
    tiles: Array.from({ length: 16 }, () => Array(16).fill(0)),
    currentPlayer: 1
};

let gomokuWinner: number | null = null;
const winners: number[] = [];

async function playGame(): Promise<GameState> {
    await set(gameStateRef, {
        minInRow: 5,
        cols: 16,
        rows: 16,
        tiles: Array.from({ length: 16 }, () => Array(16).fill(0)),
        currentPlayer: 1
    });
    return gameState;
}

async function handleWinner(): Promise<number | null> {
    if (gomokuWinner) {
        winners.push(gomokuWinner);
        gomokuWinner = null;
        gameState = {
            minInRow: 5,
            cols: 16,
            rows: 16,
            tiles: Array.from({ length: 16 }, () => Array(16).fill(0)),
            currentPlayer: 1
        };
    }
    await set(gameStateRef, gameState);
    await push(winnersRef, gomokuWinner);
    return gomokuWinner;
}

async function makeMove(row: number, col: number): Promise<GameState> {
    const existingState = await get(gameStateRef);
    const existingGameState: GameState = existingState.val();

    if (
        row >= 0 &&
        row < existingGameState.rows &&
        col >= 0 &&
        col < existingGameState.cols &&
        existingGameState.tiles[row][col] === 0
    ) {
        const updatedGameState: GameState = { ...existingGameState };
        checkForWinner(updatedGameState.tiles, updatedGameState.minInRow);
        updatedGameState.tiles[row][col] = updatedGameState.currentPlayer;

        const winner = checkForWinner(
            updatedGameState.tiles,
            updatedGameState.minInRow
        );
        if (winner !== 0) {
            updatedGameState.gomokuWinner = winner;
        } else if (isTie(updatedGameState.tiles)) {
            updatedGameState.gomokuWinner = -1;
        } else {
            updatedGameState.currentPlayer =
                updatedGameState.currentPlayer === 1 ? 2 : 1;
        }

        await set(gameStateRef, updatedGameState);
        await push(winnersRef, updatedGameState.gomokuWinner);

        return updatedGameState;
    } else {
        throw new Error('Invalid move. Please try again.');
    }
}

function checkForWinner(board: number[][], minInRow: number): number {
    const dirs: number[][] = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1]
    ];

    function isSequence(
        row: number,
        col: number,
        dr: number,
        dc: number,
        player: number
    ): number {
        let count = 0;
        while (
            row >= 0 &&
            row < gameState.rows &&
            col >= 0 &&
            col < gameState.cols &&
            board[row][col] === player
        ) {
            count++;
            row += dr;
            col += dc;
        }
        return count;
    }

    for (let r = 0; r < gameState.rows; r++) {
        for (let c = 0; c < gameState.cols; c++) {
            const currentPlayer = board[r][c];
            if (currentPlayer !== 0) {
                for (const [dr, dc] of dirs) {
                    if (
                        isSequence(r, c, dr, dc, currentPlayer) +
                            isSequence(r, c, -dr, -dc, currentPlayer) -
                            1 >=
                        minInRow
                    ) {
                        return currentPlayer;
                    }
                }
            }
        }
    }
    return 0;
}

function isTie(board: number[][]): boolean {
    for (const row of board) {
        for (const cell of row) {
            if (cell === 0) {
                return false;
            }
        }
    }
    return true;
}

export { playGame, handleWinner, makeMove };
