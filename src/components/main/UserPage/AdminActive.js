import React, { useState, useEffect, Fragment } from "react";
import { connect, useSelector } from "react-redux";
import { Row, Col, Container, Form, FormGroup, Label } from "reactstrap";

import ResearchActive from "../../main/ServiceActive/researchActive";

const AdminPageActive = (props) => {
  const servicelist = useSelector((state) => state.main.service);
  const user = useSelector((state) => state.main.auth.user);
  const subservice = useSelector((state) => state.main.auth.service);
  const [Name, setName] = useState(null);

  useEffect(() => {
    if (servicelist) {
      setName(servicelist.firstname + " " + servicelist.lastname);
    }
  }, [servicelist]);
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
              {user.position === "ADMIN" ? <ResearchActive /> : null}
              {subservice.e_research ? (
                subservice.e_research.position === "ADMIN" &&
                subservice.e_research.active === "ACTIVE" ? (
                  <ResearchActive />
                ) : null
              ) : null}
              {subservice.e_qa ? (
                subservice.e_qa.position === "ADMIN" &&
                subservice.e_qa.active === "ACTIVE" ? (
                  <ResearchActive />
                ) : null
              ) : null}
              {subservice.e_scihuris ? (
                subservice.e_scihuris.position === "ADMIN" &&
                subservice.e_scihuris.active === "ACTIVE" ? (
                  <ResearchActive />
                ) : null
              ) : null}
            </Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default connect(null, null)(AdminPageActive);
