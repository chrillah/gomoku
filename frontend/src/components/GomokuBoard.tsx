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

    // const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

    // MIN VARIANT
    const handleTileClick = (row: number, col: number) => {
        if (tiles[row][col] === 0) {
            makeMove(row, col)
        }
    }

    return (
        <div className="gomoku-board">

            {/* <div className="gomoku-row">
            {testArray.map((i, key) => (
                <div key={key} className="half-square-2">
                    <div className="small-square square-1"></div>
                    <div className="square-1"></div>
                </div>
            ))}
            </div> */}

            {tiles.map((row, rowIndex) => (
                <div key={rowIndex} className="gomoku-row">

                    {/* <div className="half-square-2">
                        <div className="small-square square-2"></div>
                        <div className="small-square square-4"></div>
                    </div> */}

                    {row.map((tile, colIndex) => (
                        // MIN VARIANT
                        <div>
                            <div
                                key={colIndex}
                                onClick={() =>
                                    handleTileClick(rowIndex, colIndex)
                                }
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
                        </div>
                    ))}
                    {/* <div className="half-square-1">
                        <div className="small-square square-1"></div>
                        <div className="small-square square-3"></div>
                    </div> */}
                </div>
            ))}
        </div>
    )
}

export default GomokuBoard
