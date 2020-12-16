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
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { register } from "../../../actions/complaint/registerAction";
import FormButton from "../../complaint/FormButton";
import FormPage from "./FormPage";

const MainPage = (props) => {
  const user = useSelector((state) => state.main.auth.user);
  const dispatch = useDispatch();
  const checkTokenComplaint = useSelector(
    (state) => state.complaint.auth.token
  );

  MainPage.propTypes = {
    register: PropTypes.func.isRequired,
  };
  const { register } = props;

  const RegisterComplaint = (e) => {
    e.preventDefault();
    const newUser = {
      buasri_id: user.buasri_id,
      email: user.email,
      position: "USER",
      active: "ACTIVE",
    };
    register(newUser);
    dispatch({ type: "PAGE_LOADING" });
  };

  const GoMainPage = (e) => {
    e.preventDefault();
    dispatch({ type: "PAGE_LOADING" });
    props.history.push("/");
  };
  return (
    <Fragment>
      {checkTokenComplaint ? (
        <Container>
          <Switch>
            <Route exact path="/complaint">
              <FormButton />
            </Route>
            <Route path="/complaint/form" component={FormPage} />
          </Switch>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup>
                  <h2>สมัครใช้งานระบบร้องเรียน</h2>
                </FormGroup>
                <FormGroup>
                  <Label for="Detail">
                    เพื่อติดต่อการทำงานและตรวจสอบสถานะการร้องเรียน
                    ผู้ใช้งานจำเป็นต้องสมัครใช้งานระบบร้องเรียน <br />
                    กรุณาคลิก <b>ตกลง</b> เพื่อสมัครเข้าใช้งาน หรือคลิก{" "}
                    <b>ยกเลิก</b> เพื่อกลับหน้าหลัก
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Button onClick={RegisterComplaint} color="warning">
                    ตกลง
                  </Button>{" "}
                  <Button onClick={GoMainPage}>ยกเลิก</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default connect(null, { register })(MainPage);
