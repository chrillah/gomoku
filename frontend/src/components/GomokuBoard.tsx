import React from 'react'
import GomokuTile from './GomokuTile'

interface BoardProps {
    boardData: {
        minInRow: number
        cols: number
        rows: number
        tiles: number[][]
    }
    // MIN VARIANT
    makeMove: (row: number, col: number) => void
}

const GomokuBoard: React.FC<BoardProps> = ({ boardData, makeMove }) => {
    const { tiles } = boardData

    // MIN VARIANT
    const handleTileClick = (row: number, col: number) => {
        if (tiles[row][col] === 0) {
            makeMove(row, col)
        }
    }

    return (
        <div className="gomoku-board">
            {tiles.map((row, rowIndex) => (
                <div key={rowIndex} className="gomoku-row">
                    {row.map((tile, colIndex) => (
                        // MIN VARIANT
                        <div
                            key={colIndex}
                            onClick={() => handleTileClick(rowIndex, colIndex)}
                        >
                            <GomokuTile
                                player={
                                    tile !== 0
                                        ? tile === 1
                                            ? 'black'
                                            : 'white'
                                        : null
                                }
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default GomokuBoard
