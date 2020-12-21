import React, { useState, useMemo, Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import { useTable } from "react-table";

const MainTableUser = (props) => {
  // Complaint
  //   const complaintUser = useSelector((state) => state.complaint.auth.user);
  const data = useSelector((state) => state.complaint.list.list);

  const onClick = async (e) => {
    console.log(e.value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ประเภท",
        accessor: "type",
      },
      {
        Header: "หัวข้อ",
        accessor: "topic",
      },
      { Header: "สถานะ", accessor: "status.status" },
      {
        Header: "รายละเอียด",
        accessor: "_id",
        Cell: ({ cell }) => (
          <Button value={cell.row.values._id} onClick={onClick}>
            รายละเอียด
          </Button>
        ),
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });
  return (
    <Fragment>
      <br />
      <br />
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
