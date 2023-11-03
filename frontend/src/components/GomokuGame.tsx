import { useEffect, useState } from 'react'
import axios from 'axios'
import GomokuBoard from './GomokuBoard'

function GomokuGame() {
    const [boardData, setBoardData] = useState(null)
    const [gameResult, setGameResult] = useState<string | null>(null)
    const [isWinner, setIsWinner] = useState<string | null>(null)
    const [currentPlayer, setCurrentPlayer] = useState<number | null>(null)

    useEffect(() => {
        fetchBoardData()
    }, [])

    const fetchBoardData = () => {
        axios
            .get('http://localhost:3000/api/gomoku/play')
            .then((response) => {
                console.log('fetch new board')
                setBoardData(response.data)
            })
            .catch((error) => {
                console.error('An error occurred:', error)
            })
    }

    const makeMove = (row: number, col: number) => {
        getWinner();
        axios
            .post('http://localhost:3000/api/gomoku/make_move', { row, col })
            .then((response) => {
                //getWinner();
                setBoardData(response.data)
                setCurrentPlayer(response.data.currentPlayer)
                // console.log('winner is ' + response.data.winner)
                // setIsWinner(response.data.winner)
                // if (response.data.winner !== 0) {
                //     setGameResult(
                //         response.data.winner === 1
                //             ? 'Black player wins!'
                //             : 'White player wins!'
                //     )
                // } else if (response.data.winner === -1) {
                //     setGameResult("It's a tie!")
                // }
            })
            .catch((error) => {
                console.error('An error occurred while making a move:', error)
            })
    }

    const getWinner = () =>{
        axios.get('http://localhost:3000/api/gomoku/winner').then((response) =>{
            setIsWinner(response.data)
        })
        .catch((error) => {
            console.error('An error occurred while making a move:', error)
        })
    }

    const resetGame = () => {
        setGameResult(null)
        setBoardData(null) // Reset boardData to null when resetting the game
        // fetchBoardData()
    }
    const handleResetAndFetch = () => {
        console.log('ok')
        console.log('Is winner : '+isWinner)
        // resetGame()
        setIsWinner(null)
        setCurrentPlayer(null);
        fetchBoardData()
    }

    // useEffect(() => {
    //     if (gameResult === null && boardData === null) {
    //         fetchBoardData()
    //     }
    // }, [gameResult, boardData])

    return (
        <div className="gomoku-game-area">
            <div className="player-turns-wrapper">
                {currentPlayer === 1 ? (
                    <div className="black game-player"></div>
                ) : (
                    <div className="non-active-black non-active-game-player"></div>
                )}
                {currentPlayer === 2 ? (
                    <div className="white game-player"></div>
                ) : (
                    <div className="non-active-white non-active-game-player"></div>
                )}
            </div>

            {boardData ? (
                <div>
                    {isWinner ? (
                        <div className="game-result">
                            <p>{isWinner}</p>
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
