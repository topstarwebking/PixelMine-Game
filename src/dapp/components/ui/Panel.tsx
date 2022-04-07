import React from "react";

import "./Panel.css";

import leftEdge from "../../images/ui/panel1/dt_box_9slice_lc.png";
import rightEdge from "../../images/ui/panel1/dt_box_9slice_rc.png";
import bottomEdge from "../../images/ui/panel1/dt_box_9slice_bc.png";
import topEdge from "../../images/ui/panel1/dt_box_9slice_tc.png";
import topLeft from "../../images/ui/panel1/dt_box_9slice_tl.png";
import bottomLeft from "../../images/ui/panel1/dt_box_9slice_bl.png";
import topRight from "../../images/ui/panel1/dt_box_9slice_tr.png";
import bottomRight from "../../images/ui/panel1/dt_box_9slice_br.png";
interface Props {
  hasInner?: boolean;
  hasOuter?: boolean;
  hasTabs?: boolean;
}
export const Panel: React.FC<Props> = ({ children, hasTabs }) => {
  // if (!hasOuter) {
  //   return (
  //     <div className="inner-pixel-panel">
  //       {children}
  //       <img id="panel-left-edge" src={leftEdgeInner} />
  //       <img id="panel-right-edge" src={rightEdgeInner} />
  //       <img id="panel-bottom-edge" src={bottomEdgeInner} />
  //       <img id="panel-top-edge" src={topEdgeInner} />
  //       <img id="panel-top-left" src={topLeftInner} />
  //       <img id="panel-bottom-left" src={bottomLeftInner} />
  //       <img id="panel-bottom-right" src={bottomRightInner} />
  //       <img id="panel-top-right" src={topRightInner} />
  //     </div>
  //   );
  // }

  return (
    <div className={`pixel-panel ${hasTabs && "panel-tabs"}`}>
      {/* {!hasInner && children}
      {hasInner && (
        <div className="inner-pixel-panel">
          {children}
          <img id="panel-left-edge" src={leftEdgeInner} />
          <img id="panel-right-edge" src={rightEdgeInner} />
          <img id="panel-bottom-edge" src={bottomEdgeInner} />
          <img id="panel-top-edge" src={topEdgeInner} />
          <img id="panel-top-left" src={topLeftInner} />
          <img id="panel-bottom-left" src={bottomLeftInner} />
          <img id="panel-bottom-right" src={bottomRightInner} />
          <img id="panel-top-right" src={topRightInner} />
        </div>
      )} */}
      <div id="panel-children">{children}</div>
      <img id="panel-left-edge" src={leftEdge} />
      <img id="panel-right-edge" src={rightEdge} />
      <img id="panel-bottom-edge" src={bottomEdge} />
      <img id="panel-top-edge" src={topEdge} />
      <img id="panel-top-left" src={topLeft} />
      <img id="panel-bottom-left" src={bottomLeft} />
      <img id="panel-bottom-right" src={bottomRight} />
      <img id="panel-top-right" src={topRight} />
    </div>
  );
};
