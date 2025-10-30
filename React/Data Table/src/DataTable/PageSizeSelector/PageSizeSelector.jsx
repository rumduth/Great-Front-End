import React from "react";

export default function PageSizeSelector({ pageSizes, onChange }) {
  return (
    <select onChange={onChange}>
      {pageSizes.map((p) => (
        <option key={p} value={p}>
          Show {p}
        </option>
      ))}
    </select>
  );
}
