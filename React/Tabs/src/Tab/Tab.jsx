import React from "react";

export default function Tab({ text, show }) {
  if (!show) return null;
  return <p>{text}</p>;
}
