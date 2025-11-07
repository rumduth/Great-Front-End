import "./App.css";
import TrafficLight from "./TrafficLight/TrafficLight";

function App() {
  return (
    <div className="app">
      <TrafficLight />
      <br />
      <TrafficLight direction="column" />
    </div>
  );
}

export default App;
