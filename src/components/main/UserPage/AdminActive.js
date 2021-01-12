import React, { useState, useEffect, Fragment, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
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

import researchActive from "../../main/ServiceActive/researchActive";

const AdminPageActive = (props) => {
  const servicelist = useSelector((state) => state.main.service);
  const user = useSelector((state) => state.main.auth.user);
  const [Name, setName] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (servicelist) {
      setName(servicelist.firstname + " " + servicelist.lastname);
    }
  }, [servicelist]);
  console.log(user.position);
  return (
    <Fragment>
      <Container>
        <Row>
          <Col sm="12">
            <Container>
              <br />
              <h4>ชื่อผู้ใช้</h4>
              <Container>
                <Form>
                  <FormGroup row>
                    <Label sm={3}>ชื่อ-นามสกุล:</Label>
                    <Label sm={8}>{Name}</Label>
                  </FormGroup>
                </Form>
              </Container>
              <br />
              {user.position === "ADMIN" ? <researchActive /> : null}
            </Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default connect(null, null)(AdminPageActive);
