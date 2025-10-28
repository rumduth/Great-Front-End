import { useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import "./App.css";
function App() {
  const [bars, setBars] = useState([]);
  function handleAddBar() {
    let barId = Math.random().toFixed(6).toString();
    setBars((prev) => [...prev, barId]);
  }

  return (
    <div>
      <button className="btn__add" onClick={handleAddBar}>
        Add
      </button>
      <div className="bars__list">
        {bars.map((bar) => (
          <ProgressBar key={bar} />
        ))}
      </div>
    </div>
  );
}

export default App;
