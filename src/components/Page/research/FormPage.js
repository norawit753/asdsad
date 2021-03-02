import React, { Fragment, useState } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  CustomInput,
  Label,
  Input,
} from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import BackResearchPage from "../../research/BackResearchPage";
import { withRouter } from "react-router-dom";

const ResearchFormPage = (props) => {
  const { handleSubmit, register, watch } = useForm();

  const onSubmit = async (e) => {};

  return (
    <Fragment>
      <Container>
        <BackResearchPage />
        <h4>
          <b>แบบฟอร์มเพิ่มงานวิจัย</b>
        </h4>

        <br />
      </Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <p className="text-danger">
            แบบฟอร์มนี้มีไว้สำหรับการส่งงานวิจัย
            โดยข้อมูลต่างๆที่ท่านกรอกผ่านแบบฟอร์มนี้{" "}
          </p>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

export default withRouter(connect(null, null)(ResearchFormPage));
