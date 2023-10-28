import React, { useState } from 'react';
import GomokuQuadrate from './GomokuQuadrate';

/*
interface BoardProps {
  boardData: {
    minInRow: number;
    cols: number;
    rows: number;
    tiles: number[][];
  };
}
*/

const GomokuBoard: any = ({ boardData }) => {
  //const { tiles } = boardData;
  //console.log('AWDAWDAWAWDAWDADW');

  const [test, setTest] = useState('white');

  const handleQuadrateClick = (i, j) => {
    // Do something with the indices i and j
    console.log(`Clicked on quadrate at position (${i}, ${j})`);
    setTest('black');
  };

  for (let i = 0; i < boardData.tiles.length; i++) {
    //console.log('boardData[i]: ', boardData.tiles[i]);
    for (let j = 0; j < boardData.tiles[i].length; j++) {
      return (
        <div className="gomoku-board">
          {boardData.tiles.map((row, i) => (
            <div key={i} className="row">
              {row.map((tile, j) => (
                <GomokuQuadrate
                  key={j}
                  tile={tile}
                  onClick={() => handleQuadrateClick(i, j)}
                  colorClicked={test}
                />
              ))}
            </div>
          ))}
        </div>
      );
    }
  }
};

export default GomokuBoard;
