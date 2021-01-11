import React, { useState, useMemo, Fragment, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Row,
  Table,
  Label,
  Button,
  Pagination,
  PaginationLink,
} from "reactstrap";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";

import depJSON from "../../../utilis/typedep.json";
import userJSON from "../../../utilis/typeuser.json";

const AdminTable = (props) => {
  const list = useSelector((state) => state.main.list.userlist);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (list) {
      setData(list);
    }
  }, [list]);

  const onClick = async (e) => {
    const getValue = await e.target.value.split(",");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Buasri ID",
        accessor: "buasri_id",
      },
      {
        Header: "ชื่อ - นามสกุล",
        accessor: (cell) => `${cell.firstname} ${cell.lastname}`,
      },
      {
        Header: "ประเภทผู้ใช้",
        accessor: "type",
        Cell: ({ cell }) => (
          <Fragment>
            {userJSON.map((usermap) => {
              if (usermap.type === cell.row.values.type) {
                return <span>{usermap.name}</span>;
              }
            })}
          </Fragment>
        ),
      },
      {
        Header: "สังกัด",
        accessor: "dep",
        Cell: ({ cell }) => (
          <Fragment>
            {depJSON.map((depmap) => {
              if (depmap.currentNameEN === cell.row.values.dep) {
                return <span>{depmap.currentNameTH}</span>;
              }
            })}
          </Fragment>
        ),
      },
      {
        Header: "เลือก",
        accessor: "_id",
        Cell: ({ cell }) => (
          <Button
            value={[cell.row.values._id, cell.row.values.buasri_id]}
            onClick={onClick}
          >
            คลิก
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
      <Row>
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
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
      </Row>
    </Fragment>
  );
};

export default connect(null, null)(AdminTable);
