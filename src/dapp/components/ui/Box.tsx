import React from "react";

import selectBox from "../../images/ui/select-box/select_box.png";

import "./Panel.css";

export interface BoxProps {
  isSelected?: boolean;
  count?: number;
  onClick?: () => void;
  disabled?: boolean;
  image?: string;
}

export const Box: React.FC<BoxProps> = ({
  children,
  isSelected,
  count,
  onClick,
  disabled,
  image,
}) => {
  return (
    <div className={`box-panel`} onClick={onClick}>
      {
        <div
          className={`box-pixel-panel ${isSelected && "box-active"} ${
            disabled && "box-disabled"
          }`}
        >
          {count && <span className={`box-count`}>{count}</span>}
          {children}
          {image && <img src={image} className="box-item" />}
          {isSelected && <img className="select-box" src={selectBox} />}
        </div>
      }

      {/* <img id="panel-left-edge" src={leftEdge} />
      <img id="panel-right-edge" src={rightEdge} />
      <img id="panel-bottom-edge" src={bottomEdge} />
      <img id="panel-top-edge" src={topEdge} />
      <img id="panel-top-left" src={topLeft} />
      <img id="panel-bottom-left" src={bottomLeft} />
      <img id="panel-bottom-right" src={bottomRight} />
      <img id="panel-top-right" src={topRight} /> */}
    </div>
  );
};
