import React, { memo } from "react";
import Button from "../../../Buttons/Button";

import "./Pagination.css";

const PaginationButton = memo(({ onClick, disabled, label, ariaLabel }) => (
  <Button
    variant="primary"
    onClick={onClick}
    disabled={disabled}
    label={label}
    aria-label={ariaLabel || label}
  />
));

const TablePagination = ({ table }) => {
  const { pageIndex, pageSize } = table.getState().pagination;

  const pageCount = table.getPageCount();
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  return (
    <div className="table-pagination-container">
      <p className="table-pagination-total">Total: {table.getRowCount()}</p>
      <div>
        <nav className="pagination-controls" aria-label="Pagination Navigation">
          <PaginationButton
            onClick={table.firstPage}
            disabled={!canPreviousPage}
            label="<<"
            ariaLabel="First Page"
          />
          <PaginationButton
            onClick={table.previousPage}
            disabled={!canPreviousPage}
            label="Previous"
            ariaLabel="Previous Page"
          />

          <span className="pagination-status">
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <strong>{pageCount}</strong>
          </span>

          <PaginationButton
            onClick={table.nextPage}
            disabled={!canNextPage}
            label="Next"
            ariaLabel="Next Page"
          />
          <PaginationButton
            onClick={table.lastPage}
            disabled={!canNextPage}
            label=">>"
            ariaLabel="Last Page"
          />
        </nav>
        <div className="pagination-page-size">
          <label htmlFor="page-size-selector">
            Show{" "}
            <select
              id="page-size-selector"
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>{" "}
            rows per page
          </label>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
