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
import logo from "../../images/ui/logo.png";

interface Props {
  code?: string;
}

const Content: React.FC<Props> = ({ code }) => {
  const [, send] = useService<Context, BlockchainEvent, BlockchainState>(
    service
  );

  const trial = () => {
    send("TRIAL");
  };

  if (code === "NO_WEB3") {
    return (
      <>
        You are not connected to Metamask.
        <Button onClick={() => window.open("https://pixelmine.com/")}>
          How to setup Metamask
        </Button>
        {/* <div id="try-it-out"></div> */}
        {/* <span>
          Once you have installed Metamask, please refresh the page.
          Otherwise, feel free to try a simulation & play without tokens
        </span>
        <Button onClick={trial}>Play trial</Button> */}
      </>
    );
  }

  if (code === "WRONG_CHAIN") {
    return (
      <div id="wrong-chain">
        <h4>PLEASE CHANGE NETWORK TO AVAX</h4>
        <div style={{ fontSize: "10px" }}>
          <span>PIXEL MINE IS PLAYABLE ON Avalanche (AVAX)</span>
          <span>
            YOU SHOULD CHANGE YOUR NETWORK TO Avalanche (AVAX) FROM
            METAMASK.
          </span>
          <span>
            YOU CAN FIND DETAILS AT OUR WHITEPAPER,
            <a href="" style={{ color: "yellow" }}>
              CLICK HERE
            </a>
          </span>
        </div>
        <img id="logo" style={{ marginTop: "5px" }} src={logo} />
      </div>
    );
  }

  if (code === "TRIAL_MODE") {
    return (
      <div id="wrong-chain">
        <span>
          It looks like you are not connected to the Avalanche (AVAX)
          Blockchain.
        </span>

        <div id="try-it-out"></div>

        <Button onClick={trial}>Keep Playing</Button>
      </div>
    );
  }

  return (
    <div id="error-popup">
      <span id="error-title">An Error Occured!</span>

      <span id="error-text">{code}</span>
    </div>
  );
};
export const Error: React.FC<Props> = ({ code }) => (
  <Panel>
    <div id="error">
      <Content code={code} />
    </div>
  </Panel>
);
