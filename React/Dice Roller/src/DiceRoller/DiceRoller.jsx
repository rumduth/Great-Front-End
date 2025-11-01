import { useState } from "react";
import Dice from "./Dice/Dice";
import styles from "./DiceRoller.module.css";
export default function DiceRoller() {
  const [boardKey, setBoardKey] = useState(0);
  const [numDices, setNumDices] = useState(0);

  function handleClickRollBtn(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const num = +fd.get("inp");

    if (num >= 1 && num <= 12) {
      setBoardKey((prev) => prev + 1);
      setNumDices(num);
    }
  }

  return (
    <div className={styles.box}>
      <p>Number of dice</p>
      <form onSubmit={handleClickRollBtn} className={styles.form}>
        <input
          type="number"
          min="1"
          max="12"
          defaultValue={1}
          required
          name="inp"
        />
        <button>Roll</button>
      </form>
      {numDices > 0 && (
        <main key={boardKey} className={styles.board}>
          {Array.from({ length: numDices }, (_, idx) => (
            <Dice key={idx} />
          ))}
        </main>
      )}
    </div>
  );
}
