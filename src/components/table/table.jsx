import React, { useState } from 'react';
import Pagination from '../pagination/pagination';
import './table.css';

const Table = ({ data, columns, initialRowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [selectedRows, setSelectedRows] = useState([]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const toggleRowSelection = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row)
        ? prev.filter((selected) => selected !== row)
        : [...prev, row]
    );
  };

  const toggleSelectAll = (isChecked) => {
    if (isChecked) {
      const allCurrentRows = paginatedData.filter(
        (row) => !selectedRows.includes(row)
      );
      setSelectedRows((prev) => [...prev, ...allCurrentRows]);
    } else {
      setSelectedRows((prev) =>
        prev.filter((row) => !paginatedData.includes(row))
      );
    }
  };

  const areAllRowsSelected = paginatedData.every((row) =>
    selectedRows.includes(row)
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={areAllRowsSelected}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </th>
            {columns.map((column) => (
              <th key={column.dataKey}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => toggleRowSelection(row)}
                />
              </td>
              {columns.map((column) => (
                <td key={column.dataKey}>
                  {column.render
                    ? column.render(row[column.dataKey], row)
                    : row[column.dataKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={data.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        onRowsPerPageChange={(rows) => {
          setRowsPerPage(rows);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default Table;
