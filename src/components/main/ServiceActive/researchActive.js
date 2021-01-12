import React, { useState, useEffect, Fragment, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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
  const servicelist = useSelector((state) => state.main.service);
  const user = useSelector((state) => state.main.auth.user);

  return (
    <Fragment>
      <h4>E-Research</h4>
      <Container>
        <Form>
          <FormGroup row>
            <Label for="exampleSelect" sm={3}>
              การเปิดสิทธิ์:
            </Label>
            <Col sm={8}>
              <Input type="select" name="active" id="active">
                {servicelist.E_Research ? (
                  <Fragment>
                    {servicelist.E_Research.active === "ACTIVE" ? (
                      <Fragment>
                        <option>ACTIVE</option>
                        <option>INACTIVE</option>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <option>ACTIVE</option>
                      </Fragment>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <option>ACTIVE</option>
                  </Fragment>
                )}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>ระดับการเข้าใช้งาน:</Label>
            <Col sm={8}>
              <Input type="select" name="position" id="active">
                {servicelist.E_Research ? (
                  <Fragment>
                    {servicelist.E_Research.active === "ACTIVE" ? (
                      <Fragment>
                        <option>{servicelist.E_Research.position}</option>
                        <option>ADMIN</option>
                        <option>USER</option>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <option>ADMIN</option>
                        <option>USER</option>
                      </Fragment>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <option>ADMIN</option>
                    <option>USER</option>
                  </Fragment>
                )}
              </Input>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    </Fragment>
  );
};

export default connect(null, null)(ResearchActive);
