import React from 'react';

const GomokuQudrate = ({onClick, id}) => {
  //const { tiles } = boardData;

  return (
    <div className="gomoku-quadrate" onClick={onClick}>
        <div id={id} style={{ border: '2px solid black', width: '50px', height: '50px'}}></div>
    </div>
  );
};

export default GomokuQudrate;
