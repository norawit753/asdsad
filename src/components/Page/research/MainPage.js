import React, { useMemo, Fragment, useState } from "react";
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
import { register } from "../../../actions/research/registerAction";
import { auth_user } from "../../../actions/research/authAction";

import FormButton from "../../research/FormButton";
import FormPage from "../research/FormPage";
import BackMainPage from "../../main/BackMainPage";

const MainPage = (props) => {
  // Main
  const user = useSelector((state) => state.main.auth.user);
  const service = useSelector((state) => state.main.auth.service);
  const [Open, setOpen] = useState(true);

  // Research
  // const researchUser = useSelector((state) => state.research.auth.user);
  const checkTokenResearch = useSelector((state) => state.research.auth.token);

  const dispatch = useDispatch();

  MainPage.propTypes = {
    register: PropTypes.func.isRequired,
    auth_user: PropTypes.func.isRequired,
  };

  const { register, auth_user } = props;

  useMemo(() => {
    if (Open) {
      const opening = async () => {
        if (user.buasri_id) {
          const newUserResearch = await {
            buasri_id: user.buasri_id,
          };
          await auth_user(newUserResearch);
          await setOpen(false);
        }
      };
      opening();
    }
    // eslint-disable-next-line
  }, [Open]);

  const RegisterResearch = (e) => {
    e.preventDefault();
    const newUser = {
      buasri_id: user.buasri_id,
      email: user.email,
      position: service.e_research.position,
    };
    register(newUser);
  };

  const GoMainPage = (e) => {
    e.preventDefault();
    dispatch({ type: "PAGE_LOADING" });
    props.history.push("/");
  };

  return (
    <Fragment>
      {checkTokenResearch ? (
        <Container>
          <Switch>
            <Route exact path="/research">
              <FormButton />
              <BackMainPage />
            </Route>
            <Route path="/research/form" component={FormPage} />
          </Switch>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col>
              <Form>
                <FormGroup>
                  <h2>สมัครใช้งานระบบวิจัย</h2>
                </FormGroup>
                <FormGroup>
                  <Label for="Detail">
                    เพื่อติดต่อการทำงานและตรวจสอบสถานะการอนุมัติงานวิจัย
                    ผู้ใช้งานจำเป็นต้องสมัครใช้งานระบบวิจัย <br />
                    กรุณาคลิก <b>ตกลง</b> เพื่อสมัครเข้าใช้งาน หรือคลิก{" "}
                    <b>ยกเลิก</b> เพื่อกลับหน้าหลัก
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Button onClick={RegisterResearch} color="warning">
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

export default connect(null, { register, auth_user })(MainPage);
