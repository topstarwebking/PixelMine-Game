import React from "react";
import Big from "big.js";

import logo from "../../images/ui/logo.png";

import { secondsToLongString } from "../../utils/time";

import { Panel } from "../ui/Panel";
import { Button } from "../ui/Button";
import { service } from "../../machine";
import { getMarketRate } from "../../utils/supply";

import "./Modals.css";
interface Props {
  onGetStarted: () => void;
}

// TODO: Hardcoded from reports, read from live API
const predictedDate = new Date(2021, 9, 19, 8, 44, 55);

const makeTimeLeft = () => {
  const difference = predictedDate.getTime() - Date.now();

  const display = secondsToLongString(difference / 1000);
  return display;
};

export const Welcome: React.FC<Props> = ({ onGetStarted }) => {
  const [timeLeft, setTimeLeft] = React.useState(makeTimeLeft());
  const [totalSupply, setTotalSupply] = React.useState<number>(1);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(makeTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const load = async () => {
      const supply =
        await service.machine.context.blockChain.totalSupply();
      setTotalSupply(supply);
    };

    load();
  }, []);

  return (
    <Panel>
      <div id="welcome">
        <img id="logo" src={logo} />
        <div className="buttons">
          <Button onClick={onGetStarted}>
            <span className="welcome-play"></span>
          </Button>
          <Button onClick={() => window.open("https://pixelmine.io/")}>
            <span className="welcome-about"></span>
          </Button>
          <Button onClick={() => window.open("https://traderjoe")}>
            <span className="welcome-swap"></span>
          </Button>
        </div>
      </div>
    </Panel>
  );
};
