import React, { useState, useEffect, Fragment, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Container, Table } from "reactstrap";
import { withRouter } from "react-router-dom";

const ResearchEditPage = (props) => {
  const user = useSelector((state) => state.main.auth.user);
  const detail = useSelector((state) => state.research.list.detail);

  useEffect(() => {
    if (!detail) {
      props.history.push("/research");
    }
    if (detail && user) {
      if (detail[0].buasri_id === user.buasri_id) {
        props.history.push("/research");
      }
    }
  }, [detail]);

  return (
    <Fragment>
      {detail ? (
        <Container>
          <p>Edit Page</p>
        </Container>
      ) : null}
    </Fragment>
  );
};

export default withRouter(connect(null, null)(ResearchEditPage));
