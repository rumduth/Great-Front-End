import { useEffect, useState } from "react";

function PageButton({ isCurrent = false, onClick }) {
  return (
    <span onClick={onClick} className={`${isCurrent ? "active-btn" : ""}`} />
  );
}

export default function ImageCarousel({
  images = [],
  width = 600,
  height = 400,
}) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const numImages = images.length;

  useEffect(() => {
    images.forEach((image) => {
      const preload = new Image();
      preload.src = image.src;
    });
  }, [images]);

  function handleShowNextImage() {
    setCurrentImageIdx((prev) => (prev + 1) % numImages);
  }
  function handleShowPrevImage() {
    setCurrentImageIdx((prev) => (prev - 1 + numImages) % numImages);
  }
  function handleClickPageButton(idx) {
    setCurrentImageIdx(idx);
  }

  if (images.length === 0) return <div>There is no images</div>;
  return (
    <div
      className="carousel-container"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <button onClick={handleShowPrevImage} className="btn-large prevBtn">
        {"<"}
      </button>
      <button onClick={handleShowNextImage} className="btn-large nextBtn">
        {`>`}
      </button>
      <img
        src={images[currentImageIdx].src}
        alt={images[currentImageIdx].alt}
      />

      <div className="page-buttons-group">
        {Array.from({ length: numImages }, (_, idx) => (
          <PageButton
            key={idx}
            isCurrent={idx === currentImageIdx}
            onClick={() => handleClickPageButton(idx)}
          />
        ))}
      </div>
    </div>
  );
}
