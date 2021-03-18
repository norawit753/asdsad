import React, { useState, useMemo, Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Table, Label, Button, Pagination, PaginationLink } from "reactstrap";

import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";
import { withRouter } from "react-router-dom";

const MainTableUser = (props) => {
  // Main
  const Token = useSelector((state) => state.main.auth.token);
  const data = useSelector((state) => state.research.list.list);

  const dispatch = useDispatch();

  const onClick = async (e) => {};

  const columns = React.useMemo(
    () => [
      { Header: "ชื่องานวิจัย", accessor: "name" },
      { Header: "สถานะ", accessor: "status" },
      {
        Header: "รายละเอียด",
        accessor: "_id",
        Cell: ({ cell }) => (
          <Button
            value={[cell.row.values._id, cell.row.values.buasri_id]}
            onClick={onClick}
          >
            รายละเอียด
          </Button>
        ),
      },
    ],
    []
  );

  // Define a default UI for filtering
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);

    return (
      <span>
        Search:{" "}
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: "1.1rem",
            border: "0",
          }}
        />
      </span>
    );
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    state: { pageIndex, pageSize },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <Fragment>
      <br />
      <br />
      <Table>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
      </Table>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default connect(null, null)(MainTableUser);
