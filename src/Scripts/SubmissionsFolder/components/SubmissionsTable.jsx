/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import PropTypes from 'prop-types';
import { Card } from '@material-tailwind/react';
import { FaSearch, FaSortUp, FaSortDown, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

function InputGroup({ value, onChange }) {
  return (
    <div className="flex items-center w-full bg-white shadow-md rounded-lg">
      <FaSearch className="mx-3 text-twilight-300" />
      <input
        value={value || ''}
        onChange={onChange}
        placeholder="Search"
        className="w-full p-3 text-twilight-500 rounded-r-lg focus:outline-none"
      />
    </div>
  );
}

InputGroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function SubmissionsTable({ SubmissionsDetails }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 5;

  const columns = useMemo(() => [
    { Header: 'Id Problem', accessor: 'problem_id' },
    {
      Header: 'Title', accessor: 'problem_title',
      Cell: ({ value, row }) => (
        <Link to={`/problems/${row.values.problem_id}`}
          className="text-twilight-500 hover:underline hover:cursor-pointer"
        >{value}</Link>
      )
    },
    { Header: 'Programming Language', accessor: 'programming_language' },
    { Header: 'Memory', accessor: 'memory', Cell: ({ value }) => `${value} MB` },
    { Header: 'RunTime', accessor: 'runtime', Cell: ({ value }) => `${value} ms` },
    { Header: 'Timestamp', accessor: 'timestamp' },
    { Header: '', accessor: 'expandIcon', disableSortBy: true },
  ], []);

  const data = useMemo(() => SubmissionsDetails.map(submission => ({
    ...submission,
    expandIcon: null,
  })), [SubmissionsDetails]);

  const toggleRow = (rowId) => {
    setExpandedRow(prevRowId => (prevRowId === rowId ? null : rowId));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [currentPage, data, itemsPerPage]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    rows,
  } = useTable(
    { columns, data: paginatedData },
    useGlobalFilter,
    useSortBy,
  );

  return (
<div className="overflow-x-auto">
  <div className="flex justify-between mb-4">
    <InputGroup value={state.globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
  </div>

  <Card className="h-full w-full p-4">

    <div className="overflow-x-auto">
      <table {...getTableProps()} className="w-full table-auto text-left">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())} className="p-4 border-b">
                  <div className="flex items-center">
                    {column.render('Header')}
                    <div className="ml-2">
                      {column.isSorted ? (column.isSortedDesc ? <FaSortDown /> : <FaSortUp />) : ''}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const isExpanded = expandedRow === row.id;
            return (
              <React.Fragment key={row.id}>
                <tr {...row.getRowProps()} className={isExpanded ? "bg-twilight-100/10 hover:bg-twilight-100/10" : "hover:bg-twilight-100/10"}>
                  {row.cells.map((cell, index) => (
                    <td key={cell.column.id} {...cell.getCellProps()} className="p-4">
                      {index === row.cells.length - 1 && (
                        <span onClick={() => toggleRow(row.id)} style={{ cursor: 'pointer' }}>
                          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      )}
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={columns.length}>
                      <div className="">
                        <pre className="bg-gray-100 p-4 rounded-lg mt-4">{row.original.submission}</pre>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>

  </Card>

  <div className="mt-4">
    <Pagination
      currentPage={currentPage}
      totalPages={Math.ceil(data.length / itemsPerPage)}
      onPageChange={handlePageChange}
    />
  </div>
</div>


  );
}

SubmissionsTable.propTypes = {
  SubmissionsDetails: PropTypes.array.isRequired,
};

SubmissionsTable.defaultProps = {
  SubmissionsDetails: [],
};

export default SubmissionsTable;
