const formatted = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

import styles from "./JobItem.module.css";

export default function JobItem({ news }) {
  return (
    <div className={styles.box}>
      <h3>{news.title}</h3>
      <p>
        By {news.by} - {formatted(news.time)}
      </p>
    </div>
  );
}
