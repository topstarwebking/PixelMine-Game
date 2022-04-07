import React from 'react'
import { Panel } from '../ui/Panel'
import logo from "../../images/ui/logo.png";

import './Saving.css'

export const Saving: React.FC = () => (
    <Panel>
        <div id="saving">
            <h4>MINE STATUS SAVING...</h4>
            {/* <h6>Miners are working hard to save your farm to the blockchain.</h6> */}
            <span>Please WAIT WHILE YOUR TRANSACTION BEING APPROVED</span>
            <img id="logo" style={{marginTop: "10px"}} src={logo} />
        </div>
    </Panel>
)
