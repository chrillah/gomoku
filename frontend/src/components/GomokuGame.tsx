import { useEffect, useState } from 'react'
import { FC } from 'react'
import GomokuBoard from './GomokuBoard'
import PopUpChoice from './PopUpChoice'
import {
    playGame,
    makeMove,
    GameState
} from '../GameLogic'

interface GomokuGameProps {
    onQuitGame: () => void
}

const GomokuGame: FC<GomokuGameProps> = ({ onQuitGame }) => {
    const [boardData, setBoardData] = useState<GameState | null>()
    const [isWinner, setIsWinner] = useState<number | null>(null)
    const [winners, setWinners] = useState<number[]>([])
    const [currentPlayer, setCurrentPlayer] = useState<number | null>(null)
    const [blackNumberOfWins, setBlackNumberOfWins] = useState<number>(0)
    const [whiteNumberOfWins, setWhiteNumberOfWins] = useState<number>(0)

    useEffect(() => {
        fetchBoardData()
    }, [])

    const fetchBoardData = async () => {
        try {
            const data = await playGame()
            setBoardData(data)
            setCurrentPlayer(data.currentPlayer)
        } catch (error) {
            console.log('No board ' + error)
        }
    }

    const playerMove = async (row: number, col: number) => {
        try {
            const data = await makeMove(row, col)
            setBoardData(data)
            setCurrentPlayer(data.currentPlayer)
            if(data.gomokuWinner){
                console.log(data.gomokuWinner)
                setIsWinner(data.gomokuWinner)
                winners.push(data.gomokuWinner)
                setWinners([...winners])
            }
        } catch (error) {
            console.log('No update ' + error)
        }
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
            <div className="gomoku-game-area">
                <div className="player-turns-wrapper">
                    <div
                        className={
                            currentPlayer === 1
                                ? 'black game-player'
                                : 'non-active-black non-active-game-player'
                        }
                    >
                        {blackNumberOfWins === 0 ? (
                            <></>
                        ) : (
                            <h1 className="number-of-wins">
                                {blackNumberOfWins}
                            </h1>
                        )}
                    </div>
                    <div
                        className={
                            currentPlayer === 2
                                ? 'white game-player'
                                : 'non-active-white non-active-game-player'
                        }
                    >
                        {whiteNumberOfWins === 0 ? (
                            <></>
                        ) : (
                            <h1 className="number-of-wins">
                                {whiteNumberOfWins}
                            </h1>
                        )}
                    </div>
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
                            <></>
                        )}
                        <GomokuBoard
                            boardData={boardData}
                            makeMove={playerMove}
                        />
                    </div>
                ) : (
                    <p className="loading">Wait</p>
                )}
            </div>
        </div>
    )
}

export default GomokuGame
