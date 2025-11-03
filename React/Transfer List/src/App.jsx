
import './App.css'
import TransferList from './TransferList/TransferList'

function App() {
  return (
   <TransferList leftSides={["HTML", "Javascript", "CSS", "Typescript"]} rightSides={["React", "Angular", "Vue", "Svelte"]}/>
  )
}

export default App
