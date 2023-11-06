import { useEffect, useState } from 'react'
import { FC } from 'react'
import axios from 'axios'
import GomokuBoard from './GomokuBoard'
import PopUpChoice from './PopUpChoice'

interface GomokuGameProps {
    onQuitGame: () => void
}

const GomokuGame: FC<GomokuGameProps> = ({ onQuitGame }) => {
    const [boardData, setBoardData] = useState(null)
    const [isWinner, setIsWinner] = useState<number | null>(null)
    const [winners, setWinners] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState<number | null>(null)
    const [blackNumberOfWins, setBlackNumberOfWins] = useState([])
    const [whiteNumberOfWins, setWhiteNumberOfWins] = useState([])

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
        onWinners()
        setIsWinner(null)
        setCurrentPlayer(null)
        fetchBoardData()
    }

    function onWinners(): void {
        if (winners) {
            const blackWinsCount: number = winners.filter(
                (winner) => winner === 1
            ).length
            const whiteWinsCount: number = winners.filter(
                (winner) => winner === 2
            ).length

            setBlackNumberOfWins(blackWinsCount)
            setWhiteNumberOfWins(whiteWinsCount)
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
                        <div className="black game-player">
                            {blackNumberOfWins === 0 ? (
                                <></>
                            ) : (
                                <h1 className="number-of-wins">
                                    {blackNumberOfWins}
                                </h1>
                            )}
                        </div>
                    ) : (
                        <div className="non-active-black non-active-game-player"></div>
                    )}
                    {currentPlayer === 2 ? (
                        <div className="white game-player">
                            {whiteNumberOfWins === 0 ? (
                                <></>
                            ) : (
                                <h1 className="number-of-wins">
                                    {whiteNumberOfWins}
                                </h1>
                            )}
                        </div>
                    ) : (
                        <div className="non-active-white non-active-game-player"></div>
                    )}
                </div>

                {boardData ? (
                    <div>
                        {isWinner ? (
                            <PopUpChoice
                                message={
                                    isWinner === -1
                                        ? "It's a Tie! Play again?"
                                        : isWinner === 1
                                        ? 'Red won, play again?'
                                        : 'Pink won, play again?'
                                }
                                buttonLabel1={'Yes'}
                                buttonLabel2={'No'}
                                onButtonClick1={() => handleResetAndFetch()}
                                onButtonClick2={() => onQuitGame()}
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
