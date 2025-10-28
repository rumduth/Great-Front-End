import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";
export default function ProgressBar() {
  const [percentage, setPercentage] = useState(0);
  useEffect(function () {
    let frame;
    const duration = 2000;
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min((elapsed / duration) * 100, 100);
      if (elapsed < duration) frame = requestAnimationFrame(animate);
      setPercentage(progress);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <div className={styles.bar} style={{ width: `${percentage}%` }}></div>;
}
