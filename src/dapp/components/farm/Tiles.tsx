import React from "react";

import flower1 from "../../images/decorations/flower1.png";
import rock1 from "../../images/decorations/rock2.png";
import rock2 from "../../images/decorations/rock3.png";
import grassLeaves1 from "../../images/decorations/grassLeaves1.png";
import grassLeaves2 from "../../images/decorations/grassLeaves2.png";

interface Props {}

const fields = [1, 4, 6, 10, 13, 15];

// Repeated decorations to
const DecorationFiller = () => (
  <>
    {fields.map((position, index) => (
      <>
        <div
          style={{
            gridColumn: `${position}/${position + 1}`,
            gridRow: `${index + 3}/${index + 4}`,
          }}
        >
          <img className="flowers" src={flower1} />
        </div>

        <div
          style={{
            gridColumn: `${position + 1}/${position + 2}`,
            gridRow: `${index + 6}/${index + 7}`,
          }}
        >
          <img className="flowers" src={grassLeaves1} />
        </div>

        <div
          style={{
            gridColumn: `${position}/${position + 1}`,
            gridRow: `${index + 5}/${index + 6}`,
          }}
        >
          <img className="leaves" src={grassLeaves2} />
        </div>

        <div
          style={{
            gridColumn: `${position + 1}/${position + 2}`,
            gridRow: `${index + 8}/${index + 9}`,
          }}
        >
          <img className="leaves" src={grassLeaves1} />
        </div>

        <div
          style={{
            gridColumn: `${position}/${position + 1}`,
            gridRow: `${index + 11}/${index + 12}`,
          }}
        >
          <img className="rock1" src={rock1} />
        </div>

        <div
          style={{
            gridColumn: `${position + 1}/${position + 2}`,
            gridRow: `${index + 13}/${index + 14}`,
          }}
        >
          <img className="rock1" src={rock2} />
        </div>
      </>
    ))}
  </>
);
export const Tiles: React.FC<Props> = () => {
  return (
    <>  
      {/* StoneFence */}
      <div
        className="top-corner2"
        style={{ gridColumn: "1", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "2", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "3", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "4", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "5", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "6", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "7", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "8", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "9", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "10", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "11", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "12", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "13", gridRow: "2" }}
      />
      
      <div
        className="top-edge"
        style={{ gridColumn: "15", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "16", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "17", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "18", gridRow: "2" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "19", gridRow: "2" }}
      />
      <div
        className="top-corner"
        style={{ gridColumn: "20", gridRow: "2" }}
      />

      {/* Bottom Stone Fence */}
      <div
        className="bottom-corner2"
        style={{ gridColumn: "20", gridRow: "14" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "13" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "12" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "11" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "10" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "9" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "8" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "7" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "6" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "5" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "4" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "20", gridRow: "3" }}
      />

      {/* Bottom Stone fence */}
      <div
        className="bottom-corner"
        style={{ gridColumn: "1", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "2", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "3", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "4", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "5", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "6", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "7", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "8", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "9", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "10", gridRow: "14" }}
      />
      
      <div
        className="bottom-edge"
        style={{ gridColumn: "12", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "13", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "14", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "15", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "16", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "17", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "18", gridRow: "14" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "19", gridRow: "14" }}
      />
      
      {/* Left Stone fence */}
      <div
        className="left-edge"
        style={{ gridColumn: "1", gridRow: "3" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "1", gridRow: "4" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "1", gridRow: "5" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "1", gridRow: "7" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "1", gridRow: "8" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "1", gridRow: "9" }}
      />

      <div
        className="left-edge"
        style={{ gridColumn: "1", gridRow: "11" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "1", gridRow: "12" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "1", gridRow: "13" }}
      />

      {/* Stone Tile */}
      <div
        className="stone"
        style={{ gridColumn: "2", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "3", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "4", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "5", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "6", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "7", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "8", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "9", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "10", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "11", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "12", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "13", gridRow: "3" }}
      />
      
      <div
        className="stone"
        style={{ gridColumn: "15", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "16", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "17", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "18", gridRow: "3" }}
      />
      <div
        className="stone"
        style={{ gridColumn: "19", gridRow: "3" }}
      />

      {/* Wood Fence */}
      <div
        className="wood-line"
        style={{ gridColumn: "2", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "3", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "4", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "5", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "6", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "7", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "8", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "9", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "10", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "11", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "12", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "13", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "15", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "16", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "17", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "18", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "19", gridRow: "3" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "2", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "3", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "4", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "5", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "6", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "2", gridRow: "11" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "3", gridRow: "11" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "4", gridRow: "11" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "5", gridRow: "11" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "6", gridRow: "11" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "11", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "12", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "13", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "14", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "15", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "16", gridRow: "7" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "12", gridRow: "11" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "13", gridRow: "11" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "14", gridRow: "11" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "15", gridRow: "11" }}
      />
      <div
        className="wood-line"
        style={{ gridColumn: "16", gridRow: "11" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "2", gridRow: "3" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "5", gridRow: "3" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "8", gridRow: "3" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "11", gridRow: "3" }}
      />
      <div
        className="wood-end"
        style={{ gridColumn: "13", gridRow: "3" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "15", gridRow: "3" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "17", gridRow: "3" }}
      />
      <div
        className="wood-end"
        style={{ gridColumn: "19", gridRow: "3" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "2", gridRow: "7" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "5", gridRow: "7" }}
      />
      <div
        className="wood-end"
        style={{ gridColumn: "6", gridRow: "7" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "2", gridRow: "11" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "5", gridRow: "11" }}
      />
      <div
        className="wood-end"
        style={{ gridColumn: "6", gridRow: "11" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "11", gridRow: "7" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "14", gridRow: "7" }}
      />
      <div
        className="wood-end"
        style={{ gridColumn: "16", gridRow: "7" }}
      />
      <div
        className="wood-start"
        style={{ gridColumn: "12", gridRow: "11" }}
      />
      <div
        className="wood-end"
        style={{ gridColumn: "14", gridRow: "11" }}
      />
      <div
        className="wood-end"
        style={{ gridColumn: "16", gridRow: "11" }}
      />
    </>
  );
};
