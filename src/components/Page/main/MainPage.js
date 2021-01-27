import React, { Fragment } from "react";
import { connect, useSelector } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import { Route, Switch } from "react-router-dom";

// Main
import Login from "../../main/Login";
import UserPage from "./UserPage";
import CardComplaint from "../../complaint/Card";

// Complaint
import ComplaintPage from "../complaint/MainPage";

const MainPage = (props) => {
  const checkToken = useSelector((state) => state.main.auth.token);

  return (
    <Fragment>
      {checkToken ? (
        <Switch>
          <Route exact path="/">
            <Container>
              <Row xs="1" sm="2" md="3">
                <Col>
                  <CardComplaint />
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </Container>
          </Route>
          <Route path="/users" component={UserPage} />
          <Route path="/complaint" component={ComplaintPage} />
        </Switch>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default connect(null, null)(MainPage);
