import styles from "./SwitchingButtons.module.css";
export default function SwitchingButtons({
  currentPage,
  maxPage,
  onNextPage,
  onPrevPage,
}) {
  return (
    <span className={styles.btn}>
      <button disabled={currentPage == 1} onClick={onPrevPage}>
        Prev
      </button>
      Page {currentPage} of {maxPage}
      <button disabled={currentPage === maxPage} onClick={onNextPage}>
        Next
      </button>
    </span>
  );
}
