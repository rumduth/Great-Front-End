import styles from "./Button.module.css";
export default function Button({ text, onClick, show }) {
  let extraStyles = {};
  if (show)
    extraStyles = {
      backgroundColor: "purple",
      color: "white",
    };
  return (
    <button onClick={onClick} className={styles.btn} style={extraStyles}>
      {text}
    </button>
  );
}
