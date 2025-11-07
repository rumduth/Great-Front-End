import { useEffect, useState } from "react";

export default function TrafficLight({ direction = "row" }) {
  const [turn, setTurn] = useState(true);
  const [light, setLight] = useState("red");

  useEffect(
    function () {
      let timer;
      if (light === "red") timer = setTimeout(() => setLight("yellow"), 4000);
      if (light === "green") timer = setTimeout(() => setLight("yellow"), 3000);
      if (light === "yellow") {
        timer = setTimeout(function () {
          if (turn) setLight("green");
          else setLight("red");
          setTurn((prev) => !prev);
        }, 500);
      }

      return () => clearTimeout(timer);
    },
    [light, turn]
  );

  return (
    <div
      className="trafficlight__container"
      style={{ flexDirection: direction }}
    >
      <div className={`bulb ${light === "red" ? "red" : ""}`}></div>
      <div className={`bulb ${light === "yellow" ? "yellow" : ""}`}></div>
      <div className={`bulb ${light === "green" ? "green" : ""}`}></div>
    </div>
  );
}
