
import './App.css'
import StarRating from './StarRating/StarRating'

function App() {

  return (
   <>
    <StarRating numStars={10} filled={8}/>
    <StarRating/>
    <StarRating numStars={8} filled={8}/></>
  )
}

export default App
