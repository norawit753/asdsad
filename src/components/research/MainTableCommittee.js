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

const MainTableCommittee = (props) => {
  // Main
  const Token = useSelector((state) => state.main.auth.token);
  const data = useSelector((state) => state.research.list.list);

  const dispatch = useDispatch();

  const onClick = async (e) => {};

  return (
    <Fragment>
      <br />
      <br />
      Committee
    </Fragment>
  );
};

export default connect(null, null)(MainTableCommittee);
