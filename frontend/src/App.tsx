import { useState } from 'react'
import GomokuGame from './components/GomokuGame'
import PopUp from './components/PopUp'

function App() {
    const [letsPlay, setLetsPlay] = useState(false)
    const [color, setColor] = useState('1')
    const [player1, setPlayer1] = useState('Red')
    const [player2, setPlayer2] = useState('Pink')

    function onPlay() {
        setLetsPlay((prevState) => !prevState)
    }

    return (
        <div className={`change-color-set-${color}`}>
            {letsPlay ? (
                <GomokuGame
                    onQuitGame={() => setLetsPlay(false)}
                    player1={player1}
                    player2={player2}
                />
            ) : (
                <div className="start-a-new-game">
                    <h1 className="app-display-title">Gomuko</h1>
                    <div className="top-wrapper"></div>
                    <PopUp
                        message={'Play'}
                        buttonLabel={'yesbox'}
                        onButtonClick={onPlay}
                    />
                    <div className="color-button-container">
                        <button
                            onClick={() => {
                                setColor('1')
                                setPlayer1('Red')
                                setPlayer2('Pink')
                            }}
                            className="app-button"
                        >
                            1
                        </button>
                        <button
                            onClick={() => {
                                setColor('2')
                                setPlayer1('Pink')
                                setPlayer2('Yellow')
                            }}
                            className="app-button"
                        >
                            2
                        </button>
                        <button
                            onClick={() => {
                                setColor('3')
                                setPlayer1('Blue')
                                setPlayer2('Red')
                            }}
                            className="app-button"
                        >
                            3
                        </button>
                        <button
                            onClick={() => {
                                setColor('4')
                                setPlayer1('Black')
                                setPlayer2('White')
                            }}
                            className="app-button"
                        >
                            4
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
