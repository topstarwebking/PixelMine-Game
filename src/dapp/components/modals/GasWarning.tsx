import React from "react";
import { useService } from "@xstate/react";
import {
  service,
  Context,
  BlockchainEvent,
  BlockchainState,
} from "../../machine";

import { Panel } from "../ui/Panel";
import { Button } from "../ui/Button";
import { MINIMUM_GAS_PRICE } from "../../Blockchain";

import "./Saving.css";
import { isNearHalvening } from "../../utils/supply";

interface Props {
  gasPrice?: number;
  supply?: number;
  action: "SYNC" | "UPGRADE" | "GAS";
}

export const GasWarning: React.FC<Props> = ({
  gasPrice,
  supply,
  action,
}) => {
  const [_, send] = useService<Context, BlockchainEvent, BlockchainState>(
    service
  );

  const save = () => {
    send("SAVE", { action });
  };

  let price = gasPrice / 10 ** 9;

  if (price < MINIMUM_GAS_PRICE) {
    price = MINIMUM_GAS_PRICE;
  }

  const showHalveningWarning = isNearHalvening(supply);

  return (
    <Panel>
      <div id="saving">
        <h6>YOU HAVE TO SAVE MINE IN 5 MINUTES</h6>

        {/* {showHalveningWarning && (
          <h6 className="warning-text">
            We are approaching the halvening period. Plant and upgrade
            prices may change before your transaction is saved.{" "}
            <span className="underline"> Proceed at your own risk.</span>
          </h6>
        )}

        <h6 className="warning-text">Recommended gas price: </h6>

        <h2 style={{ display: "inline-block" }}>{price}</h2>
        <h6 className="warning-text" style={{ display: "inline-block" }}>
          GWEI
        </h6> */}

        <div id="save-error-buttons" onClick={save}>
        </div>
      </div>
    </Panel>
  );
};
