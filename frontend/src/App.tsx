import { useState } from 'react'
import GomokuGame from './components/GomokuGame'
import PopUp from './components/PopUp'

function App() {
    const [letsPlay, setLetsPlay] = useState(false)

    function onPlay() {
        setLetsPlay((prevState) => !prevState)
    }

    return (
        <>
            {letsPlay ? (
                <GomokuGame />
            ) : (
                <div className='start-a-new-game'>
                    <h1 className="app-display-title">Gomuko</h1>
                    <PopUp
                        message={'Play'}
                        buttonLabel={'yesbox'}
                        onButtonClick={onPlay}
                    />
                </div>
            )}
        </>
    )
}

export default App
