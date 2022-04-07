import React from 'react'

import baldMan1 from '../../images/characters/bald_man1.png'
import baldMan from '../../images/characters/bald_man.png'

import { MarketModal } from '../ui/MarketModal'


interface Props {}

export const Market: React.FC<Props> = () => {
    const [showModal, setShowModal] = React.useState(false)


    return (
        <>
            <MarketModal isOpen={showModal} onClose={() => setShowModal(false)} />
            {/* <div  style={{ gridColumn: '12/13', gridRow: '8/9'}}>
                <img className='man' src={man} />
            </div>
            <div  style={{ gridColumn: '13/14', gridRow: '8/9'}}>
                <img className='girl' src={girl} />
            </div>

            <div  style={{ gridColumn: '14/15', gridRow: '9/10'}}>
                <img className='carrotMan' src={carrotMan} />
            </div> */}
            <div style={{ gridColumn: "6", gridRow: "5", top: "-25px", left: "5px" }}>
                <img className='carrotMan' src={baldMan1} />
            </div>

            <div id='salesman' style={{ gridColumn: "16", gridRow: "12", top: "28px"}}>
                {/* onClick={() => setShowModal(true)} */}
                <img className='baldMan' src={baldMan} />
                {/* <img className='chat' src={chat} /> */}
            </div>
        </>
    )
}
