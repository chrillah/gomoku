import { useState } from 'react'
import GomokuGame from './components/GomokuGame'
import PopUp from './components/PopUp'

function App() {
    const [letsPlay, setLetsPlay] = useState(false)
    const [color, setColor] = useState("1");

    function onPlay() {
        setLetsPlay((prevState) => !prevState)
    }

    return (
        <div className={`change-color-set-${color}`}>
            {letsPlay ? (
                <GomokuGame onQuitGame={() => setLetsPlay(false)} />
            ) : (
                <div className="start-a-new-game">
                    <div className="top-wrapper">
                        <h1 className="app-display-title">Gomuko</h1>
                        <div className="color-button-container">
                            <button onClick={()=> setColor('1')} className="app-button">1</button>
                            <button onClick={()=> setColor('2')}className="app-button">2</button>
                            <button onClick={()=> setColor('3')}className="app-button">3</button>
                            <button onClick={()=> setColor('4')}className="app-button">4</button>
                        </div>
                    </div>
                    <PopUp
                        message={'Play'}
                        buttonLabel={'yesbox'}
                        onButtonClick={onPlay}
                    />
                </div>
            )}
        </div>
    )
}

export default App
