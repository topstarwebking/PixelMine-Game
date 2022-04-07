import React from "react";
import { Panel } from "../ui/Panel";

import "./Saving.css";

export const Crafting: React.FC = () => (
  <Panel>
    <div id="saving">
      <h4>Saving your NFT</h4>
      <h6>Now PixelMine is saving your NFT. It will takes a few seconds.</h6>

      {/* <div id="mining-animation">
        <img id="crafting-gif" src={person} />
      </div> */}

      <span>Please wait for transaction</span>
    </div>
  </Panel>
);
