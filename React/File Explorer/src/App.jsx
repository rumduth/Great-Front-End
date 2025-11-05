import "./App.css";
import FileExplorer from "./FileExplorer/FileExplorer";
import { data } from "./data/data";
function App() {
  return <FileExplorer tree={data} />;
}

export default App;
