import React, { useMemo, Fragment } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

const MainPage = (props) => {
  // Main
  const user = useSelector((state) => state.main.auth.user);

  // Research

  return <Fragment></Fragment>;
};

export default connect(null, null)(MainPage);
