import { FC } from 'react'

interface GomokuTileProps {
    player: 'red' | 'pink' | null
}

const GomokuTile: FC<GomokuTileProps> = ({ player }) => {
    const playerClass =
        player === 'red' ? 'red player' : player === 'pink' ? 'pink player' : ''

    return (
        <div className="tile">
            <div className={playerClass}></div>
            <div className="square-wrapper">
                <div className="small-square"></div>
                <div className="small-square"></div>
                <div className="small-square"></div>
                <div className="small-square"></div>
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
