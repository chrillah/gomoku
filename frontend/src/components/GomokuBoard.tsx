import React, { useState } from 'react';
import GomokuQuadrate from './GomokuQuadrate';
const playerColor = ["", "green", "pink"];
let player = 1;
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
function checkWin(boardData) {
  let counter = 0;
  for (let row = 0; row < boardData.length - 1; row++) {
    for (let column = 0; column < boardData[row].length; column++) {
      if(boardData[row][column] > 0) {
        if(boardData[row][column] === boardData[row][column + 1]) {
          counter += 1;
          if(counter === 4) {
            alert("WINNNER! IS " + playerColor[boardData[row][column]]);
          }
        } 
        else {
          counter = 0;
        }
      }
      else {
        counter = 0;
      }
    }
  }

  counter = 0;


  for (let j = 0; j < boardData[0].length; j++) {
    for (let i = 0; i < boardData[0].length - 1; i++) {
      console.log('boardData[i][j]: ', boardData[i][j]);
      if(boardData[i][j] > 0) {
        if(boardData[i][j] === boardData[i + 1][j]) {
          counter += 1;
          if(counter === 4) {
            alert("WINNNER! IS " + playerColor[boardData[i][j]]);
          }
        } 
        else {
          counter = 0;
        }
      }
      else {
        counter = 0;
      }
    }
  }

  // for (let row = 0; row < boardData[0].length - 1; row++) {
  //   for (let column = 0; column < boardData[row].length; column++) {
  //     if(boardData[row][column] > 0) {
  //       if(boardData[row][column] === boardData[row][column + 1]) {
  //         counter += 1;
  //         if(counter === 4) {
  //           alert("WINNNER! IS " + playerColor[boardData[row][column]]);
  //         }
  //       }
  //     }
  //     else {
  //       counter = 0;
  //     }
  //   }
  // }


}


const GomokuBoard: any = ({ boardData }) => {
  //const { tiles } = boardData;
  //console.log('AWDAWDAWAWDAWDADW');

  

  const [test, setTest] = useState('white');

  const handleQuadrateClick = (id, rowAndColumn) => {
    
    //console.log('boardData: ', boardData)
    //console.log(document.querySelector('.gomoku-board'))
    //console.log('rowAndColumn: ', rowAndColumn)

    //console.log('id.target.id: ', id.target.id)
    
    const rectangle = document.getElementById(id.target.id);
    console.log('rectangle: ', rectangle)
    //.player
    

    // if(player === 1) {
    //   if(boardData.tiles[rowAndColumn.row][rowAndColumn.column] === 0) {
    //     rectangle.style.backgroundColor = "green";
    //     //rectangle.attributes[0].value = '1'
    //     player++;
    //     boardData.tiles[rowAndColumn.row][rowAndColumn.column] = 1;
    //   }
    // }
    // else {
    //   if(boardData.tiles[rowAndColumn.row][rowAndColumn.column] === 0) {
    //     rectangle.style.backgroundColor = "pink";
    //     //rectangle.attributes[0].value = '2'
    //     player = 1;
    //     boardData.tiles[rowAndColumn.row][rowAndColumn.column] = 2;
    //   }
      
    // }

  
  


  if(boardData.tiles[rowAndColumn.row][rowAndColumn.column] === 0) {
      rectangle.style.backgroundColor = playerColor[player];
      //rectangle.classList.add('dot')
      boardData.tiles[rowAndColumn.row][rowAndColumn.column] = player;    
      player++;
  }
  if(player > 2) {
    player = 1;
  }
  
    
   

    //console.log('rectangle: ', rectangle)
    //console.log('rectangle.attributes[0].value: ', rectangle.attributes[0].value)
    checkWin(boardData.tiles)
    //console.log('id: ', id.target.value);
    

    //id.target.value = '1'
    //id.target.attributes[2].value = 'orange';
    //id.target.attributes[4].value = '1'

    //console.log('id.target: ', id.target)
    //console.log('obj: ', obj);
    //console.log(document.getElementById(id.target.id))
    //document.getElementById(id.target.id).style.fill = "red";

    //document.getElementById(`ID${row}${column}`).attributes[2].value = 'red'
    //document.getElementById(id.target.id).style.backgroundColor = "#ff0000";
    //console.log(document.querySelector('.gomoku-board'))
    //console.log(document.getElementById(`ID${row}${column}`).id);
    //document.getElementById(`ID${row}${column}`).attributes[2].value = 'red'
    // Do something with the indices i and j
    
    //console.log(`Clicked on quadrate at position (${row}, ${column})`);
    //document.querySelectorAll('rect')[0].attributes[2].value = 'black'
    //console.log('document.querySelectorAll("rect"): ', document.querySelectorAll('rect'))
    //const fillElement = document.querySelectorAll('.row')[column].querySelectorAll('.gomoku-quadrate')[row].children[0].children[0].attributes[2].value = 'black';
    

    //console.log('fillElement: ', fillElement)
    //console.log(document.querySelector(`#root > div > div > div:nth-child(${column}) > div:nth-child(${row})`))
    //console.log('columElement: ', columElement.children[row].children[0].children[0])
    
    //boardData.tiles[row][column] = 1
    //columElement.children[column].children[0].children[0].attributes[2].value = 'black'

    //console.log('boardData.tiles: ', boardData.tiles);
  
  };


  return (
    <div className="gomoku-board">
      {boardData.tiles.map((row, i) => (
        <div key={i} className="row">
          {row.map((tile, j) => (
            <GomokuQuadrate
              key={j}
              tile={tile}
              id={"ID" + j + '-' + i}
              onClick={(id) => handleQuadrateClick(id, {"row": j, "column": i})}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
 

export default GomokuBoard;
