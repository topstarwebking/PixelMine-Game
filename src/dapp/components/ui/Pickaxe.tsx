import React from 'react'

import './Pickaxe.css'

interface Props {
    onClick: () => void
}
export const Pickaxe: React.FC<Props> = ({ className, onClick }) => {
    return (
        <div className={`dig loop`} onClick={onClick}>
        </div>
    )
}
