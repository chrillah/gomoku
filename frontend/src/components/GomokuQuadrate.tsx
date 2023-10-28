import React from 'react';

const GomokuQudrate = ({ colorClicked, onClick }) => {
  //const { tiles } = boardData;

  return (
    <div className="gomoku-quadrate" onClick={onClick}>
      <svg
        width="50"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
        style={{ border: '2px solid black' }}
      >
        <rect width="50" height="50" fill="white" />
      </svg>
    </div>
  );
};

export default GomokuQudrate;
