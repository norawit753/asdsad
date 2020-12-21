import React, { useState, useMemo, Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import { withRouter } from "react-router-dom";

import { getdetail_list } from "../../actions/complaint/listAction";
const MainTableAdmin = (props) => {
  // Complaint
  const data = useSelector((state) => state.complaint.list.list);
  const token = useSelector((state) => state.complaint.auth.token);

  MainTableAdmin.propTypes = {
    getdetail_list: PropTypes.func.isRequired,
  };

  const { getdetail_list } = props;
  const onClick = async (e) => {
    const getValue = await e.target.value.split(",");
    const Detail = await {
      token: token,
      id: getValue[0],
      buasri_id: getValue[1],
    };
    getdetail_list(Detail);
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Buasri ID",
        accessor: "buasri_id",
      },
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

export default withRouter(connect(null, { getdetail_list })(MainTableAdmin));
