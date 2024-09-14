import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';
import TablePagination from './components/Pagination/Pagination';

import './CountriesTable.css';

const CountriesTable = ({ isLoading, data }) => {

  if (isLoading) {
    return <p>Loading...</p>
  }

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Country Name',
      },
      {
        accessorKey: 'abbreviation',
        header: 'Code',
      },
      {
        accessorKey: 'capital',
        header: 'Capital',
      },
      {
        accessorKey: 'phone',
        header: 'Ph Code',
      },
      {
        accessorKey: 'population',
        header: 'Population',
      },
      {
        accessorKey: 'media.flag',
        header: 'Flag',
        cell: info => <img src={info.getValue()} alt="flag" style={{ height: '30px' }} />,
      },
      {
        accessorKey: 'media.emblem',
        header: 'Emblem',
        cell: info => <img src={info.getValue()} alt="emblem" style={{ height: '30px' }} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div>
      {/* Table rendering */}
      <table className='countries-table'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <TablePagination table={table} />
    </div>
  );
};

export default CountriesTable;
