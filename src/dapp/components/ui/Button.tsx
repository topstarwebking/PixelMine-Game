import React from 'react'

import './Panel.css'

interface Props {
    onClick: () => void,
    disabled?: boolean
}
export const Button: React.FC<Props> = ({
    children,
    onClick,
    disabled
}) => {
    return (
        <div className={disabled ? "button disabled" : "button"} onClick={disabled ? undefined : onClick}>
            { children }
            {/* <img id="panel-left-edge" src={leftEdgeInner} />
            <img id="panel-right-edge" src={rightEdgeInner} />
            <img id="panel-bottom-edge" src={bottomEdgeInner} />
            <img id="panel-top-edge" src={topEdgeInner} />
            <img id="panel-top-left" src={topLeftInner} />
            <img id="panel-bottom-left" src={bottomLeftInner} />
            <img id="panel-bottom-right" src={bottomRightInner} />
            <img id="panel-top-right" src={topRightInner} /> */}
        </div>
    )
}
