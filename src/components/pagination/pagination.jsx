import React from "react";
import "./pagination.css";

const Pagination = ({
  totalItems,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(totalItems, currentPage * rowsPerPage);

  return (
    <div className="pagination">
      <select
        className="rows-per-page"
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
      >
        {[10, 20, 50, 100].map((rows) => (
          <option key={rows} value={rows}>
            {rows}
          </option>
        ))}
      </select>

      <p className="pagination-info">
        {startItem}-{endItem} of {totalItems}
      </p>

      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
      {"<<"}
      </button>
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
       {"<"}
      </button>
      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">"}
      </button>
      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
      {">>"}
      </button>
    </div>
  );
};

export default Pagination;
