import React, { useState, useEffect, Fragment, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Container,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const ResearchActive = (props) => {
  const { handleSubmit, register, watch } = useForm();
  const servicelist = useSelector((state) => state.main.service);
  const token = useSelector((state) => state.main.auth.token);
  const user = useSelector((state) => state.main.auth.user);
  const [levelvalue, setlevelvalue] = useState("USER");
  const [activevalue, setactivevalue] = useState("ACTIVE");
  const [actives] = useState([
    {
      label: "เปิดสิทธิ์ใช้งาน",
      value: "ACTIVE",
    },
    {
      label: "ปิดสิทธิ์ใช้งาน",
      value: "INACTIVE",
    },
  ]);
  const [activefirst] = useState([
    {
      label: "เปิดสิทธิ์ใช้งาน",
      value: "ACTIVE",
    },
  ]);
  const [levels] = useState([
    {
      label: "ผู้ใช้งาน",
      value: "USER",
    },
    {
      label: "ผู้ดูแลระบบ",
      value: "ADMIN",
    },
  ]);

  useEffect(() => {
    if (servicelist.E_Research) {
      setactivevalue(servicelist.E_Research.active);
      setlevelvalue(servicelist.E_Research.position);
    }
  }, [servicelist]);

  const onSubmit = async (e) => {
    const newSet = await {
      token: token,
      user_order: user.buasri_id,
      buasri_id: servicelist.buasri_id,
      position: e.levelinput,
      active: e.activeinput,
    };

    await console.log(newSet);
  };

  return (
    <Fragment>
      <h4>E-Research</h4>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup row>
            <Label for="exampleSelect" sm={3}>
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
                    defaultValue={activevalue}
                  >
                    {actives.map(({ label, value }) => (
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
                    name="activeinput"
                    id="activeinput"
                    innerRef={register}
                    defaultValue={activevalue}
                  >
                    {activefirst.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Input>
                </Fragment>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>ระดับการเข้าใช้งาน:</Label>
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
                    defaultValue={levelvalue}
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
    </Fragment>
  );
};

export default connect(null, null)(ResearchActive);
