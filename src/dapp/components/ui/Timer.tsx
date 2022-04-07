import React from 'react'

import { service } from '../../machine'

import './Timer.css'

interface Props {
    startAtSeconds: number,
    isdirty: boolean
}

const THIRTY_MINUTES = 60 * 25

export const Timer: React.FC<Props> = ({ startAtSeconds, isdirty }) => {
    const [secondsLeft, setSecondsLeft] = React.useState(THIRTY_MINUTES)

    React.useEffect(() => {
        if (isdirty) {
            let interval: number;

            if (secondsLeft === 300) {
                service.send('SAVE', {action: "GAS"});
            }

            if (secondsLeft > 0) {
                interval = window.setInterval(() => {
                    const now = Math.floor(Date.now() / 1000)
                    const difference = now - startAtSeconds
                    const time = THIRTY_MINUTES - difference
        
                    setSecondsLeft(time)
                }, 1000)
            } else {
                service.send('TIMER_COMPLETE')
            }

            return () => window.clearInterval(interval)
        }
    }, [startAtSeconds, secondsLeft])

    return (
        <div id="timer">
            <div id="leftMinute">
                {isdirty?`${Math.floor(secondsLeft / 60).toString().padStart(2, '0')}`:"25"}
            </div>
            <div id="leftSecond">
                {isdirty?`${(secondsLeft % 60).toString().padStart(2, '0') }`:"00"}
            </div>
        </div>
    )
}
