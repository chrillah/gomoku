import { FC } from 'react'

interface GomokuTileProps {
    player: 'black' | 'white' | null
}

const GomokuTile: FC<GomokuTileProps> = ({ player }) => {
    const playerClass =
        player === 'black' ? 'black player' : player === 'white' ? 'white player' : ''

    return (
        <div className="tile">
            <div className={playerClass}></div>
            <div className="square-wrapper">
                <div className="small-square square-1"></div>
                <div className="small-square square-2"></div>
                <div className="small-square square-3"></div>
                <div className="small-square square-4"></div>
            </div>
        </div>
    )
}

export default GomokuTile

// function GomokuTile() {

//     return (
//         <div className="tile">
//             <div className="red player"></div>
//             <div className="pink player"></div>
//             <div className="square-wrapper">
//                 <div className="small-square"></div>
//                 <div className="small-square"></div>
//                 <div className="small-square"></div>
//                 <div className="small-square"></div>
//             </div>
//         </div>
//     )
// }

// export default GomokuTile
