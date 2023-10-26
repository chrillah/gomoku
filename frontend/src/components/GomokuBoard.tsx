import React from 'react';
import GomokuTile from './GomokuTile';

interface BoardProps {
    boardData: {
        minInRow: number;
        cols: number;
        rows: number;
        tiles: number[][];
    };
}

const GomokuBoard: React.FC<BoardProps> = ({ boardData }) => {
    const { tiles } = boardData;

    return (
        <div className="gomoku-board">
            {tiles.map((row, rowIndex) => (
                <div key={rowIndex} className="gomoku-row">
                    {row.map((tile, colIndex) => (
                        <GomokuTile key={colIndex} player={tile !== 0 ? (tile === 1 ? 'red' : 'pink') : null} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GomokuBoard;
