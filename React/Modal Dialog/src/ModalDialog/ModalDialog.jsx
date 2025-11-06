import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./ModalDialog.module.css";
const ModalContext = createContext();

const useModal = function () {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Wrong context Modal");
  return ctx;
};

const Title = function ({ children }) {
  return <h1>{children}</h1>;
};

const Body = function ({ children }) {
  return <p>{children}</p>;
};

const OpenButton = function ({ children = "Show modal" }) {
  const { handleToggleContent } = useModal();
  return (
    <button onClick={handleToggleContent} className={styles.modal__button}>
      {children}
    </button>
  );
};

const CloseButton = function ({ children = "Close" }) {
  const { handleToggleContent } = useModal();
  return (
    <button onClick={handleToggleContent} className={styles.modal__button}>
      {children}
    </button>
  );
};

const Container = function ({ children }) {
  const { isShowed, handleToggleContent } = useModal();

  useEffect(() => {
    if (!isShowed) return;
    const onEsc = (e) => e.key === "Escape" && handleToggleContent();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [handleToggleContent, isShowed]);

  if (isShowed)
    return (
      <div className={styles.modal__background} onClick={handleToggleContent}>
        <div
          className={styles.modal__container}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  return null;
};

export default function ModalDialog({ children }) {
  const [isShowed, setIsShowed] = useState(false);

  const handleToggleContent = useCallback(function () {
    setIsShowed((prev) => !prev);
  }, []);
  const value = { isShowed, handleToggleContent };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

ModalDialog.Title = Title;
ModalDialog.Body = Body;
ModalDialog.OpenButton = OpenButton;
ModalDialog.CloseButton = CloseButton;
ModalDialog.Container = Container;
