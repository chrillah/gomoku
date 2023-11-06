import { FC } from 'react'

interface PopUpChoiceProps {
    message: string | null
    buttonLabel1: string | null
    buttonLabel2: string | null
    onButtonClick1: () => void
    onButtonClick2: () => void
}

const PopUpChoice: FC<PopUpChoiceProps> = ({
    message,
    onButtonClick1,
    onButtonClick2,
    buttonLabel1,
    buttonLabel2
}) => {
    return (
        <div className="pop-up-wrapper">
            <h1 className="pop-up-message">{message}</h1>

            <div className="button-container">
                <button className="app-button" onClick={() => onButtonClick1()}>
                    {buttonLabel1}
                </button>
                <button className="app-button" onClick={() => onButtonClick2()}>
                    {buttonLabel2}
                </button>
            </div>
        </div>
    )
}

export default PopUpChoice
