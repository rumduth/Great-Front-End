import { useState } from "react";
import Tab from "./Tab/Tab";
import Button from "./Button/Button";
import "./App.css";
const defaultContent = [
  {
    id: 1,
    title: "HTML",
    text: `The HyperText Markup Language or HTML is the
          standard markup language for documents designed to
          be displayed in a web browser.`,
  },
  {
    id: 2,
    title: "CSS",
    text: `Cascading Style Sheets is a style sheet language
          used for describing the presentation of a document
          written in a markup language such as HTML or XML.`,
  },
  {
    id: 3,
    title: "JavaScript",
    text: `JavaScript, often abbreviated as JS, is a
          programming language that is one of the core
          technologies of the World Wide Web, alongside HTML
          and CSS.`,
  },
];

function App() {
  const [content] = useState(defaultContent);
  const [showContent, setShowContent] = useState(1);
  function handleSwitchTab(id) {
    setShowContent(id);
  }
  return (
    <>
      <div className="btns__group">
        {content.map((c) => (
          <Button
            key={c.id}
            text={c.title}
            onClick={() => handleSwitchTab(c.id)}
            show={showContent === c.id}
          />
        ))}
      </div>
      <div>
        {content.map((c) => (
          <Tab key={c.id} text={c.text} show={showContent === c.id} />
        ))}
      </div>
    </>
  );
}

export default App;
