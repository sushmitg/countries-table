import React from 'react';
import Button from '../../../Buttons/Button';

import './Pagination.css';

const TablePagination = ({ table }) => {
  return (
    <div className='table-pagination-container'>
      <p>Total: {table.getRowCount()}</p>
      <div>
        <div className='pagination-controls'>
         
          <Button variant='primary' onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()} label="<<" />
          <Button variant='primary' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} label="Previous" />
         
          <span>
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>

          <Button variant='primary' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} label="Next" />
          <Button variant='primary' onClick={() => table.lastPage()} disabled={!table.getCanNextPage()} label=">>" />

        </div>
        <div>
          <label>
            Show{' '}
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>{' '}
            rows per page
          </label>
        </div>
      </div>
    </div>
  )
}


export default TablePagination;
