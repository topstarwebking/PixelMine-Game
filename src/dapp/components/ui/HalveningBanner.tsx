import React, { useState } from "react";

import alert from "../../images/ui/expression_alerted.png";
import closeIcon from "../../images/ui/close.png";

import "./Banner.css";

export const Banner: React.FC = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <div id="halvening-banner">
      <img src={alert} />
      <div>
        <span>
          When total supply reaches 1 Million, crop and upgrade prices will be
          divided by 1/5. Be prepared!
        </span>
      </div>
      <img src={closeIcon} id="banner-close" onClick={() => setShow(false)} />
    </div>
  );
};
