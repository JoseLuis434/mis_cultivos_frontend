import { useState } from "react";
import "./Graphic.css";

export function Graphic({color, percentValue = 0, value}) {
  return (
    <div className="graph">
        <span>{value}</span>
        <svg width="100%" height="100%">
          <circle className="graphicCircle" r="30%" cx="50%" cy="50%" pathLength="100" />
          <circle style={{stroke: color, strokeDasharray: `${percentValue} 100`}} className="graphicCircle percent" r="30%" cx="50%" cy="50%" pathLength="100" />
        </svg>
    </div>
  );
}
