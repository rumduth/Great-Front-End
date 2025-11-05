import { useCallback, useEffect, useState, memo } from "react";

const File = memo(function ({ item, marginLeft }) {
  const [showChildren, setShowChildren] = useState(false);
  const handleToggleShowChildren = useCallback(function () {
    setShowChildren((prev) => !prev);
  }, []);
  if (!item.children)
    return <div style={{ marginLeft: `${marginLeft}px`, fontSize: '1rem' }}>{item.name}</div>;
  return (
    <div>
      <h4 style={{ marginLeft: `${marginLeft}px`, cursor: 'pointer' }}  onClick={handleToggleShowChildren}>
        {item.name}{" "}
        <span>
          [{showChildren ? "-" : "+"}]
        </span>
      </h4>
      {showChildren &&
        item.children.map((item) => (
          <File item={item} key={item.id} marginLeft={marginLeft + 16} />
        ))}
    </div>
  );
});

export default function FileExplorer({ tree: data = [] }) {
  const [tree, setTree] = useState([]);
  useEffect(() => {
    let sortedTree = structuredClone(data);
    const sortedFunc = (a, b) => {
      const isDirA = !!a.children;
      const isDirB = !!b.children;
      if (isDirA !== isDirB) return isDirA ? -1 : 1;
      return a.name.localeCompare(b.name);
    };
    const dfs = (current) => {
      current.sort(sortedFunc);
      for (let item of current) {
        if (item.children) dfs(item.children);
      }
    };
    dfs(sortedTree);
    setTree(sortedTree);
  }, [data]);

  return (
    <div className="files-container">
      {tree.map((item) => (
        <File item={item} key={item.id} marginLeft={0} />
      ))}
    </div>
  );
}
