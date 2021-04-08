import React, { useState, useEffect, useMemo, Fragment } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { PAGE_LOADING } from "../../../type/main/type";
// Send Service
import { sendResearchActive } from "../../../actions/main/serviceAction";

const ResearchActive = (props) => {
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );

  const { handleSubmit, register } = useForm();
  const servicelist = useSelector((state) => state.main.service);
  const token = useSelector((state) => state.main.auth.token);
  const user = useSelector((state) => state.main.auth.user);
  const trigger = useSelector((state) => state.main.trigger);
  const [triggerOnlyOne, settriggerOnlyOne] = useState(true);
  const dispatch = useDispatch();
  const [levelvalue, setlevelvalue] = useState("USER");
  const [activevalue, setactivevalue] = useState("INACTIVE");
  const [actives] = useState([
    {
      label: "Active",
      value: "ACTIVE",
    },
    {
      label: "Inactive",
      value: "INACTIVE",
    },
  ]);
  const [activefirst] = useState([
    {
      label: "Active",
      value: "ACTIVE",
    },
  ]);
  const [levels] = useState([
    {
      label: "ผู้ใช้งาน",
      value: "USER",
    },
    {
      label: "กรรมการตรวจสอบ",
      value: "COMMITTEE",
    },
    {
      label: "ผู้ดูแลระบบ",
      value: "ADMIN",
    },
  ]);

  ResearchActive.propTypes = {
    sendResearchActive: PropTypes.func.isRequired,
  };
  const { sendResearchActive } = props;

  useEffect(() => {
    if (servicelist.E_Research) {
      if (servicelist.E_Research.active)
        setactivevalue(servicelist.E_Research.active);
      // console.log(servicelist.E_Research.active);
      if (servicelist.E_Research.position)
        setlevelvalue(servicelist.E_Research.position);
    }
  }, [servicelist]);

  useMemo(() => {
    const goMainPage = async () => {
      if (trigger.active) {
        if (triggerOnlyOne) {
          await settriggerOnlyOne(false);
          await alert("อัพเดตรายการสำเร็จ");
          await dispatch({ type: PAGE_LOADING });
          await props.history.push("/");
        }
      }
    };
    goMainPage();
    // eslint-disable-next-line
  }, [trigger]);

  const onSubmit = async (e) => {
    const newSet = await {
      token: token,
      user_order: user.buasri_id,
      buasri_id: servicelist.buasri_id,
      position: e.levelinput,
      active: e.activeinput,
    };
    await sendResearchActive(newSet);
  };

  return (
    <Fragment>
      <h4>E-Research</h4>
      <ColoredLine color="grey" />
      <Container>
        <Row>
          <Label className="font-weight-bolder">ข้อมูลปัจจุบัน</Label>
        </Row>
        <Row>
          <Col sm={3}>
            <Label>การเปิดสิทธิ์:</Label>
          </Col>
          <Col sm={8}>
            <Label>
              <p>
                {actives
                  .filter((data) => {
                    if (data.value === activevalue) {
                      return data.label;
                    } else {
                      return null;
                    }
                  })
                  .map((data) => {
                    if (data.value === activevalue) {
                      return <Fragment key={data.value}>{data.label}</Fragment>;
                    } else {
                      return null;
                    }
                  })}
              </p>
            </Label>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Label>ระดับการเข้าใช้งาน:</Label>
          </Col>
          <Col sm={8}>
            <Label>
              {levels
                .filter((data) => {
                  if (data.value === levelvalue) {
                    return data.label;
                  } else {
                    return null;
                  }
                })
                .map((data) => {
                  if (data.value === levelvalue) {
                    return <Fragment key={data.value}>{data.label}</Fragment>;
                  } else {
                    return null;
                  }
                })}
            </Label>
          </Col>
        </Row>
        <ColoredLine color="white" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Label className="font-weight-bolder">
              ข้อมูลที่ต้องการเปลี่ยน
            </Label>
          </Row>
          <FormGroup row>
            <Label for="activeinput" sm={3}>
              การเปิดสิทธิ์:
            </Label>
            <Col sm={8}>
              {servicelist.E_Research ? (
                <Fragment>
                  <Input
                    type="select"
                    name="activeinput"
                    id="activeinput"
                    innerRef={register}
                    defaultValue={servicelist.E_Research.active}
                  >
                    {/* {actives.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))} */}
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </Input>
                </Fragment>
              ) : (
                <Fragment>
                  <Input
                    type="select"
                    name="activeinput"
                    // id="activeinput"
                    defaultValue={servicelist.E_Research.active}
                    innerRef={register}
                  >
                    {/* {activefirst.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))} */}
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </Input>
                </Fragment>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="levelinput" sm={3}>
              ระดับการเข้าใช้งาน:
            </Label>
            <Col sm={8}>
              {servicelist.E_Research ? (
                <Fragment>
                  <Input
                    type="select"
                    name="levelinput"
                    id="levelinput"
                    innerRef={register}
                    defaultValue={levelvalue}
                  >
                    {levels.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Input>
                </Fragment>
              ) : (
                <Fragment>
                  <Input
                    type="select"
                    name="levelinput"
                    id="levelinput"
                    innerRef={register}
                  >
                    {levels.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Input>
                </Fragment>
              )}
            </Col>
          </FormGroup>
          <br />
          <FormGroup row>
            <Col sm={3}></Col>
            <Col sm={8}>
              <Button>ยืนยันการเปลี่ยนแปลง</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
      <ColoredLine color="grey" />
    </Fragment>
  );
};

export default withRouter(
  connect(null, { sendResearchActive })(ResearchActive)
);
