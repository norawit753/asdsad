import React, { Fragment, useMemo, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Container, Col, Row, Fade } from "reactstrap";
import { Route, Switch } from "react-router-dom";

// Main
import Login from "../../main/Login";
import UserPage from "./UserPage";
import CardComplaint from "../../complaint/Card";
import CardResearch from "../../research/Card";

import PropTypes from "prop-types";

// GetServiceActive
import { getServiceForUserPage } from "../../../actions/main/serviceAction";

// Complaint
import ComplaintPage from "../complaint/MainPage";
import ResearchPage from "../research/MainPage";
// import { faIgloo } from "@fortawesome/free-solid-svg-icons";

const MainPage = (props) => {
  const checkToken = useSelector((state) => state.main.auth.token);
  const user = useSelector((state) => state.main.auth.user);
  const checkService = useSelector((state) => state.main.auth.service);
  const [LoadService, setLoadService] = useState(true);
  const [fadeIn] = useState(true);

  MainPage.propTypes = {
    getServiceForUserPage: PropTypes.func.isRequired,
  };
  const { getServiceForUserPage } = props;

  useMemo(() => {
    if (LoadService) {
      const getUService = async () => {
        if (user) {
          if (user.buasri_id) {
            const sendData = await {
              token: checkToken,
              buasri_id: user.buasri_id,
            };
            await getServiceForUserPage(sendData);
          }
        }
      };
      getUService();
      setLoadService(false);
    }
    // eslint-disable-next-line
  }, [LoadService]);
  return (
    <Fragment>
      {checkToken ? (
        <Switch>
          <Route exact path="/">
            <Container>
              <Row xs="1" sm="2" md="3">
                <Col>
                  <Fade in={fadeIn}>
                    <CardComplaint />
                  </Fade>
                </Col>
                {checkService.e_research ? (
                  checkService.e_research.active === "ACTIVE" ? (
                    <Fade in={fadeIn}>
                      <CardResearch />
                    </Fade>
                  ) : null
                ) : null}
              </Row>
            </Container>
          </Route>
          <Route path="/users" component={UserPage} />
          <Route path="/complaint" component={ComplaintPage} />
          <Route path="/research" component={ResearchPage} />
        </Switch>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default connect(null, { getServiceForUserPage })(MainPage);
