import { useState } from "react";
import HeartIcon from "../Icons/HeartIcon";
import SpinnerIcon from "../Icons/SpinnerIcon";

const URL = "https://questions.greatfrontend.com/api/questions/like-button";

function ButtonIcon({ isLoading, className = "" }) {
  if (isLoading) return <SpinnerIcon className={className} />;
  else return <HeartIcon className={className} />;
}

export default function LikeButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState("");

  async function handleClickButton() {
    let action = isLiked ? "unlike" : "like";
    try {
      setIsLoading(true);
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const { message } = await res.json();
      if (message === "Success!") {
        setIsLiked((prev) => !prev);
        setError("");
      } else throw new Error(message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <button
        onClick={handleClickButton}
        className={`like__button ${isLiked ? "isLiked" : ""}`}
        disabled={isLoading}
      >
        <ButtonIcon isLoading={isLoading} /> {isLiked ? "Liked" : "Like"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
