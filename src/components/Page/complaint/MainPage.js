import React, { useState, useMemo, Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Media,
  Fade,
  Container,
} from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

const MainPage = (props) => {
  const checkTokenComplaint = useSelector(
    (state) => state.complaint.auth.token
  );
  return (
    <Fragment>
      {checkTokenComplaint ? (
        <Container>
          <Row>
            <Col>
              <p>มี Token</p>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col>
              <p>ไม่มี Token</p>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default connect(null, null)(MainPage);
