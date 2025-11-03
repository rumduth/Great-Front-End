import { images } from "./images";
import "./App.css";
import ImageCarousel from "./ImageCarousel/ImageCarousel";

function App() {
  return <ImageCarousel images={images} width={600} height={400} />;
}

export default App;
