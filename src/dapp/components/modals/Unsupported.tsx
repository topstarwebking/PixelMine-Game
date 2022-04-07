import React from 'react'
import { Panel } from '../ui/Panel'

export const Unsupported: React.FC = () => (
    <Panel>
        <div id="welcome">
            <h1 className="header">
                Problem With Resolution.
            </h1>

            <span>There is something wrong with your screen resolution.</span>
            <span>Please use PC web browser to play Pixel Mine.</span>
            <span>Open with PC web browser and play.</span>
        </div>
    </Panel>
)
