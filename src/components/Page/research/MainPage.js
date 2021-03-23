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
import {
  getlist_user,
  getlist_committee,
} from "../../../actions/research/listAction";

import FormButton from "../../research/FormButton";
import FormPage from "../research/FormPage";
import BackMainPage from "../../main/BackMainPage";
import DetailPage from "../research/DetailPage";

import MainTableAdmin from "../../research/MainTableAdmin";
import MainTableCommittee from "../../research/MainTableCommittee";
import MainTableUser from "../../research/MainTableUser";

const MainPage = (props) => {
  // Main
  const token = useSelector((state) => state.main.auth.token);
  const user = useSelector((state) => state.main.auth.user);
  const service = useSelector((state) => state.main.auth.service);

  //Trigger
  const [Open, setOpen] = useState(true);

  // Research
  // const researchUser = useSelector((state) => state.research.auth.user);
  const checkResearchActive = useSelector(
    (state) => state.main.auth.service.e_research
  );
  const checkResearchUser = useSelector(
    (state) => state.research.auth.user.buasri_id
  );

  const dispatch = useDispatch();

  MainPage.propTypes = {
    register: PropTypes.func.isRequired,
    auth_user: PropTypes.func.isRequired,
    getlist_user: PropTypes.func.isRequired,
    getlist_committee: PropTypes.func.isRequired,
  };

  const { register, auth_user, getlist_user, getlist_committee } = props;

  // Fetch Data
  useMemo(() => {
    if (Open && checkResearchActive && !checkResearchUser) {
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
  useMemo(() => {
    if (service.e_research.position) {
      const getListData = async () => {
        if (service.e_research.position === "USER") {
          const newList = {
            token,
            buasri_id: user.buasri_id,
            dep: user.dep,
          };
          getlist_user(newList);
        } else if (service.e_research.position === "COMMITTEE") {
          const newList = {
            token,
            buasri_id: user.buasri_id,
            dep: user.dep,
          };
          getlist_committee(newList);
          // console.log(newList);
        }
      };
      getListData();
    }
    // eslint-disable-next-line
  }, [service.e_research.position]);

  const RegisterResearch = (e) => {
    e.preventDefault();
    const newUser = {
      buasri_id: user.buasri_id,
      email: user.email,
      position: service.e_research.position,
      dep: user.dep,
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
      {checkResearchUser ? (
        <Container>
          <Switch>
            <Route exact path="/research">
              <FormButton />
              <BackMainPage />
              {service.e_research ? (
                service.e_research.position === "USER" ? (
                  <Fragment>
                    <MainTableUser />
                  </Fragment>
                ) : service.e_research.position === "ADMIN" ? (
                  <Fragment>
                    <MainTableAdmin />
                  </Fragment>
                ) : service.e_research.position === "COMMITTEE" ? (
                  <Fragment>
                    <br />
                    <br />
                    <b>หน่วยงาน: {user.dep}</b>
                    <p>
                      <MainTableCommittee />
                    </p>
                  </Fragment>
                ) : null
              ) : null}
            </Route>
            <Route path="/research/form" component={FormPage} />
            <Route path="/research/detail" component={DetailPage} />
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

export default connect(null, {
  register,
  auth_user,
  getlist_user,
  getlist_committee,
})(MainPage);
