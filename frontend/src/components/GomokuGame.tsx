import { useEffect, useState } from 'react';
import axios from 'axios';
import GomokuBoard from './GomokuBoard';

function GomokuGame() {
    const [boardData, setBoardData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/gomoku/play')
            .then((response) => {
                console.log(response.data.board.tiles)
                setBoardData(response.data.board);
            })
            .catch((error) => {
                console.error('Ett fel uppstod:', error);
            });
    }, []);

    return (
        <div className="gomoku-game-area">
            {boardData ? <GomokuBoard boardData={boardData} /> : <p className="loading">Wait</p>}
        </div>
    );
}

export default GomokuGame;


// import axios from 'axios'
// import { useEffect } from 'react'
// import GomokuBoard from './GomokuBoard'

// function GomokuGame() {
//     useEffect(() => {
//         axios.get('http://localhost:3000/api/gomoku/play')
//             .then((response) => {
//                 console.log(response.data.board.tiles)
//             })
//             .catch((error) => {
//                 if (error.response) {
//                     console.error('Response from server with error status code: ', error.response.status);
//                   } else if (error.request) {
//                     console.error('No response from the server: ');
//                   } else {
//                     console.error('An unexpected error occurred: ', error.message);
//                   }
//             })
//     }, [])

//   return (
//     <>
//     <GomokuBoard boardData={boardData} />
//     </>
//   )
// }

// export default GomokuGame
