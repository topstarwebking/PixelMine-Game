import React from "react";

import { RewardModal } from "../ui/RewardModal";
import {
  service,
  Context,
  BlockchainEvent,
  BlockchainState,
} from "../../machine";
import { useService } from "@xstate/react";
import ButtonClickAudio from "../../songs/ClickButton.wav";

import "./FruitBoard.css";
interface Props {
  account: string;
}

export const Reward: React.FC<Props> = ({ account }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [reward, setReward] = React.useState(null);
  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);
  const [isCollected, setIsCollected] = React.useState(false);
  const clickButtonAudio = new Audio(ButtonClickAudio);

  const onUpgrade = () => {
    clickButtonAudio.play();
    if (reward || !isCollected) setShowModal(true);
  };

  const onReceiveConfirm = () => {
    setShowModal(false);
    send("OPEN_REWARD");
    setIsCollected(true);
  };

  React.useEffect(() => {
    const load = async () => {
      const reward = await machineState.context.blockChain.getReward();
      setReward(reward);
    };

    if (account) {
      load();

      setIsCollected(false);
    }
  }, [account]);

  // if (!reward || isCollected) {
  //     return null
  // }

  return (
    <>
      <div
        id="treasure"
        style={
          !reward || isCollected
            ? {
                opacity: 0.7,
              }
            : {
                opacity: 1,
              }
        }
        onClick={onUpgrade}
      ></div>
      {/* <img  src={present} onClick={onUpgrade} alt="" /> */}
      <RewardModal
        reward={reward}
        onReceive={onReceiveConfirm}
        onClose={() => setShowModal(false)}
        isOpen={showModal}
      />

      {/* Present */}
    </>
  );
};
