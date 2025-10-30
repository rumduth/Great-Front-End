import { useState } from "react";
import Table from "./Table/Table";
import PageSizeSelector from "./PageSizeSelector/PageSizeSelector";
import SwitchingButtons from "./SwitchingButtons/SwitchingButtons";

export default function DataTable({ data, pageSizes }) {
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMoveToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handleMoveToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  const headers = Object.keys(data[0]).map(
    (t) => t[0].toUpperCase() + t.slice(1).toLowerCase()
  );

  const totalPages = Math.ceil(data.length / pageSize);

  const showedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Table data={showedData} headers={headers} />
      <hr />
      <PageSizeSelector pageSizes={pageSizes} onChange={handleChangePageSize} />
      <SwitchingButtons
        currentPage={currentPage}
        maxPage={totalPages}
        onNextPage={handleMoveToNextPage}
        onPrevPage={handleMoveToPrevPage}
      />
    </>
  );
}
