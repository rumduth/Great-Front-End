import { useEffect, useState } from "react";
import JobItem from "./JobItem";
import styles from "./JobBoard.module.css";
const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export default function JobBoard() {
  const [newsID, setNewsID] = useState([]);
  const [news, setNews] = useState([]);
  const [numFetch, setNumFetch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getNewsID() {
      let response = await fetch(`${BASE_URL}/jobstories.json`);
      if (!response.ok) return;
      let ids = await response.json();
      setNewsID(ids);
    }
    getNewsID();
  }, []);

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;
      async function getNews() {
        try {
          setIsLoading(true);
          let start = numFetch * 6;
          let end = Math.min(start + 6, newsID.length);
          let jobsPromises = newsID.slice(start, end).map(async function (id) {
            let res = await fetch(`${BASE_URL}/item/${id}.json`, { signal });
            if (!res.ok) throw new Error("Failed");
            let data = await res.json();
            return data;
          });
          let data = (await Promise.allSettled(jobsPromises))
            .filter((el) => el.status === "fulfilled")
            .map((el) => el.value);
          setNews((prev) => [...prev, ...data]);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      getNews();

      return () => controller.abort();
    },
    [numFetch, newsID]
  );

  function getMoreNews() {
    setNumFetch((prev) => prev + 1);
  }

  if (news.length === 0) {
    return <div>Currently loading news...</div>;
  }

  return (
    <div className={styles.board}>
      <h1>Hacker News Jobs Board</h1>
      {news.map((n) => (
        <JobItem news={n} key={n.id} />
      ))}
      {numFetch * 6 < newsID.length && (
        <button onClick={getMoreNews} class={styles.btn}>
          {isLoading ? "Loading..." : "Load more jobs"}
        </button>
      )}
    </div>
  );
}
