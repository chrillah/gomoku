import { useEffect, useState } from 'react'
import axios from 'axios'
import GomokuBoard from './GomokuBoard'

function GomokuGame() {
    const [boardData, setBoardData] = useState(null)
    const [gameResult, setGameResult] = useState<string | null>(null)

    useEffect(() => {
        fetchBoardData()
    }, [])

    const fetchBoardData = () => {
        axios
            .get('http://localhost:3000/api/gomoku/play')
            .then((response) => {
                console.log('Received data after reset:', response.data) // Log the response data
                setBoardData(response.data)
            })
            .catch((error) => {
                console.error('An error occurred:', error)
            })
    }

    const makeMove = (row: number, col: number) => {
        axios
            .post('http://localhost:3000/api/gomoku/make_move', { row, col })
            .then((response) => {
                setBoardData(response.data)

                if (response.data.winner !== 0) {
                    setGameResult(
                        response.data.winner === 1
                            ? 'Black player wins!'
                            : 'White player wins!'
                    )
                } else if (response.data.winner === -1) {
                    setGameResult("It's a tie!")
                }
            })
            .catch((error) => {
                console.error('An error occurred while making a move:', error)
            })
    }

    /*-----------------VARIANT 1 --------------------*/
    const resetGame = () => {
        setGameResult(null)
        setBoardData(null) // Reset boardData to null when resetting the game
        // fetchBoardData()
    }

    /*-----------------VARIANT 2 --------------------*/
    // useEffect(() => {
    //     if (boardData === null) {
    //         fetchBoardData()
    //     }
    // }, [boardData])

    // useEffect(() => {
    //     if (boardData === null) {
    //         resetGame()
    //     }
    // }, [boardData])

    // useEffect(() => {
    //     if (gameResult === null) {
    //         fetchBoardData()
    //     }
    // }, [gameResult])

    /*-----------------VARIANT 4 --------------------*/
    //  useEffect(() => {
    //     if (gameResult !== null) {
    //         resetGame();
    //     }
    // }, [gameResult]);

    // useEffect(() => {
    //     if (boardData === null && gameResult === null) {
    //         fetchBoardData();
    //     }
    // }, [boardData, gameResult]);

    // const handleResetAndFetch = () => {
    //     resetGame();
    //     fetchBoardData();
    // };

    /*-----------------VARIANT 3 --------------------*/
    const handleResetAndFetch = () => {
        resetGame()
        fetchBoardData()
    }

    useEffect(() => {
        if (gameResult === null && boardData === null) {
            fetchBoardData()
        }
    }, [gameResult, boardData])

    return (
        <div className="gomoku-game-area">
            {boardData ? (
                <div>
                    {gameResult ? (
                        <div className="game-result">
                            <p>{gameResult}</p>
                            <button
                                className="prompt-btn"
                                onClick={handleResetAndFetch}
                            >
                                OK
                            </button>
                        </div>
                    ) : (
                        <GomokuBoard
                            boardData={boardData}
                            makeMove={makeMove}
                        />
                    )}
                </div>
            ) : (
                <p className="loading">Wait</p>
            )}
        </div>
    )
}

export default GomokuGame

// function GomokuGame() {
//     const [boardData, setBoardData] = useState(null)

//     /* -------------------- MIN VARIANT 1----------------- */
//     useEffect(() => {
//         fetchBoardData()
//     }, [])

//     const fetchBoardData = () => {
//         axios
//             .get('http://localhost:3000/api/gomoku/play')
//             .then((response) => {
//                 setBoardData(response.data)
//             })
//             .catch((error) => {
//                 console.error('An error occurred:', error)
//             })
//     }

//     const makeMove = (row, col) => {
//         axios
//             .post('http://localhost:3000/api/gomoku/make_move', { row, col })
//             .then((response) => {
//                 setBoardData(response.data)
//             })
//             .catch((error) => {
//                 console.error('An error occurred while making a move:', error)
//             })
//     }

//     return (
//         <div className="gomoku-game-area">
//             {boardData ? (
//                 <GomokuBoard boardData={boardData} makeMove={makeMove} />
//             ) : (
//                 <p className="loading">Wait</p>
//             )}
//         </div>
//     )
// }

// export default GomokuGame

/* -----------------------CHRIS VARIANT------------------- */
//     useEffect(() => {
//         axios.get('http://localhost:3000/api/gomoku/play')
//             .then((response) => {
//                 console.log(response.data.board.tiles)
//                 setBoardData(response.data.board);
//             })
//             .catch((error) => {
//                 console.error('Ett fel uppstod:', error);
//             });
//     }, []);

//     return (
//         <div className="gomoku-game-area">
//             {boardData ? <GomokuBoard boardData={boardData} /> : <p className="loading">Wait</p>}
//         </div>
//     );
// }

// export default GomokuGame;

/* ------------------------ MIKALES VARIANT ------------------- */
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
