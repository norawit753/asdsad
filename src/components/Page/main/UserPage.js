import React, { useState, useEffect, Fragment } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
  TabPane,
  Container,
  Table,
  Button,
} from "reactstrap";
import classnames from "classnames";
import { connect, useSelector } from "react-redux";
import { Route, Switch, Link, useLocation } from "react-router-dom";

const UserPage = (props) => {
  return (
    <Fragment>
      <Container>
        <Switch>
          <Route exact path="/users">
            <br />
          </Route>
        </Switch>
      </Container>
    </Fragment>
  );
};

export default connect(null, null)(UserPage);
