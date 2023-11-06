import { useEffect, useState } from 'react'
import axios from 'axios'
import GomokuBoard from './GomokuBoard'
import PopUp from './PopUp'

function GomokuGame() {
    const [boardData, setBoardData] = useState(null)
    const [isWinner, setIsWinner] = useState<number | null>(null)
    const [winners, setWinners] = useState<string | null>(null)
    const [currentPlayer, setCurrentPlayer] = useState<number | null>(null)

    useEffect(() => {
        fetchBoardData()
    }, [])

    const fetchBoardData = () => {
        axios
            .get('http://localhost:3000/api/gomoku/play')
            .then((response) => {
                // console.log('fetch new board')
                setBoardData(response.data)
                setCurrentPlayer(response.data.currentPlayer)
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
                setCurrentPlayer(response.data.currentPlayer)
            })
            .catch((error) => {
                console.error('An error occurred while making a move:', error)
            })
            getWinner()
            getAllWinners()
    }

    const getAllWinners = () => {
        axios
            .get('http://localhost:3000/api/gomoku/winners')
            .then((response) => {
                setWinners(response.data)
            })
            .catch((error) => {
                console.error('An error occurred while making a move:', error)
            })
    }

    const getWinner = () => {
        axios
            .get('http://localhost:3000/api/gomoku/winner')
            .then((response) => {
                setIsWinner(response.data)
            })
            .catch((error) => {
                console.error('An error occurred while making a move:', error)
            })
    }

    const handleResetAndFetch = () => {
        console.log('ok')
        console.log('Is winner : ' + isWinner)
        setIsWinner(null)
        setCurrentPlayer(null)
        fetchBoardData()
        onWinners()
    }

    function onWinners() {
        if (winners) {
            for (let i = 0; i <= winners.length; i++) {
                console.log(winners[i])
            }
        }
    }

    return (
        <div className="game-wrapper">
            {/* tennis */}
            {/* {currentPlayer === 1 ? (
                <div className="black game-player"></div>
            ) : (
                <div className="non-active-black non-active-game-player"></div>
            )} */}

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
                            // <div className="game-result">
                            //     <p>{isWinner}</p>
                            //     <button
                            //         className="prompt-btn"
                            //         onClick={handleResetAndFetch}
                            //     >
                            //         OK
                            //     </button>
                            // </div>
                            <PopUp
                                message={
                                    isWinner === 1 ? 'Red won' : 'Pink won'
                                }
                                onButtonClick={handleResetAndFetch}
                                buttonLabel={'Ok'}
                            />
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

            {/* tennis */}
            {/* {currentPlayer === 2 ? (
                <div className="white game-player"></div>
            ) : (
                <div className="non-active-white non-active-game-player"></div>
            )} */}
        </div>
    )
}

export default GomokuGame
